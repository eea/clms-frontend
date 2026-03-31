#!/bin/bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MRS_FILE="$PROJECT_ROOT/mrs.developer.json"

updateDevelopFlag() {
  targetState="$1"
  tempFilePath="$(mktemp)"
  if [ "$targetState" = "true" ]; then
    sed 's/"develop": false/"develop": true/g' "$MRS_FILE" > "$tempFilePath"
  else
    sed 's/"develop": true/"develop": false/g' "$MRS_FILE" > "$tempFilePath"
  fi
  mv "$tempFilePath" "$MRS_FILE"
}

cd "$PROJECT_ROOT"

git checkout develop
nvm install Gallium
git reset --hard
git pull origin develop

rm -rf node_modules build
yarn cache clean
yarn

updateDevelopFlag true
yarn develop
updateDevelopFlag false

docker pull eeacms/clms-frontend
docker pull eeacms/clms-backend