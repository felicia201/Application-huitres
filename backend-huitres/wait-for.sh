#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

until nc -z "$host" 3306; do
  >&2 echo "🕓 Waiting for MySQL ($host) to be ready..."
  sleep 2
done

>&2 echo " MySQL is up - executing command"
exec $cmd
