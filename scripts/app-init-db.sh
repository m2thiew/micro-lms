#!/bin/bash
set -e

source './.env.development'

read -sp "password root di mysql (default: \"root\"): " DBROOTPASS

if [ -z "${DBROOTPASS}" ]
then
  DBROOTPASS="root"
fi

QUERIES="
CREATE USER IF NOT EXISTS \`${DBUSER}\`@\`%\` IDENTIFIED WITH caching_sha2_password BY '${DBPASS}';

CREATE DATABASE IF NOT EXISTS \`${DBNAME}\`;
CREATE DATABASE IF NOT EXISTS \`${DBNAME}${DBSHADOWSUFFIX}\`;

GRANT ALL PRIVILEGES ON \`${DBNAME}\`.* TO \`${DBUSER}\`@\`%\` WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON \`${DBNAME}${DBSHADOWSUFFIX}\`.* TO \`${DBUSER}\`@\`%\` WITH GRANT OPTION;
"

mysql -uroot -p"${DBROOTPASS}" -h${DBHOST} -e "${QUERIES}"