#!/bin/sh

set -e

pnpm install

# Connect the apps to the mock servers in `compose.yaml`.
./scripts/setup-mock-env.sh
