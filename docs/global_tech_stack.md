1. Realtime AI Whiteboard
Tech Stack

Web：React

Mobile：React Native（iOS + Android）

Backend：Node.js（NestJS）

Realtime：WebSocket（Socket.IO）

State Sync：Yjs（CRDT）

DB：PostgreSQL

Cache / Queue：Redis（Pub/Sub + Stream）

Storage：MinIO

AI：Ollama + LangChain

核心技術（精簡）

即時協作：CRDT（Yjs）避免衝突

多節點同步：WebSocket + Redis Pub/Sub

AI 整合：Local LLM（Ollama）+ 任務佇列（Redis Stream）

跨平台：React + React Native 共用邏輯

2. Enterprise Workflow System
Tech Stack

Web：Vue 3 + Pinia + Element Plus

Mobile：Kotlin（Android）+ Swift（iOS）+ WebView

Backend：Kotlin + Spring Boot

Workflow Engine：Temporal

DB：PostgreSQL

Cache / Queue：Redis（Cache + Stream）

核心技術（精簡）

權限系統：RBAC（Role-Based Access Control）

流程引擎：Temporal（狀態機 + 任務編排）

跨端整合：WebView 共用前端 UI

系統設計：Audit Log + 流程追蹤（DB）

3. 3D Asset Collaboration（Digital Twin + AIoT）
Tech Stack

Web：React + Three.js

Client：Unity（C#）

Backend：ASP.NET Core

Realtime：SignalR

DB：PostgreSQL

Cache / Sync：Redis（Pub/Sub + Stream）

Storage：MinIO（3D Assets）

IoT：MQTT（Mosquitto）

Streaming（選用）：Redis Stream（或 Kafka）

AI（選用）：Python + ONNX Runtime

核心技術（精簡）

Digital Twin：3D 模型 + 即時 IoT 資料映射

即時同步：SignalR + Redis Pub/Sub

資產管理：3D 檔案版本控制（MinIO）

IoT Pipeline：MQTT → Stream → Backend

跨端同步：Unity + Web 共用狀態

🔧 全域共用（3個專案）
Infra（全部 local）

PostgreSQL

Redis（Cache / PubSub / Stream）

MinIO（Object Storage）

Docker Compose