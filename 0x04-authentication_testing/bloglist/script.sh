#!/usr/bin/env bash

# setup environment
# source this in dev environment
# before running `npm start`
# WARNING: Not to be used for production

export NODE_ENV=prod
export MONGO_URI="mongodb://127.0.0.1/bloglist"
export PORT=1337
export JWT_SECRET_KEY=$SSH_AUTH_SOCK # don't use this

