#!/bin/bash
set -e

source .env.development

read -sp "nome file da importare (default: \"dump.sql\"): " DUMPFILE

if [ -z "${DUMPFILE}" ]
then
  DUMPFILE="dump.sql"
fi

mysql -u"${DBUSER}" -p"${DBPASS}" -h"${DBHOST}" --database="${DBNAME}" < "prisma/${DUMPFILE}"