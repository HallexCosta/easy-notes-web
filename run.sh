#!/bin/sh
# Use default Dockerfile
#docker build -t easy-notes/web . \
# --no-cache
#
# Use custom Dockerfile
docker build -t easy-notes -f Dockerfile .
#  --no-cache

# Run and expose docker container
docker run -t -i \
  -p 3000:3000 \
  easy-notes

