#!/bin/bash
set -e

echo "🚀 Starting Whiteboard AI — Full Stack"
echo "========================================"

# 1. Docker services
echo ""
echo "📦 Starting Docker services..."
docker compose up -d
echo "   ✅ PostgreSQL    → localhost:5432"
echo "   ✅ Redis         → localhost:6379"
echo "   ✅ MinIO         → localhost:9000 (console: 9001)"
echo "   ✅ Unleash       → localhost:4242"
echo "   ✅ Kafka         → localhost:9094"
echo "   ✅ ChromaDB      → localhost:8000"
echo "   ✅ Langfuse      → localhost:3100"

# 2. BFF API
echo ""
echo "🔧 Starting BFF API..."
cd bff-api
if [ ! -d "node_modules" ]; then
  pnpm install
fi
cp -n .env.example .env 2>/dev/null || true
npx prisma generate 2>/dev/null
pnpm start:dev &
BFF_PID=$!
echo "   ✅ NestJS BFF    → localhost:4001 (PID: $BFF_PID)"
cd ..

# 3. Yjs WebSocket (started by NestJS)
echo "   ✅ Yjs WebSocket → localhost:4002"

# 4. Web App
echo ""
echo "🌐 Starting Web App..."
cd web-app
if [ ! -d "node_modules" ]; then
  pnpm install
fi
pnpm dev &
WEB_PID=$!
echo "   ✅ React App     → localhost:5173 (PID: $WEB_PID)"
cd ..

# 5. AI Service (optional)
echo ""
echo "🤖 Starting AI Service..."
cd ai-service
if [ -f "requirements.txt" ]; then
  pip3 install -r requirements.txt -q 2>/dev/null
fi
python3 -m src.main &
AI_PID=$!
echo "   ✅ AI Service    → localhost:4010 (PID: $AI_PID)"
cd ..

# 6. Storybook (optional)
echo ""
echo "📖 Starting Storybook..."
cd web-app
pnpm storybook &
SB_PID=$!
echo "   ✅ Storybook     → localhost:6006 (PID: $SB_PID)"
cd ..

echo ""
echo "========================================"
echo "🎉 All services running!"
echo ""
echo "📋 Service URLs:"
echo "   Web App      → http://localhost:5173"
echo "   BFF API      → http://localhost:4001"
echo "   AI Service   → http://localhost:4010"
echo "   Storybook    → http://localhost:6006"
echo "   Langfuse     → http://localhost:3100"
echo "   MinIO Console→ http://localhost:9001"
echo "   Unleash      → http://localhost:4242"
echo ""
echo "Press Ctrl+C to stop all services."

# Wait for Ctrl+C
trap "kill $BFF_PID $WEB_PID $AI_PID $SB_PID 2>/dev/null; docker compose stop; echo '👋 All stopped.'" EXIT
wait
