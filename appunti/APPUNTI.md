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

# Librerie per varie funzioni

- Tanstack sembra essere una buona collezione di librerie tutte provenienti dallo stesso autore:
  https://tanstack.com/

le librerie che mi interesserebbero sono:

- tanstack query (di fatto giù utilizzata da tRPC).
- tanstack table (per costruire le proprie tabelle)
- tanstack form (per gestire i form)
- tanstack router (sembra gestire bene tante cose per creare un router)
- tanstack chart (per fare qualche grafico semplice)

Da quello che però che ho visto e che ho letto in giro, di fatto solo "tanstack query" è quella più
famosa e supportata (forse anche "tanstack table").
Da quello che ho visto, altre librerie (tipo "tanstack form") sono meno utilizzate e hanno
davvero poca documentazione (il sito ufficiale spiega veramente poco delle opzioni disponibili).
Probabilmente ciò è dovuto al fatto che tutte queste librerie sono mantenute da una singola persona.
Veramente un gran peccato. Sarebbe stato ottimo avere così tanti componenti forniti dallo stesso fornitore.

Per quel che ho visto le librerie consigliate sono:

- [React hook form](https://react-hook-form.com/) per i form (molto semplice da usare, non causa troppi re-rendering del form)
- [AG Grid](https://www.ag-grid.com/) per le tabelle (è praticamente una ExtJS avanzato). permette anche di avere dei grafici
  alcune funzioni sono però a pagamento (p.e. il chiedere i dati al server) e non costa poco....
- [React Router] (https://reactrouter.com/en/main) per crare il routing (in realtà nel mio caso non serve, tutto questo è gestito da Next)

# Librerie per grafica

Tailwind è un modo più conveniente di scrivere il CSS. Stop. Non è nulla di più.

Quelle che in giro vengono definite "Headleass UI" sono librerie che implementano la
logica per creare alcuni componento con azioni dinamiche (p.e. tab, popup, etc.)

Il team che ha sviluppato Taiwind ha rilasciato anche:
[tailwind UI] (https://tailwindui.com/): libreria di componenti e template. Pochi i componenti/template gratuiti.
non installi tali componenti, ma copi e incolli il codice che ti forniscono.
Con circa 750 dollari, si possono avere i componenti a pagamento e anche tutto ciò che rilasciano
in futuro. Non male.
Molti dei componenti di Tailwind UI usando anche [Headless UI] una libreria sempre dal team che
ha sviluppato Tailwind. La Headleass UI serve per dare dinamicità ai componenti

Librerie grafiche:

- [DaisyUI](https://daisyui.com/): aggiunge delle classi (usando tailwind) per implementare alcune funzionalità
  è bello che funzioni come tailwind (tutto tramite classi). Permette di gestire tab e dialog, non ha nulla per notifiche e tabelle.
  Di fatto permette di gestire con semplicità solo pochi casi semplici (come faceva boostrap).
  La cosa più carina che ho visto è lo "skeleton" (disegna i riquadri animati per il caricamento in corso).
- [RadixUI](https://www.radix-ui.com/) fornisce delle primitive di logica per poi costruire elementi HTML complessi.
  ha primitive per dialog e notifiche e tab, non ha nulla per le tabelle. Molto verboso.
  Server solo per la logica, non ti da alcuno stile.
- [ChackraUI](https://chakra-ui.com/): fornisce un po di componenti con una loro logica. NON USA TAILWIND,
  ti obbliga ad usare dei suoi attributi sui componenti per impostare le proprietà. Non bene.
- [Mantine UI](https://ui.mantine.dev/): una collezione di pochi componenti già pronti. Tutti gratuiti. Nulla di che.
- [React Aria](https://react-spectrum.adobe.com/react-aria/index.html): fornisce alcune primitive (sopratutto per i form) e
  qualche primitiva per le tabelle. Le primitive che offre sono tante (anche tramite Hook) e c'è poco di pronto.
  È compito dello sviluppatore creare i componenti usando le primitive fornite. Buon supporto a internalizzazione
  e accessibilità. Finisce con implementare anche alcune funzionalità dei form (che invece magari preferirei continuare a
  gestire con react-hook-form).
  È l'unico che ho visto fornire delle primitive per il drag & drop.
- [TailwindUI] (https://tailwindui.com/) un po' di componenti già pronti. I componenti free usano headless ui per la logica
  ma Headleass UI fornisce veramente pochi pezzi di logica.
  Lo stesso team di Taiwind UI sta per rilasciare [Catalyst](https://tailwindui.com/templates/catalyst), una collezione di alcuni componenti un po' più aggiornati.
- [PrimeReact](https://primereact.org/): mi ha impressionato molto. Ha tantissimi componenti. Alcuni banali (e quindi con
  tante opzioni) altri più complessi, ma che arrivano quindi con tante opzioni di configurazione. Compreso il poter sempre
  iniettare un proprio "template" per cambiare l'aspetto del componente.
  Sono implementati tanti campi per i form ma non la gestione del form stesso (che posso quindi continuare a gesitre con
  react-hook-form, ci sono anche delle indicazioni nella documentazione).
  Ha una tabella abbastanza avanzata, dialog, tab, popup, notifiche. Ha anche azioni per lo "scheletro".
  Ha anche una primitiva progettata per cambiare le classi di un elmento a seguito di un click (cosa perfetta
  per tailwind).
  Di default i componenti hanno già un loro stile / tema (fatto con bootstrap), tuttavia è supportato anche l'usere
  "className" per impostare gli stili con Tailwind.
  Credo questa sia veramente una ottima libreria di "HTML Potenziato" con tante cose già coperte (ed è tutto gratis).
  Ha un negozio dove si possono acquistare dei template già pronti a circa 20 dollari (curiosamente ci sono anche per Angular)
- [Material UI](https://mui.com/material-ui/): ha tanti componenti, lo stile è fisso ed è lo stile "Material" creato da Google,
  non c'è scelta. Mi sembra che fornisca quasi le stesse cose di "PrimeReact" ma quest'ultimo è gratuito mentre MaterialUI
  pare avere qualche componente a pagamento.
- [AG Grid](https://www.ag-grid.com/): fa solo tabelle e grafici, però li fa bene e offrendo tantissimo controllo. È l'erede
  delle liste fatte con ExtJS.

https://www.reddit.com/r/reactjs/comments/xcgyj4/what_react_ui_component_library_do_you_use_and_why/
una discussione su quale libreria usare. I pareri sono:

- se vuoi fare una cosa veloce, usa qualcosa con controlli e stile già decisi, p.e. Material UI
- altrimenti, crea i tuoi componenti con tailwindCSS. La logica ce la metti tu.
- più persone si sono trovate bene a usare "PrimeReact" per creare applicazioni enteprise (pannelli di controllo).

Cosa uso in questo progetto?

- react-hook-form: mi sembra semplice, l'ho già capito
- (?) PrimeReact: mi da tanto "HTML Potenziato" che altrimenti dovrei reinventare io;
-
