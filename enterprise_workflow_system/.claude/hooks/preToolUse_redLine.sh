#!/usr/bin/env bash
# PreToolUse hook: enforce red-line rules for enterprise_workflow_system.
# Extra rules vs the default: block Flyway + Laravel migrations, block Gradle publish, block artisan migrate.

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
      *.env|*.env.*)                                 block "refuse to write .env file: $FILE" ;;
      *workflow-api/src/main/resources/db/migration/*) block "refuse to write Flyway migration directly: $FILE" ;;
      *admin-api/database/migrations/*)              block "refuse to write Laravel migration directly: $FILE" ;;
      *workflow-api/src/main/resources/schema/*.graphqls) block "refuse to write GraphQL schema without review: $FILE" ;;
      */secrets.yml|*/secrets.yaml)                  block "refuse to write secrets file: $FILE" ;;
      */credentials*)                                block "refuse to write credentials file: $FILE" ;;
      *.key|*.pem|*id_rsa*|*id_ed25519*)             block "refuse to write private key: $FILE" ;;
    esac
    ;;

  Bash)
    CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
    case "$CMD" in
      *"rm -rf "*)                                   block "refuse destructive rm -rf: $CMD" ;;
      *"git push --force"*)                          block "refuse git push --force: $CMD" ;;
      *"git reset --hard"*)                          block "refuse git reset --hard: $CMD" ;;
      *"./gradlew flywayMigrate"*)                   block "refuse Flyway migrate (needs HITL): $CMD" ;;
      *"./gradlew publishToNexus"*)                  block "refuse Nexus publish (needs HITL): $CMD" ;;
      *"php artisan migrate --force"*)               block "refuse Laravel force-migrate (needs HITL): $CMD" ;;
      *"php artisan migrate:fresh"*)                 block "refuse Laravel migrate:fresh (destroys data): $CMD" ;;
      *"kubectl apply"*)                             block "refuse kubectl apply (needs HITL): $CMD" ;;
      *"terraform apply"*)                           block "refuse terraform apply (needs HITL): $CMD" ;;
      *"helm upgrade"*)                              block "refuse helm upgrade (needs HITL): $CMD" ;;
    esac
    ;;
esac

exit 0
