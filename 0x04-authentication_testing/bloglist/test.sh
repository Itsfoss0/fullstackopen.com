#!/usr/bin/env bash

# setup testing environment 

export TEST_DB="mongodb://127.0.0.1/bloglisttest"
export PORT=1337
export NODE_ENV=test
export JWT_SECRET_KEY=$SSH_AUTH_SOCK # don't use this

