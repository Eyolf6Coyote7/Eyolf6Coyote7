#!/usr/bin/env bash
# PreToolUse hook: enforce red-line rules for 3d_asset_collaboration.
# Extra rules vs the default: block EF Core migrations, block dotnet publish, block timescale DROP/ALTER.

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
      *.env|*.env.*)                                          block "refuse to write .env file: $FILE" ;;
      *asset-api/Migrations/*)                                block "refuse to write EF Core migration directly: $FILE" ;;
      *asset-api/appsettings.Production.json)                 block "refuse to write asset-api prod settings: $FILE" ;;
      *iot-consumer/appsettings.Production.json)              block "refuse to write iot-consumer prod settings: $FILE" ;;
      *unity-client/*)                                        block "refuse to touch unity-client (Unity binaries opaque to code review): $FILE" ;;
      */secrets.yml|*/secrets.yaml)                           block "refuse to write secrets file: $FILE" ;;
      */credentials*)                                         block "refuse to write credentials file: $FILE" ;;
      *.key|*.pem|*id_rsa*|*id_ed25519*)                      block "refuse to write private key: $FILE" ;;
    esac
    ;;

  Bash)
    CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
    case "$CMD" in
      *"rm -rf "*)                                            block "refuse destructive rm -rf: $CMD" ;;
      *"git push --force"*)                                   block "refuse git push --force: $CMD" ;;
      *"git reset --hard"*)                                   block "refuse git reset --hard: $CMD" ;;
      *"dotnet ef database update"*)                          block "refuse dotnet ef database update (needs HITL): $CMD" ;;
      *"dotnet ef database drop"*)                            block "refuse dotnet ef database drop (destroys data): $CMD" ;;
      *"dotnet publish -c Release"*)                          block "refuse dotnet prod publish (needs HITL): $CMD" ;;
      *"DROP TABLE"*|*"DROP HYPERTABLE"*)                     block "refuse raw DROP on TimescaleDB: $CMD" ;;
      *"ALTER HYPERTABLE"*)                                   block "refuse ALTER HYPERTABLE without HITL: $CMD" ;;
      *"kubectl apply"*)                                      block "refuse kubectl apply (needs HITL): $CMD" ;;
      *"terraform apply"*)                                    block "refuse terraform apply (needs HITL): $CMD" ;;
      *"helm upgrade"*)                                       block "refuse helm upgrade (needs HITL): $CMD" ;;
    esac
    ;;
esac

exit 0
