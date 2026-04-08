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
COMMIT_SHA=$(git -C "$CWD" rev-parse --short HEAD 2>/dev/null || echo "uncommitted")

AUDIT_DIR="$CWD/.harness/audit"
mkdir -p "$AUDIT_DIR"
AUDIT_FILE="$AUDIT_DIR/$(date -u +%Y-%m-%d).jsonl"

# Enterprise also records commit_sha per audit-config.yml.
jq -nc \
  --arg ts "$TIMESTAMP" \
  --arg sid "$HARNESS_SESSION_ID" \
  --arg cell "$HARNESS_CELL" \
  --arg tn "$TOOL_NAME" \
  --arg user "$(whoami)" \
  --arg sha "$COMMIT_SHA" \
  '{timestamp: $ts, session_id: $sid, cell: $cell, tool: $tn, user: $user, commit_sha: $sha}' \
  >> "$AUDIT_FILE"

exit 0
