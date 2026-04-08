#!/usr/bin/env bash
# PreToolUse hook: enforce red-line rules that the sandbox permissions may miss.
# Triggered before Write / Edit / MultiEdit / Bash calls.
# Input (stdin JSON): { "tool_name": "...", "tool_input": { ... } }
# Exit code: 0 = allow, 1 = block (Claude Code refuses the tool call)

set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

block() {
  echo "🚫 red-line: $1" >&2
  exit 1
}

case "$TOOL_NAME" in
  Write|Edit|MultiEdit)
    FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')
    case "$FILE" in
      *.env|*.env.*)                  block "refuse to write .env file: $FILE" ;;
      */migrations/*)                 block "refuse to write Prisma migration directly: $FILE" ;;
      */secrets.yml|*/secrets.yaml)   block "refuse to write secrets file: $FILE" ;;
      */credentials*)                 block "refuse to write credentials file: $FILE" ;;
      *.key|*.pem|*id_rsa*|*id_ed25519*) block "refuse to write private key: $FILE" ;;
    esac
    ;;

  Bash)
    CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
    case "$CMD" in
      *"rm -rf "*)                    block "refuse destructive rm -rf: $CMD" ;;
      *"git push --force"*)           block "refuse git push --force: $CMD" ;;
      *"git reset --hard"*)           block "refuse git reset --hard: $CMD" ;;
      *"prisma migrate deploy"*)      block "refuse prisma migrate deploy (needs HITL): $CMD" ;;
      *"prisma migrate reset"*)       block "refuse prisma migrate reset (destroys data): $CMD" ;;
      *"kubectl apply"*)              block "refuse kubectl apply (needs HITL): $CMD" ;;
      *"terraform apply"*)            block "refuse terraform apply (needs HITL): $CMD" ;;
      *"helm upgrade"*)                block "refuse helm upgrade (needs HITL): $CMD" ;;
      *"vercel deploy --prod"*)       block "refuse vercel prod deploy (needs HITL): $CMD" ;;
    esac
    ;;
esac

exit 0
