#!/bin/sh

# Stampa nel terminale il completo da lanciare per aprire VSCode
# direttamente dentro il devcontainer. Puuò quindi essere usato per
# creare una scorciatoioa sul Desktop.

if [ -z "$(command -v wslpath)" ]:
then
  echo "ERRORE: eseguire il comando dentro WSL2 e non dentro il container"
  exit 1
fi

WORSPACEFOLDER=$(grep -Po '(?<="workspaceFolder": ")[^"]*' .devcontainer.json)
MYPATH="$(wslpath -w $PWD)"
MYPATHHEX=$(printf "%s" "$MYPATH" | hexdump -v -e '/1 "%02x"')

echo "code --folder-uri \"vscode-remote://dev-container+${MYPATHHEX}${WORSPACEFOLDER}\""