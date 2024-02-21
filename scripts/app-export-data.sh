#!/bin/bash
set -e

source .env.development

read -sp "nome file per esportazione db (default: \"data.sql\"): " SQLFILE
echo ""

read -sp "nome file per esportazione contenuti (default: \"data.zip\"): " ZIPFILE
echo ""

if [ -z "${SQLFILE}" ]
then
  SQLFILE="data.sql"
fi

if [ -z "${ZIPFILE}" ]
then
  ZIPFILE="data.zip"
fi

mysqldump -u"${DBUSER}" -p"${DBPASS}" -h"${DBHOST}" --single-transaction --skip-lock-tables --skip-comments --no-tablespaces "${DBNAME}" > "data/${SQLFILE}"
echo ""

(cd public/ && zip -r ../data/${ZIPFILE} thumb content)
echo ""
