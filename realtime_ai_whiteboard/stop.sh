#!/bin/bash
echo "🛑 Stopping all Whiteboard services..."
docker compose stop
pkill -f "nest start" 2>/dev/null
pkill -f "vite" 2>/dev/null
pkill -f "src.main" 2>/dev/null
pkill -f "storybook" 2>/dev/null
echo "👋 All stopped."
