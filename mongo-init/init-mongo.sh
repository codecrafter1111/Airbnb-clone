#!/bin/sh
set -e

mongosh <<EOF
use ${MONGO_DATABASE}
db.createUser({
  user: "${MONGO_APP_USERNAME}",
  pwd: "${MONGO_APP_PASSWORD}",
  roles: [{ role: "readWrite", db: "${MONGO_DATABASE}" }]
})
EOF
