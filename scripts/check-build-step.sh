#!/bin/bash

# Used as the Ignored Build Step on Vercel.
# Exit code 1 proceeds with the build, and exit code 0 cancels it.

echo "VERCEL_ENV: $VERCEL_ENV"
echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"

# Matches the release commits created by release-please,
# e.g. "chore: release main (#1234)".
release_pattern='^chore:[[:space:]]+release[[:space:]]+main[[:space:]]+\(#[0-9]+\)'

if [[ "$VERCEL_ENV" != "production" || "$VERCEL_GIT_COMMIT_MESSAGE" =~ $release_pattern ]]; then
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1
else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0
fi
