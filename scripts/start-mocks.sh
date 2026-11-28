#!/bin/sh
#
# Starts the mock servers defined in `compose.yaml`. When the Docker daemon is
# not running (e.g. in Claude Code cloud sessions), it is started first.

set -eu

cd "$(dirname "$0")/.."

if ! docker info > /dev/null 2>&1; then
  if ! command -v dockerd > /dev/null 2>&1 || [ "$(id -u)" -ne 0 ]; then
    echo "The Docker daemon is not running." >&2
    exit 1
  fi

  echo "Starting the Docker daemon..."
  nohup dockerd --config-file "$PWD/scripts/daemon.json" > /tmp/dockerd.log 2>&1 &

  i=0
  until docker info > /dev/null 2>&1; do
    i=$((i + 1))
    if [ "$i" -ge 30 ]; then
      echo "The Docker daemon did not start. See /tmp/dockerd.log." >&2
      exit 1
    fi
    sleep 1
  done
fi

# Pulling an image sometimes fails temporarily (e.g. 429 Too Many Requests),
# so retry with backoff.
attempt=1
until docker compose up --detach --wait; do
  if [ "$attempt" -ge 5 ]; then
    echo "Failed to start the mock servers." >&2
    exit 1
  fi

  delay=$((attempt * 10))
  echo "Retrying in ${delay} seconds..." >&2
  sleep "$delay"
  attempt=$((attempt + 1))
done
