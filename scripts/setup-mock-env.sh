#!/bin/sh
#
# Creates `.env.local` that connects to the mock servers for each app unless it
# already exists. The settings are taken from the commented out lines of
# `.env.local.example`.

set -eu

cd "$(dirname "$0")/.."

for app in apps/inaba-jinja apps/neru-camera; do
  if [ -e "$app/.env.local" ]; then
    echo "Skipped $app/.env.local because it already exists."
    continue
  fi

  sed -E \
    -e '/^NEXT_PUBLIC_CONTENTFUL_(ACCESS_TOKEN|SPACE_ID)=$/d' \
    -e 's/^# ((NEXT_PUBLIC_)?CONTENTFUL_[A-Z_]+=)/\1/' \
    "$app/.env.local.example" > "$app/.env.local"
  echo "Created $app/.env.local."
done
