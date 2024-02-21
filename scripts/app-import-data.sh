#!/bin/bash
set -e

source .env.development

read -sp "nome file per importazione db (default: \"data.sql\"): " SQLFILE
echo ""

read -sp "nome file per importazione contenuti (default: \"data.zip\"): " ZIPFILE
echo ""

if [ -z "${SQLFILE}" ]
then
  SQLFILE="data.sql"
fi

if [ -z "${ZIPFILE}" ]
then
  ZIPFILE="data.zip"
fi

mysql -u"${DBUSER}" -p"${DBPASS}" -h"${DBHOST}" --database="${DBNAME}" < "data/${SQLFILE}"
echo ""

(cd public/ && rm -rf thumb/ && rm -rf content/ && unzip ../data/${ZIPFILE})
echo ""