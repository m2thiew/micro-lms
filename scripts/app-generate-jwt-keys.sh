#!/bin/bash
set -e

# crea la cartella secrets
test ! -e secrets && mkdir secrets

# Genera la chiave private da usare per JWT
openssl genpkey -algorithm RSA -out secrets/jwt_private.pem -pkeyopt rsa_keygen_bits:2048

# Genera la chiave pubblica da usare per JWT
openssl rsa -pubout -in secrets/jwt_private.pem -out secrets/jwt_public.pem