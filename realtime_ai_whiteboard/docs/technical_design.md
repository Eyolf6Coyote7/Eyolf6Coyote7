# Technical Design: Realtime AI Whiteboard


---

## System: BFF + API (NestJS)

### API Specification

#### REST — Web BFF

| Method | Path | Request | Response | Auth |
|--------|------|---------|----------|------|
| POST | `/api/web/auth/register` | `{email, password, displayName}` | `{accessToken, refreshToken, user}` | Public |
| POST | `/api/web/auth/login` | `{email, password}` | `{accessToken, refreshToken, user}` | Public |
| POST | `/api/web/auth/refresh` | `{refreshToken}` | `{accessToken}` | Public |
| GET | `/api/web/boards` | `?page&limit&search` | `{boards[], cursor, total}` | JWT |
| POST | `/api/web/boards` | `{title, templateId?}` | `{board}` | JWT |
| GET | `/api/web/boards/:id` | — | `{board, elements[], collaborators[]}` | JWT / Guest |
| PATCH | `/api/web/boards/:id` | `{title?, guestEditable?}` | `{board}` | JWT (owner) |
| DELETE | `/api/web/boards/:id` | — | `204` | JWT (owner) |
| POST | `/api/web/boards/:id/share` | `{permission: "view"\|"edit"}` | `{guestUrl, guestToken}` | JWT (owner) |
| DELETE | `/api/web/boards/:id/share` | — | `204` | JWT (owner) |
| POST | `/api/web/boards/:id/export` | `{format: "png"\|"pdf"}` | `{downloadUrl}` | JWT |
| POST | `/api/web/ai/prompt` | `{boardId, prompt}` | `{taskId}` | JWT |
| GET | `/api/web/ai/stream/:taskId` | — | SSE stream | JWT |
| GET | `/api/web/user/me` | — | `{user, plan, usage}` | JWT |
| PATCH | `/api/web/user/me` | `{displayName?, locale?}` | `{user}` | JWT |

#### REST — Mobile BFF

| Method | Path | Request | Response | Auth |
|--------|------|---------|----------|------|
| GET | `/api/mobile/boards` | `?cursor&limit` | `{boards[], nextCursor}` | JWT |
| GET | `/api/mobile/boards/:id` | — | `{board, elements[]}` (compact) | JWT |
| POST | `/api/mobile/boards` | `{title, templateId?}` | `{board}` | JWT |
| POST | `/api/mobile/ai/prompt` | `{boardId, prompt}` | `{taskId}` | JWT |

> Mobile BFF returns smaller payloads (no collaborator details, compressed element data).

#### WebSocket Events

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `yjs:sync` | Bidirectional | Yjs binary protocol | CRDT state sync |
| `yjs:update` | Bidirectional | Yjs update binary | Incremental CRDT update |
| `cursor:update` | Client → Server | `{userId, x, y, color}` | Cursor position (throttled 60fps) |
| `cursor:broadcast` | Server → Clients | `{userId, x, y, color, name}` | Other user cursor |
| `presence:join` | Server → Clients | `{userId, name, color}` | User joined board |
| `presence:leave` | Server → Clients | `{userId}` | User left board |

#### SSE (AI Response Stream)

| Event | Data | Description |
|-------|------|-------------|
| `token` | `{text: "Hello"}` | Single token from LLM |
| `tool_call` | `{tool: "createShape", args: {...}}` | MCP tool execution |
| `tool_result` | `{result: {...}}` | Tool execution result |
| `done` | `{totalTokens, latencyMs}` | Stream complete |
| `error` | `{code, message}` | AI error |

### Database Tables (owned by BFF + API)

#### Table: `tenants`

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() | Tenant ID |
| name | varchar(255) | NOT NULL | Workspace name |
| schema_name | varchar(63) | UNIQUE, NOT NULL | PostgreSQL schema name |
| plan | varchar(20) | DEFAULT 'free' | free / pro |
| created_at | timestamptz | DEFAULT now() | |

#### Table: `users` (per-tenant schema)

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | uuid | PK | |
| email | varchar(255) | UNIQUE, NOT NULL | |
| password_hash | varchar(255) | NOT NULL | bcrypt hash |
| display_name | varchar(100) | NOT NULL | |
| role | varchar(20) | DEFAULT 'member' | owner / member |
| locale | varchar(10) | DEFAULT 'en' | en / zh-TW |
| created_at | timestamptz | DEFAULT now() | |

#### Table: `boards` (per-tenant schema)

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | uuid | PK | |
| owner_id | uuid | FK → users.id, NOT NULL | |
| title | varchar(255) | NOT NULL | |
| template_id | varchar(50) | NULL | brainstorm / retro / kanban / null |
| guest_editable | boolean | DEFAULT false | |
| guest_token | varchar(255) | UNIQUE, NULL | For guest access |
| yjs_state | bytea | NULL | Serialized Yjs document |
| thumbnail_url | varchar(500) | NULL | Auto-generated |
| created_at | timestamptz | DEFAULT now() | |
| updated_at | timestamptz | DEFAULT now() | |

#### Table: `ai_conversations` (per-tenant schema)

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | uuid | PK | |
| board_id | uuid | FK → boards.id | |
| user_id | uuid | FK → users.id | |
| created_at | timestamptz | DEFAULT now() | |

#### Table: `ai_messages` (per-tenant schema)

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | uuid | PK | |
| conversation_id | uuid | FK → ai_conversations.id | |
| role | varchar(20) | NOT NULL | user / assistant / tool |
| content | text | NOT NULL | Message text |
| tool_calls | jsonb | NULL | MCP tool calls (if assistant) |
| tokens_used | int | NULL | Token count |
| latency_ms | int | NULL | Response time |
| created_at | timestamptz | DEFAULT now() | |

### Indexes

| Table | Columns | Type | Purpose |
|-------|---------|------|---------|
| boards | owner_id | btree | Fast lookup by owner |
| boards | created_at DESC | btree | Dashboard sort |
| boards | guest_token | btree unique | Guest link lookup |
| ai_messages | conversation_id, created_at | btree | Chat history pagination |

## System: AI Service (LangGraph)

### Pipeline Specification

| Stage | Input | Output | Tech |
|-------|-------|--------|------|
| Intent Classifier | User prompt + board context | `"info_retrieval"` or `"action_execution"` | LangChain classifier |
| Planner (ReAct) | Intent + context | List of steps (reasoning + actions) | LangGraph node |
| RAG Assembler | Query | Augmented prompt with relevant board content | ChromaDB + Embedding |
| LLM Inference | Augmented prompt | Generated text / tool calls | Ollama |
| MCP Executor | Tool call | Tool result | MCP Server |
| Reflector | LLM output + tool results | Pass / Retry decision | LangGraph conditional edge |
| SSE Streamer | Final output | Token-by-token stream | NestJS SSE endpoint |

### MCP Tools

| Tool | Method | Parameters | Returns | Side Effect |
|------|--------|-----------|---------|-------------|
| `user.getProfile` | GET | `{userId}` | `{name, plan, boards}` | None |
| `user.getPreferences` | GET | `{userId}` | `{locale, theme}` | None |
| `data.searchBoards` | GET | `{query, limit}` | `{boards[]}` | None |
| `data.getBoardContent` | GET | `{boardId}` | `{elements[], title}` | None |
| `task.createShape` | POST | `{boardId, type, x, y, text}` | `{elementId}` | Creates element on board |
| `task.createConnector` | POST | `{boardId, fromId, toId}` | `{connectorId}` | Creates connector |
| `task.updateElement` | PATCH | `{boardId, elementId, props}` | `{element}` | Modifies element, returns updated element |
| `task.exportBoard` | POST | `{boardId, format}` | `{downloadUrl}` | Generates export file |

### ChromaDB Collections

| Collection | Embedding | Content | Purpose |
|-----------|-----------|---------|---------|
| `board_elements` | all-MiniLM-L6-v2 | Board element text (sticky notes, text boxes) | RAG context retrieval |
| `user_history` | all-MiniLM-L6-v2 | Past AI conversations | Long-term memory |

---

## Database Schema (Full)

### ER Diagram

```mermaid
erDiagram
  TENANT ||--o{ USER : has
  USER ||--o{ BOARD : creates
  BOARD ||--o{ AI_CONVERSATION : has
  AI_CONVERSATION ||--o{ AI_MESSAGE : contains

  TENANT {
    uuid id PK
    varchar name
    varchar schema_name UK
    varchar plan
    timestamptz created_at
  }
  USER {
    uuid id PK
    varchar email UK
    varchar password_hash
    varchar display_name
    varchar role
    varchar locale
    timestamptz created_at
  }
  BOARD {
    uuid id PK
    uuid owner_id FK
    varchar title
    varchar template_id
    boolean guest_editable
    varchar guest_token UK
    bytea yjs_state
    varchar thumbnail_url
    timestamptz created_at
    timestamptz updated_at
  }
  AI_CONVERSATION {
    uuid id PK
    uuid board_id FK
    uuid user_id FK
    timestamptz created_at
  }
  AI_MESSAGE {
    uuid id PK
    uuid conversation_id FK
    varchar role
    text content
    jsonb tool_calls
    int tokens_used
    int latency_ms
    timestamptz created_at
  }
```

### Migrations

| Item | Standard |
|------|---------|
| Tool | Prisma Migrate |
| Naming | `YYYYMMDDHHMMSS_description` (e.g. `20260401120000_create_boards`) |
| Rollback | Revert with a new migration. `prisma migrate reset` is for dev only — never use in production. |
| Tenant schemas | Migration runs per tenant schema on deploy |

### Data Migration Strategy

| Scenario | Strategy |
|----------|---------|
| Add column | Add with default value, backfill async if needed |
| Rename column | Add new → copy data → remove old (across 2 releases) |
| Remove column | Stop reading first → remove in next release |
| New tenant | Auto-create schema + run all migrations on signup |

## Sequence Diagrams (Key Flows)

### Flow: Board Creation with Template

```mermaid
sequenceDiagram
  participant Client
  participant BFF as BFF + API
  participant PG as PostgreSQL
  participant RD as Redis
  participant YJS as Yjs Provider

  Client->>BFF: POST /api/web/boards {title: "Sprint Retro", templateId: "retro"}
  BFF->>BFF: Validate JWT, resolve tenant schema
  BFF->>PG: INSERT INTO boards (title, template_id, owner_id)
  BFF->>BFF: Initialize Yjs document with template elements
  BFF->>PG: UPDATE boards SET yjs_state = ?
  BFF->>RD: PUBLISH board:created {boardId, tenantId}
  BFF-->>Client: {board: {id, title, template}}

  Client->>BFF: WebSocket connect /ws/board/:id
  BFF->>YJS: Join Yjs room
  YJS-->>Client: Initial Yjs state (template elements)
```

### Flow: Multi-tenant Schema Switching

```mermaid
sequenceDiagram
  participant Client
  participant BFF as BFF + API
  participant MW as Tenant Middleware
  participant PG as PostgreSQL

  Client->>BFF: GET /api/web/boards (JWT with tenantId)
  BFF->>MW: Extract tenantId from JWT
  MW->>PG: SET search_path TO 'tenant_abc123'
  MW-->>BFF: Tenant context set
  BFF->>PG: SELECT * FROM boards WHERE owner_id = ?
  Note over PG: Query runs in tenant_abc123 schema
  PG-->>BFF: boards[]
  BFF-->>Client: {boards: [...]}
```

## Authentication & Authorization

| Role | Create Board | Edit Board | View Board | Share Board | AI Chat | Delete Board | Manage Team |
|------|-------------|-----------|------------|------------|---------|-------------|-------------|
| Owner | ✅ | ✅ (own) | ✅ (all) | ✅ (own) | ✅ | ✅ (own) | ✅ |
| Member | ✅ | ✅ (own + shared) | ✅ (own + shared) | ✅ (own) | ✅ | ✅ (own) | ❌ |
| Guest | ❌ | ✅/❌ (per board) | ✅ | ❌ | ❌ | ❌ | ❌ |

### JWT Token Structure

```json
{
  "sub": "user-uuid",
  "tenantId": "tenant-uuid",
  "role": "member",
  "plan": "pro",
  "iat": 1711234567,
  "exp": 1711235467
}
```

| Token | TTL | Storage |
|-------|-----|---------|
| Access Token | 15 min | Memory (client) |
| Refresh Token | 7 days | HttpOnly cookie |
| Guest Token | 1 hour (single-use) | URL parameter → exchanged for session cookie |

## Error Handling

```json
{
  "error": {
    "code": "BOARD_NOT_FOUND",
    "message": "Board with ID xyz not found",
    "request_id": "req-uuid",
    "timestamp": "2026-04-01T10:00:00Z"
  }
}
```

| Code | HTTP | Description |
|------|------|-------------|
| `AUTH_INVALID_TOKEN` | 401 | JWT expired or invalid |
| `AUTH_FORBIDDEN` | 403 | No permission for this resource |
| `BOARD_NOT_FOUND` | 404 | Board doesn't exist or not in tenant |
| `BOARD_LIMIT_REACHED` | 403 | Free plan limit (5 boards) |
| `AI_UNAVAILABLE` | 503 | Ollama not running |
| `AI_TIMEOUT` | 504 | LLM response timed out (>30s) |
| `UPLOAD_TOO_LARGE` | 413 | File exceeds limit |
| `RATE_LIMITED` | 429 | Too many requests |

## Caching Strategy

| Key Pattern | TTL | Invalidation | Data |
|-------------|-----|-------------|------|
| `board:{id}:meta` | 5 min | On board update | Board title, owner, settings |
| `user:{id}:profile` | 10 min | On profile update | User display name, plan |
| `tenant:{id}:plan` | 30 min | On plan change | Tenant plan + limits |
| `board:{id}:presence` | Realtime | On WS disconnect | Active user list |

## Background Jobs / Workers

| Job | System | Trigger | Input | Output |
|-----|--------|---------|-------|--------|
| AI Task Processor | AI Service | Redis Stream `ai-tasks` | `{boardId, prompt, userId}` | AI response → SSE stream |
| Board Thumbnail | BFF (async) | Board update event | `{boardId, yjsState}` | Thumbnail PNG → MinIO |
| Usage Metering | BFF | Every API call | `{tenantId, endpoint}` | Increment counter in Redis; separate worker sends aggregates to Kafka periodically (every 5 min) |
| ChromaDB Indexer | AI Service | Board element change | `{boardId, elements}` | Updated vector embeddings |

## Third-party Integrations

| Integration | Purpose | How |
|-------------|---------|-----|
| Ollama | LLM inference | HTTP API `http://localhost:11434/api/generate` |
| ChromaDB | Vector search | HTTP API `http://localhost:8000/api/v1/collections` |
| Langfuse | LLM tracing | LangChain callback handler |
| Unleash | Feature flags | Unleash SDK for Node.js |

## System: Web App (React)

### State Management (Zustand)

| Store | State | Actions | Selectors |
|-------|-------|---------|-----------|
| `authStore` | `user, token, isGuest` | `login(), register(), logout(), setGuestToken()` | `isAuthenticated, plan` |
| `boardStore` | `boards[], currentBoard, loading` | `fetchBoards(), createBoard(), deleteBoard()` | `myBoards, sharedBoards` |
| `canvasStore` | `selectedTool, selectedElementIds[], zoom, pan` | `selectTool(), setZoom(), selectElements()` | `isDrawing` |
| `aiStore` | `messages[], isStreaming, taskId` | `sendPrompt(), cancelStream()` | `lastMessage` |
| `uiStore` | `sidebarOpen, aiPanelOpen, locale, theme` | `toggleSidebar(), toggleAI(), setLocale(), setTheme()` | — |
| `presenceStore` | `cursors[], onlineUsers[]` | `updateCursor(), handlePresenceEvent()` | `otherCursors` |

### Route Definitions

| Route | Component | Guard | Lazy Load |
|-------|-----------|-------|-----------|
| `/` | `LandingPage` | Public (redirect if logged in) | No |
| `/auth` | `AuthPage` | Public | No |
| `/dashboard` | `DashboardPage` | `requireAuth` | Yes |
| `/board/:id` | `BoardPage` | `requireAuth` or `requireGuest` | Yes |
| `/board/:id/settings` | `BoardSettingsPage` | `requireAuth` (owner) | Yes |
| `/settings` | `AccountSettingsPage` | `requireAuth` | Yes |
| `/pricing` | `PricingPage` | Public | Yes |

### Component Architecture

| Type | Examples | Convention |
|------|---------|-----------|
| Pages | `DashboardPage`, `BoardPage` | One per route, handles layout |
| Canvas Components | `CanvasView`, `Toolbar`, `Minimap`, `ZoomControls` | Canvas-specific, tightly coupled |
| AI Components | `AIChatPanel`, `AIChatInput`, `AIChatMessage`, `ToolResultCard` | AI panel ecosystem |
| Board Components | `BoardCard`, `BoardGrid`, `ShareModal` | Dashboard + sharing |
| Shared | `AppHeader`, `SkeletonLoader`, `Toast`, `EmptyState` | Reusable across pages |

### Canvas Implementation

| Concern | Implementation |
|---------|---------------|
| Rendering engine | Fabric.js (or Konva) for 2D canvas |
| Element types | Rectangle, Circle, Line, Arrow, Sticky, Text, Freehand, Image |
| Selection | Click to select, Shift+click multi-select, drag marquee |
| Resize/rotate | 8 handles (corners + edges) + rotation handle |
| Yjs binding | Custom Yjs provider syncs canvas elements to CRDT document |
| Undo/redo | Yjs UndoManager (local only, not cross-user) |
| Virtual rendering | Only render elements within viewport bounds (performance) |
| Keyboard shortcuts | `V`=select, `R`=rect, `T`=text, `Space`=pan, `Cmd+Z`=undo, `Cmd+Shift+Z`=redo |

### Yjs Integration

```typescript
// src/collaboration/yjs-provider.ts
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { IndexeddbPersistence } from 'y-indexeddb'

const doc = new Y.Doc()
const elementsMap = doc.getMap('elements')  // Shared CRDT map

// WebSocket sync (realtime)
const wsProvider = new WebsocketProvider(WS_URL, boardId, doc)
const awareness = wsProvider.awareness      // Cursor presence

// IndexedDB persistence (offline)
const idbProvider = new IndexeddbPersistence(boardId, doc)

// Listen for remote changes
elementsMap.observe(event => {
  event.changes.keys.forEach((change, key) => {
    // Update canvas rendering
  })
})
```

### AI Chat — SSE Consumer

```typescript
// src/ai/sse-consumer.ts
export function streamAIResponse(taskId: string, onToken: (text: string) => void) {
  const source = new EventSource(`/api/web/ai/stream/${taskId}`)

  source.addEventListener('token', (e) => {
    try {
      onToken(JSON.parse(e.data).text)
    } catch (error) {
      console.error('Error parsing token event:', error)
    }
  })

  source.addEventListener('tool_call', (e) => {
    try {
      const { tool, args } = JSON.parse(e.data)
      // Handle MCP tool execution result on canvas
    } catch (error) {
      console.error('Error parsing tool_call event:', error)
    }
  })

  source.addEventListener('done', () => {
    source.close()
  })

  source.addEventListener('error', () => {
    source.close()
    // Show error toast
  })

  return () => source.close() // Cleanup
}
```

### API Client (Real vs Mock)

```
src/api/
├─ client.interface.ts      ← ApiClient interface
├─ real-client.ts            ← Axios → BFF REST API
├─ mock-client.ts            ← Return mock JSON
├─ index.ts                  ← Factory: select by VITE_API_URL
└─ mocks/
    ├─ boards.json
    ├─ user.json
    └─ ai-responses.json
```

```typescript
// src/api/index.ts
import type { ApiClient } from './client.interface'
import { RealClient } from './real-client'
import { MockClient } from './mock-client'

const apiUrl = import.meta.env.VITE_API_URL

export const api: ApiClient = apiUrl
  ? new RealClient(apiUrl)
  : new MockClient()
```

---

## System: Mobile App (React Native)

### State Management (Zustand — shared with Web)

| Store | State | Actions | Notes |
|-------|-------|---------|-------|
| `authStore` | Same as web | Same | Shared code |
| `boardStore` | Same as web | Same | Shared code |
| `canvasStore` | `selectedTool, zoom` | `selectTool(), setZoom()` | Subset of web (no marquee select) |
| `aiStore` | Same as web | Same | Shared code |
| `offlineStore` | `isOnline, pendingActions[]` | `queueAction(), syncAll()` | Mobile-only |

### Navigation (React Navigation)

```typescript
// src/navigation/index.tsx
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={BoardListScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Create" component={CreateBoardScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Main" component={HomeTabs} />
      <Stack.Screen name="Board" component={BoardScreen} />
      <Stack.Screen name="AIChat" component={AIChatScreen} />
    </Stack.Navigator>
  )
}
```

### Canvas (Mobile-specific)

| Concern | Implementation |
|---------|---------------|
| Rendering | `react-native-skia` or `react-native-canvas` |
| Touch drawing | One-finger draw with selected tool |
| Zoom/pan | Pinch to zoom, two-finger pan |
| Selection | Tap to select, long-press for context menu |
| Yjs binding | Same as web (shared Yjs code) |
| Offline | `y-async-storage` for Yjs persistence |

### Push Notifications

```typescript
// src/notifications/push.ts
import * as Notifications from 'expo-notifications'
import { api } from '../api'

export async function registerForPushNotificationsAsync() {
  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data
    await api.registerPushToken(token)
  } catch (error) {
    console.error('Failed to register for push notifications', error)
  }
}

// Call in root navigation component where navigation is available
export function setupNotificationListener(navigation) {
  const subscription = Notifications.addNotificationResponseReceivedListener(response => {
    const boardId = response.notification.request.content.data?.boardId
    if (boardId) {
      navigation.navigate('Board', { id: boardId })
    }
  })
  return () => subscription.remove() // Cleanup
}
```

### Offline Strategy

```
Online:
  API call → response → update Zustand store
  Yjs sync via WebSocket

Offline (detected via NetInfo):
  Yjs edits stored in AsyncStorage (y-async-storage)
  API calls queued in offlineStore.pendingActions[]

Reconnect:
  Yjs auto-merges (CRDT conflict-free)
  offlineStore.syncAll() → replay queued API calls
```

---

## ADRs Created

- [ADR-0001: Why Yjs (CRDT) over OT](adrs/ADR-0001-why-yjs-over-ot.md)
- [ADR-0002: Why Ollama over cloud LLM](adrs/ADR-0002-why-ollama-over-cloud-llm.md)
- [ADR-0003: Why schema-per-tenant](adrs/ADR-0003-why-schema-per-tenant.md)
- [ADR-0004: Why NestJS Modular Monolith](adrs/ADR-0004-why-modular-monolith.md)
- [ADR-0005: Why Kafka for AI Task Queue](adrs/ADR-0005-why-kafka-for-ai-queue.md)
