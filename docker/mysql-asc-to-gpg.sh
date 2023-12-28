#!/bin/bash
set -e

# è necssario prima aver installato:
# apt-get install -y --no-install-recommends lsb-release apt-transport-https ca-certificates gnupg

# Il sito ufficiale MySql riporta la chiave necessaria per installare mysql-client / mysql-server
# tramite "apt-get" in questa pagina: https://dev.mysql.com/doc/refman/8.0/en/checking-gpg-signature.html
# AGGIORNAMENTO DICEMBRE 2023: le chiavi sono adesso elencate in questa pagina:
#   https://repo.mysql.com/
# la chiave è in formato .asc, ma per usarla con "apt-get" deve essere convertita in formato .gpg
# I seguenti comandi partono dal file .asc e genera il corrispondente .gpg

gpg --no-default-keyring --keyring ./temp-keyring.gpg --import ./mysql.asc
gpg --no-default-keyring --keyring ./temp-keyring.gpg --export --output ./mysql.gpg
rm ./temp-keyring.gpg

# Il file .gpg deve essere salvato nella directory:
# /usr/local/share/keyrings/

# Succesiivamente, nella cartella /etc/apt/sources.listd.d/ è necessario aggiungere un
# file con il seguente contentuto:
# deb [signed-by=/usr/local/share/keyrings/mysql.gpg] http://repo.mysql.com/apt/debian/ bullseye mysql-8.0