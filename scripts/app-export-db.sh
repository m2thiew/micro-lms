#!/bin/bash
set -e

source .env.development

read -sp "nome file da esportare (default: \"dump.sql\"): " DUMPFILE

if [ -z "${DUMPFILE}" ]
then
  DUMPFILE="dump.sql"
fi

mysqldump -u"${DBUSER}" -p"${DBPASS}" -h"${DBHOST}" --single-transaction --skip-lock-tables --skip-comments --no-tablespaces "${DBNAME}" > "prisma/${DUMPFILE}"