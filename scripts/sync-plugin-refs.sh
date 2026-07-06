#!/usr/bin/env bash
# docs/·tokens/ 원본을 플러그인 스킬의 references/ 사본으로 동기화한다.
# docs 또는 tokens 수정 후 반드시 실행하고 함께 커밋할 것.
set -euo pipefail
cd "$(dirname "$0")/.."
DEST="plugins/class101-admin/skills/design/references"
mkdir -p "$DEST"
cp docs/layout-patterns.md "$DEST/layout-patterns.md"
cp tokens/tokens.md "$DEST/tokens.md"
echo "synced -> $DEST"
