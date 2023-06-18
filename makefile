#!/bin/bash

npm run build
git add -A
git commit -s -m "wip: test"
git push

git tag -d v0.1
git push --delete origin v0.1
git tag v0.1
git push origin v0.1

clear
