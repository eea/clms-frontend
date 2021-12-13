#!/bin/bash
DEPENDENCIES=$(jq -r '.dependencies|keys[]' package.json)
for dependency in $DEPENDENCIES; do
    yarn add "$dependency"
    version=$(jq -r ".dependencies[\"$dependency\"]" package.json)
    git add package.json yarn.lock
    git commit -m "Release $dependency $version"
done
