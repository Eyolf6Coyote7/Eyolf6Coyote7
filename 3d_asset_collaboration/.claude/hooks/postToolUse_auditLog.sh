#!/usr/bin/env bash
# PostToolUse hook: append one audit record per Claude Code tool call.
# Triggered after every tool call completes.
# Input (stdin JSON): { "session_id": "...", "tool_name": "...", "cwd": "...", ... }

set -euo pipefail

INPUT=$(cat)
CWD=$(echo "$INPUT" | jq -r '.cwd')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

SESSION_FILE="$CWD/.harness/sessions/active.json"
if [ ! -f "$SESSION_FILE" ]; then
  exit 0
fi

HARNESS_SESSION_ID=$(jq -r '.session_id' "$SESSION_FILE")
HARNESS_CELL=$(jq -r '.cell // "unknown"' "$SESSION_FILE")

# Detect which service this call is touching (polyglot project — 5 services, see audit-config.yml).
SERVICE="unknown"
if [[ "$TOOL_NAME" == "Write" || "$TOOL_NAME" == "Edit" || "$TOOL_NAME" == "MultiEdit" ]]; then
  FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')
  case "$FILE" in
    *asset-portal/*)  SERVICE="asset-portal" ;;
    *mobile-app/*)    SERVICE="mobile-app" ;;
    *asset-api/*)     SERVICE="asset-api" ;;
    *iot-consumer/*)  SERVICE="iot-consumer" ;;
    *ai-service/*)    SERVICE="ai-service" ;;
    *unity-client/*)  SERVICE="unity-client" ;;
  esac
fi

AUDIT_DIR="$CWD/.harness/audit"
mkdir -p "$AUDIT_DIR"
AUDIT_FILE="$AUDIT_DIR/$(date -u +%Y-%m-%d).jsonl"

jq -nc \
  --arg ts "$TIMESTAMP" \
  --arg sid "$HARNESS_SESSION_ID" \
  --arg cell "$HARNESS_CELL" \
  --arg tn "$TOOL_NAME" \
  --arg user "$(whoami)" \
  --arg svc "$SERVICE" \
  '{timestamp: $ts, session_id: $sid, cell: $cell, tool: $tn, user: $user, service: $svc}' \
  >> "$AUDIT_FILE"

exit 0
