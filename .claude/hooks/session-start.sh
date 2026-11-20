#!/bin/bash
#
# Sets up Claude Code cloud sessions: installs the dependencies and starts the
# mock servers in `compose.yaml`.

set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# Use the version of pnpm specified in `devEngines`. Older versions cannot read
# the lockfile.
pnpm_version="$(node --print 'require("./package.json").devEngines.packageManager.version')"
if [ "$(pnpm --version 2>/dev/null || true)" != "$pnpm_version" ]; then
  (cd / && npm install --global "pnpm@$pnpm_version")
fi

# Run the install only if a listed file has changed since the install last
# succeeded.
hashes=node_modules/.session-start.sha256
if ! sha256sum --check --status "$hashes" 2>/dev/null; then
  # Delete the old hashes first, so a failed install runs again next time.
  rm -f "$hashes"

  pnpm install

  sha256sum .claude/hooks/session-start.sh package.json pnpm-lock.yaml \
    pnpm-workspace.yaml apps/*/package.json packages/*/package.json \
    website/package.json > "$hashes" || rm -f "$hashes"
fi

# Connect the apps to the mock servers.
./scripts/setup-mock-env.sh
./scripts/start-mocks.sh
