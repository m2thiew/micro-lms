### Installazione

npm create t3-app@latest
mv t3-app01/\* ./
mv t3-app01/.env t3-app01/.env.example t3-app01/.eslintrc.cjs t3-app01/.gitignore ./
rmdir t3-app01/

cp /var/app/minimal-terminal-prompt.sh /home/matteo/
source .bashrc

$ cat .bash_profile

# Personalizza il come viene esposto il percorso nella shell.

PS1='\[\033]0;$TITLEPREFIX:$PWD\007\]\n\[\033[32m\]\u@\h \[\033[35m\]\[\033[33m\]\w\[\033[36m\]`__git_ps1`\[\033[0m\]\n$ '

https://unix.stackexchange.com/questions/10428/simple-way-to-create-a-tunnel-from-one-local-port-to-another
sudo apt install socat
socat tcp-listen:9001,reuseaddr,fork tcp:localhost:9229

#!/bin/sh
socat tcp-listen:8229,reuseaddr,fork tcp:localhost:9229 &
socat tcp-listen:8230,reuseaddr,fork tcp:localhost:9230 &
NODE_OPTIONS='--inspect' exec npm run dev

https://stackoverflow.com/questions/68472903/child-height-will-not-follow-parent-container

launch.json
{
"name": "Docker attach",
"type": "node",
"request": "attach",
"port": 9001,
"remoteRoot": "/var/app",
"localRoot": "${workspaceDir}",
}

### avvio

cd docker/
docker build -t debian-server --build-arg USER=$(id -nu) --build-arg UID=$(id -u) --build-arg GID=$(id -g) .

docker compose -f docker-compose.yml -f docker-compose.debug.yml config
docker compose -f docker-compose.yml -f docker-compose.debug.yml up -d
docker compose -f docker-compose.yml -f docker-compose.debug.yml down

https://github.com/vercel/next.js/issues/54010
https://github.com/vercel/next.js/pull/53683

/home/matteo/t3-app01/node_modules/next/dist/esm/server/lib/utils.js
/home/matteo/t3-app01/node_modules/next/dist/server/lib/utils.js

```
return debugPortStr ? parseInt(debugPortStr, 10) : 9229;
```

```
const matched = debugPortStr ? debugPortStr.match(/(?<=:)\d+$/)
    let parsedDebugPort =
      matched && Array.isArray(matched) && matched.length > 0
        ? parseInt(matched[0], 10)
        : 9229
    if (!matched && debugPortStr) {
      parsedDebugPort = parseInt(debugPortStr, 10)
    }
    return parsedDebugPort
```

https://www.nervestaple.com/2021/09/25/vscode-devcontainers/

https://containers.dev/implementors/json_reference/

https://github.com/microsoft/vscode-remote-release/issues/2133#issuecomment-1705264644
sudo apt install bsdextrautils
mypath="$(wslpath -w $PWD)" && p=$(printf "%s" "$mypath" | hexdump -v -e '/1 "%02x"') && code --folder-uri "vscode-remote://dev-container+${p}/var/app"

code --folder-uri "vscode-remote://wsl+Debian/home/matteo/t3-app01"

wsl -d Debian --cd "/home/matteo/t3-app01" -e "./open-devcontainer.sh"

ENV DEBIAN_FRONTEND=noninteractive
apt-get install -y --no-install-recommends lsb-release apt-transport-https ca-certificates gnupg
deb [signed-by=/usr/local/share/keyrings/mysql.gpg] http://repo.mysql.com/apt/debian/ bullseye mysql-8.0

wsl -d Debian -e docker exec -it t3-app01 bash

installare mysql cli
npm comando di import mysql (con lettura da .enc)
npm comando di dump mysql (con lettura da .enc)

https://dev.to/shacodes/most-commonly-used-library-with-react-5akm
https://www.reddit.com/r/reactjs/comments/tsuluw/updated_rundown_of_react_libraries_to_use_in_2022/
https://www.reddit.com/r/reactjs/comments/vxklim/best_react_libraries_to_use_in_2022/

- Bullet proof React (consigli sul come strutturare il codice)
  https://github.com/alan2207/bulletproof-react

- Elenco di librerie da usare per ogni aspetto
  https://www.robinwieruch.de/react-libraries/

https://github.com/ryanmcdermott/clean-code-javascript
https://github.com/kettanaito/naming-cheatsheet

https://www.reddit.com/r/tailwindcss/comments/jh6f29/list_of_free_tailwind_css_themes_and_templates/
https://www.reddit.com/r/tailwindcss/comments/st71fc/is_there_a_market_for_tailwind_css_templates/

estensione di tailwind:
https://daisyui.com/

compnenti Reract (oppure esempi di html con classi Tailwind) con molte cose:
https://flowbite.com/docs/getting-started/introduction/

un template (free + admin) per una dashboard:
https://tailadmin.com/

tailwind è solo CSS + DaisyUI è CSS precompbinato (stile boostrap) + altre librerie:
https://www.youtube.com/watch?v=CQuTF-bkOgc

Video molto bello su laravel:

- usare Laravl è comdo se lo usi anche per la view
  -usando laravel solo per il backend, lo si usa solo per i database, e la libreria di
  validazione (che può fare query, molto più avanzata di ZOD) e l'upload dei file
  https://www.youtube.com/watch?v=MYyJ4PuL4pY

- JWT con chiave assimetrica (il fronted può verificare il login senza chiamare il server)
  https://dev.to/eduardstefanescu/jwt-authentication-with-asymmetric-encryption-using-certificates-in-asp-net-core-2o7e
  openssl genpkey -algorithm RSA -out jwt_private.pem -pkeyopt rsa_keygen_bits:2048
  openssl rsa -pubout -in jwt_private.pem -out jwt_public.pem

- Usare contesti con custom hook:
  https://www.johno.com/using-react-context-with-a-custom-hook

- Libreria erede di moment JS: per rappresentare ma anche formattare le date in JS:
  https://moment.github.io/luxon/#/
