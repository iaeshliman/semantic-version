#!/bin/bash

git tag -d v0.1
git push --delete origin v0.1
git tag v0.1
git push origin v0.1
