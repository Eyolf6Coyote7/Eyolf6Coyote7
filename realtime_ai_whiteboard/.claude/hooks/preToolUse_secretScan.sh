#!/usr/bin/env bash
# PreToolUse hook: scan the content Claude Code is about to write for leaked secrets.
# Triggered before Write / Edit / MultiEdit.
# Input (stdin JSON): { "tool_name": "...", "tool_input": { "content"|"new_string": "..." } }
# Exit code: 0 = allow, 1 = block

set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

case "$TOOL_NAME" in
  Write|Edit|MultiEdit) ;;
  *) exit 0 ;;
esac

CONTENT=$(echo "$INPUT" | jq -r '.tool_input.content // .tool_input.new_string // empty')
if [ -z "$CONTENT" ]; then
  exit 0
fi

if ! command -v gitleaks &> /dev/null; then
  echo "⚠️  gitleaks not installed — skipping secret scan" >&2
  exit 0
fi

TMP=$(mktemp)
echo "$CONTENT" > "$TMP"

if gitleaks detect --no-git --source "$TMP" --exit-code 1 --quiet; then
  rm -f "$TMP"
  exit 0
else
  rm -f "$TMP"
  echo "🚫 Secret detected in AI output. Refusing to write." >&2
  echo "If this is a false positive, add the pattern to .gitleaks-allow.toml." >&2
  exit 1
fi
