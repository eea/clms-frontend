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

if [ -z "${NVM_DIR:-}" ]; then
export NVM_DIR="$HOME/.nvm"
fi

if ! command -v nvm >/dev/null 2>&1; then
for nvmPath in \
"$NVM_DIR/nvm.sh" \
"$HOME/.nvm/nvm.sh" \
"$HOME/.config/nvm/nvm.sh" \
"/opt/homebrew/opt/nvm/nvm.sh" \
"/usr/local/opt/nvm/nvm.sh" \
"/usr/share/nvm/init-nvm.sh" \
"/usr/share/nvm/nvm.sh"
do
if [ -s "$nvmPath" ]; then
. "$nvmPath"
break
fi
done
fi

if ! command -v nvm >/dev/null 2>&1; then
echo "nvm is required but was not found in this shell."
exit 1
fi

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