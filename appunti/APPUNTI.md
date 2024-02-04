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
  Ha pochi stili per i form (p.e. per evidenziare un input come non valido)
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
- [Tabler](https://tabler.io/): boostrap + alcune classi per implementare componenti usati normalmente nei pannelli di
  controllo. Mi è piaciuto tanto, anche se è meno ricco di PrimeReact.
  Purtroppo non è costruito con TailwindCSS, quindi non saprei come integrare entrambi :(
- [ShadCN](https://ui.shadcn.com/): ti fornisce il codice JSX da copiare (oppure usi un comando cli) che ti genera il codice.
  l'idea è che ti copi un codice di partenza, con uno stile neutro (brutto) e un po' di JS di logica dentro al tuo progetto,
  poi ci pensi tu a cambiare lo stile del codice copiato una volta dentro il tuo progetto.
  Per afforntare i componenti dinamici usa di volta in volta librerie diverse (p.e. react-hook-form, tanstack/table).
  L'idea è ottima, però lo stile che offre è davvero brutto. Serve usare un altro stile!
- [Flowbite](https://flowbite.com/): componenti fatti con Tailwind. Offre due modalità di utilizzo:
  - o copi e incolli il codice HTML con le classi Tailwind. Per i componenti con la logica, c'è un file JS costruito da loro che permette di gestire la logica per varie casistiche di componenti.
  - Installi "react-flowbite". Ti fornisce dei componenti già fatti con (con lo stile di "Flowbyte") e la logica già predisposta.
    è possibile personalizzare lo stile usando "className" e le regole di tailwind.
    Lo stile della libreria è carino, ricorda bootstrap. Lo stile è di fatto dato dalle classi tailwind usate nei componenti, quindi basta
    cambiare tali classi e si cambia anche lo stile.
    Offre abbstanza componenti (più di DaisyUI, ma meno di PrimeReact).

È possibile vedere l'elenco di tutti i UI kit costruiti con tailwind a questa pagina:
https://www.tailwindawesome.com/?type=kit
DaisyUI è ancora il UI kit più popolare (fra quelli gratuiti)

https://www.reddit.com/r/reactjs/comments/xcgyj4/what_react_ui_component_library_do_you_use_and_why/
una discussione su quale libreria usare. I pareri sono:

- se vuoi fare una cosa veloce, usa qualcosa con controlli e stile già decisi, p.e. Material UI
- altrimenti, crea i tuoi componenti con tailwindCSS. La logica ce la metti tu.
- più persone si sono trovate bene a usare "PrimeReact" per creare applicazioni enteprise (pannelli di controllo).

---

Cosa uso in questo progetto?

Riflettendoci, alla fine per creare dei componenti riutilizzabili significa comunque alla fine creare delle classi "Componente" da
usare dentro al proprio progetto. Si arriverà al punto quindi in cui si lavorerà con un misto di HTML e Componenti creati nel progetto e anche
componenti creati da altri.

Quindi in fondo, in fondo, non conviene molto usare daisyUI. Ha molto più senso la logica di ShadCN a cui però bisogna assolutamente
abbinare uno stile migliore (perchè lo stile di default è brutto!)

---

Anche scelgiere le icone è un'impresa. Ci sono tantissime possibilità.

- [react-icons](https://react-icons.github.io/react-icons/): raccoglie e mette a disposizione le icone di tantissimi progetti open source fra cui:
  - [bootstrap](https://icons.getbootstrap.com/)
  - font awesome 5 e 6 (solo le icone gratis)
  - heoricons (sviluppate dal team di tailwind)
  - [tabler](https://tabler.io/icons)
    Per tutte queste icone è disponibile un componente già pronto per esporle. Ogni pacchetto di icone ha
    il suo prefisso.
- [Flowbite icons](https://flowbite.com/icons/): sarebbero le icone ufficiali di Flowbite. Sono carine, ma
  attualmente offrono solo la possibilità di essere copiate come SVG

È disponibile anche questo sito che raccoglie un numero ancora maggiore di icone:
https://icon-sets.iconify.design/
Questo sito offre una libreria per usare le sue icone con React installando @iconify/react + @iconify/icons-[sigla] e importando manualmente il perorso della icona.

Con le librerie per le icone è la prima volta che trovo alcuni piccoli difetti:

- react-icons:
  - di default non funziona l'autocompletamento (IntelliSense). bisogna importare almeno "react-icons/[sigla]" per vedere funzionare l'autocompletamento
  - è possibile personalizzare l'icona tramite "className" ma IntelliSense non riconosce "className" come attributo valido.
  - cercare le icone sul sito react-icons non sempre conviene (p.e. cercando "user" non trovo le icone di Bootstrap perchè si chiamano "person")
  - non sono incluse le icone di flowbite

- @iconify/react
  - bisogna cercare il percorso completo da cui importare l'icona sul loro sito
  - autocompleta classname
  - sembra che non importi le icone con il tag <svg> ma includa un richiamo alle API iconify per scaricare l'icona (https://github.com/iconify/iconify/issues/234)
  - cercare le icone sul sito iconify non sempre conviene (p.e. cercando "user" non trovo le icone di Bootstrap perchè si chiamano "person")
  - non sono incluse le icone di flowbite

Ho provato per esprimento a creare un file da copiavo, adattavo ed esportavo un componente "Icon". Il risultato finale è buono,
ma è tedioso farlo una icona alla volta. Ci vorrebbe un modo per farlo a livello massivo, ma non sono riusito a trovarlo.

Avrei voluto usare le icone di Flowbite ma non sono disponibili :( (se non copiando manualmente i svg).

Per questo motivo ripiego sull'usare "react-icons", usando come riferimento le icone Bootstrap (cercandole però sul sito ufficiale https://icons.getbootstrap.com/)
Quando non trovo una icona bootstrap, allora uso una icona di tabler (cercando sul sito ufficiale https://tabler.io/icons)
Se anche su table non trovo nulla, sono allora autorizzato a cercare le icone dal primo pacchetto di "react-icons" in cui le trovo.
Opzione finale, copio i svg ed esporto manualmente un componente per esporre le icone.

**Aggiornamento**
alla fine ho scaricato i file svg del progetto [FlowbiteIcons](https://github.com/themesberg/flowbite-icons).
Ho quindi realizzato uno script che legge tali file e ci costruisce il codice JSX per esportarli (basandosi sul codice
da me precedentemente scritto e salvato in "FlowbiteIconsExperiment.tsx").

Ho quindi imparato a come scrivere uno script di node:

- ho prima provato a farlo in puro js
- poi ho tentato di farlo in TS
- ho cercato di usare ts-node, ma sembra che, oltre a non essere banale da configurare (devi passare sempre delle opzioni a node), con
  Node 20 stampa sempre un warning. Bisogna quindi passare ulteriori opzioni per sopprimere tale warning.
- online, consigliano di usare "tsx" (TypeScript Execute) in quanto più facile e che non stampa warning
- Alla fine, ho optato per creare un nuovo file "typescript.scripts.json" che istruisce il comando "tsc" (compilatore TypeScript) a
  compilare il file typescript per la sola cartella "script"

Da questa esperienza ho imparato che:

- i file "mjs" e "mts" indicano che al suo interno c'è codice "ES Module" moderno, che supporta import / export e anche await a primo livello.
- i file "cjs" e "cts" indicano che al suo interno c'è del codice "CommonJS" fatto con "require(...)"
- in generale, è adesso consigliato di usare sempre il codice "ES Module"
- in `tsconfig.json` puoi indicare che il sorgente del progetto usa codice ES Moderno ma l'output finale della build / compilazione deve essere compatibile
  con codice Js vecchio (quindi anche commonJs)
- c'è una estensione `npm intellisense` per suggerire i completamenti agli import
- si può specificare alcuni path per l'import in `tsconfig.json` (magari risolve il problema di react-icons)
- `npm completion` confiugura l'autocompletamento

**Aggiornamento 02**

Ho scoperto vari piccoli dettagli che mi hanno portato a modificare e rieseguire più volte lo script per importare le icone di Flowbite:
- per poter dare una dimensione di default (nel caso non sia specificata) bisonga usare gli attributi HTML.
- Usando le sole classi, non è poi possibile distinguere quale classe era per i valori di default e quale per i valori da sovrascrivere
- alcune icone hanno una "width" e una "height" pre-compilati (circa 60 icone su 450), tutti gli altri no. 
- Ho dovuto quindi modificare lo script affinchè aggiungesse `width` e `height` solo dove effettivamente mancava
- Tante icone (almeno 200) avevano `fill` e/o `stroke` compilati con dei colori hardocded, non sovrascrivibili via classi CSS
- ho quindi modificato lo script per forzare `fill` e `stroke` a "currentColor"
- senza specificare il tipo della icona esportata, VSCode impiegava circa 5/6 secondi a salvare le modifiche al file generato
- includendo la dichiarazione del tipo delle icone esportate il tempo si è abbassato a 1/2 secondi.
- specificare i tipi delle variabili nel codice TS, quindi, aiuta a ridurre i tempi di elaborazione
- alcune icone hanno degli errori ortografici (p.e. "adress-book"). Non mi metto a correggere tali errori.

Ho perso tanto tempo con questi dettagli. Ero quasi tentato di eseguire lo stesso processo anche per le icone di Bootstrap / Tabler ma ho poi notato che hanno delle altre impostazioni diverse nei loro svg (p.e. le icone di tabler hanno un area di disegno grossa ma poi l'icona in se è piccola).
meglio quindi rinunciare a cercare di fare ancora tutto questo lavoro per delle altre icone. Sono già contento di esserci riuscito con le icone Flowbite.

# Riassunto

Librerie da usare durante lo sviluppo:

- react-hook-form: mi sembra semplice, l'ho già capito
- ShadCN: copio a mano i vari componenti che mi interessano
- Flowbite: copio il codice html con le classe tailwind al fine di imitare il loro stile
- icone:
  - utilizzare le icone Flowbite (importate manualmente in "frontend/icons") (https://flowbite.com/icons/)
  - prima si cercano le icone Bootstrap (https://icons.getbootstrap.com/) usando react-icons/bs
  - poi si cercano le icone Tabler (https://tabler.io/icons) usando react-icons/tb
  - poi si cerca una qualsiasi altra icona di "react-icons"
  - ultima istanza, si copia il svg e si esporta un componente creato a mano in "frontend/icons"
- contex per DI...
- Eslint strict...


## Link per indagine sull'uso del barrell file

https://adrianfaciu.dev/posts/barrel-files/
https://uglow.medium.com/burn-the-barrel-c282578f21b6
https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/
https://steven-lemon182.medium.com/are-typescript-barrel-files-an-anti-pattern-72a713004250

https://www.codemzy.com/blog/nodejs-file-folder-structure
https://profy.dev/article/react-folder-structure
https://blog.webdevsimplified.com/2022-07/react-folder-structure/


https://github.com/microsoft/TypeScript/issues/46817
https://github.com/microsoft/TypeScript/issues/45953
https://github.com/import-js/eslint-plugin-import/issues/2384


https://stackoverflow.com/questions/64995811/eslint-no-restricted-imports-prevent-an-import-from-from-path-ending-with-patt


```
# cartelle globali
backend/
  database  # oggetto/configurazione database globale
  features  # le features
  router    # router globale per le api
  trcp      # oggetto/configurazione trpc globale

frontedn/
  features  # le features
  icons     # icone globali
  trcp      # client trpc globale

sharer/
  features  # le feature
  utils     # funzioni globali (devono funzionare sia lato fornted, sia lato backend)

# cartella feature
backend/feature/login/api.ts
frontend/feature/login/context.ts
frontend/feature/login/components/form.ts
frontend/feature/login/components/status.ts
frontend/feature/login/utils/token-storage.ts
shared/feature/login/schema.ts
shared/feature/utils/jwt-manage.ts
```

## struttura del progetto

- ogni cosa dovrebbe prima essere creata come "fetature" dentro le apposita cartelle `backend/features`, `frontend/features` e `shared/features`
- nessuna feature e/o libreria dovrebbe essere piazzata direttamente dentro `backend/`, `frontend/` e `shared/`
- dentro `backend/`, `frontend/` e `shared/` vi sono delle "categorie standard".
- il dominio delle "categorie standard" non è legato specificatamente a nessuna feature, può quindi essere utilizzata indistintamente in tutte le feature e anche ad un livello "globale".
- le "categorie standard" di una feature e/o di un livello globale sono:

| categoria    | descrizione                                                                 | scope                     | cartella e/o file                  |
| ------------ | --------------------------------------------------------------------------- | ------------------------- | ---------------------------------- |
| `components` | componenti react dotati di logica (p.e. chiamate API)                       | frontend                  | sempre cartella                    |
| `ui`         | componenti react senza logica (nessuna chiamata API)                        | frontend                  | sempre cartella                    |
| `lib`        | esportazione di librerie configurate da usare globalmente                   | frontend, backend, shared | sempre cartella                    |
| `utils`      | raccolta di funzioni usate dalla feature e/o globalmente                    | frontend, backend, shared | prima file, eventualmente cartella |
| `schema`     | schemi zod usati per la validazione                                         | shared                    | prima file, eventualmente cartella |
| `types`      | eventuali tipi che possono essere usati fuori dalla feature e/o globalmente | frontend, backend, shared | prima file, eventualmente cartella |
| `api`        | implementazioni chiamate api lato server                                    | backend                   | prima file, eventualmente cartella |


## regole per creare i file di ogni categoria

- dentro ogni feature e/o a livello globale, implementare le categorie standard creando:
  - un singolo file con il nome della `[categoria]` (p.e. "api.ts")
  - una cartella con il nome della `[categoria]` e un file con un nome e/o concetto specifico (p.e. "components/form.ts")
- se non ci sono nomi e/o concetti specifici per una categoria, allora creare sempre un singolo file (p.e. "api.ts", "schema.ts", etc.)
- eventualmente, se procedento nello sviluppo emergeranno dei concetti/nomi per specializzare il contenuto di una categoria, allora si passerà da un singolo file a una combinazione di cartella + vari file. Per esempio:
  - da `api.ts`
  - a `api/auth.ts` + `api/status.ts`
- nel decidere il nome da assegnare a un file e/o cartella, evitare di ripetere il nome della feature e della categoria. Per esempio:
  - `login/api/login-api.ts` il nome del file ripete nuovamnte "login" (la feature) e "api" (la categoria)
- se non si riesce a decidere un nome di un file specifico che non ripeta di nuovo il nome della feature / della categoria, allora significa che è meglio creare un singolo file con il nome della categoria.
- le categorie `components`, `ui` e `utils` sono quelle dove solitamente si vuole sempre poi specificare un nome / un concetto specifico. Tali categorie, quindi, devono essere sempre create direttamente come cartelle + vari file. Per esempio:
  - `components/form.tsx`
  - `ui/status.tsx`
  - `utils/token-storage.ts`

Vari esempi

| percorso                                  | scope   | corretto? | descrizione                                                            |
| ----------------------------------------- | ------- | --------- | ---------------------------------------------------------------------- |
| `backend/lib/database.ts`                 | globale | sì        | l'applicazione ha un solo DB, quindi vi è un solo file                 |
| `backend/lib/database/micro-lms.ts`       | globale | sì        | l'applicazione ha un solo DB, il nome di tale DB è "micro-lms"         |
| *cartella con 2 file:*                    |         |           |                                                                        |
| - `backend/lib/database/db1.ts`           | globale | sì        | l'applicazione ha due db, questo file è per il datbase "db1"           |
| - `backend/lib/database/db2.ts`           | globale | sì        | l'applicazione ha due db, questo file è per il datbase "db2"           |
| `backend/lib/database/database.ts`        | globale | **NO**    | ripeto due volte "database"                                            |
| `backend/lib/database/db.ts`              | globale | **NO**    | la parola "db" è generica, non indica un concetto e/o nome specifico   |
| `backend/features/login/api.ts`           | feature | sì        | implementa le chiamate api per la feature "login"                      |
| *cartella con 2 file:*                    |         |           |                                                                        |
| - `backend/features/login/api/auth.ts`    | feature | sì        | implementa le chiamate api di "login" specifiche per l'accesso         |
| - `backend/features/login/api/status.ts`  | feature | sì        | implementa le chiamate api di "login" specifiche per lo stato di login |
| `backend/features/login/api/api.ts`       | feature | **NO**    | ripeto due volte "api"                                                 |
| `backend/features/login/api/login-api.ts` | feature | **NO**    | ripeto due volte sia "login", sia "api"                                |
| `backend/features/login/api/call.ts`      | feature | **NO**    | la parola "call" è genrica, non indica un concetto e/o nome specifico  |

## Considerazioni sulla categoria "utils"

- le `utils` dovrebbero sempre essere prima create all'interno del contesto `shared`, prevendendo quindi che le funzioni definite possano essere eseguite in egual modo sia lato frontend, sia lato backend
- qualora una funzione sia legata ad una funzione/oggetto disponibile solo da un lato specifico, allora in tale caso la definizione deve essere spostata all'interno di `frontend` oppure `backend`. Per esempio:

Vari esempi

| util                                             | scope    | descrizione                                                                                                    |
| ------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------- |
| `shared/features/login/utils/jwt.ts`             | shared   | funzioni per generare / leggere i token JWT. Funziona uguale sia lato frontend che backend                     |
| `backend/features/login/utils/session.ts`        | backend  | funzioni per gestire la sessione lato server, richiedono l'utilizzo del DB (presente solo lato backend)        |
| `frontent/features/login/utils/token-storage.ts` | frontend | funzioni salvare il token nel browser, richiedono l'utilizzo del "local sotrage" (presente solo lato frontend) |

## NON utilizzo dei file barrell (index.ts)

- dentro le cartelle di una feature NON si utilizza il file di barrell (index.ts). I motivi sono:
  - impedisce di ottimizzare il bundle perchè webpack / altre utility finiscono per includere e processare tutto ciò che viene esportato dal file (anche quando in realtà non viene poi effettivamente usato).
  - Per risolvere il punto di cui sopra, bisognrebbe usare un index.ts non a livello di modulo ma almeno a livello di ciascuna parte (p.e. `login/api/index.ts`, `login/utils/index.ts`). A quel punto però diventano veramente tanti file da mantenere
  - se da dentro il modulo si include il file di barrell, si verifica una "dependency cycle". Il sintomo più evidente della presenza di una dependency cicle è quando un codice fallisce solo a livello di runtime indicando che uno degli oggetti inclusi con "import ..." è `undefined`.
  - Il punto sopra non è aiutato dal fatto che VSCode tenda in automatico ad completare gli import usando sempre il barrell file, anche quando si sta lavorando dentro il modulo.
- nonostante non si usi il barrell file, usando la struttura della cartella + file per specializzazioni, si ottengono comunnque delle import molto leggibili.
esempio:
```
import { ... } from "@/backend/feature/login/api"
import { ... } from "@/shared/feature/login/utils/jwt"
import { ... } from "@/shared/feature/login/schema"
```

# Prisma e zod

https://github.com/microsoft/TypeScript/wiki/Coding-guidelines

ha senso generare degli schemi da primsa => zod?
Dove li userei?

mi farebbe risparmiare tempo da qualche parte?

Learner è la tabella in DB
ma in realtà nel codice vorrei far circolare meno informazioni
come faccio

LearnerBaseData?
LearnerFullData?
LearnerInfo?
LearnerShallow?
LearnerBasic?
LearnerMinimal

opppure
Learner <= dati di un learner necessari per lo 80% delle azioni
LearnerFull <= dati completi di un learner, necessario per specifiche azioni
LearnerPreview <= dati basilari necessari a mostrare un preview del learner.

lato frontend potrei usare il type "Learner" creato da Primsa => ma sarebbe una ANOMALIA
in fatti, il frontend non dovrebbe conoscere le classi del database backedn
c'è quindi sempre la necessità di avere un intermediario shared che definisca i dati con cui
backend e frontend si scambiano
mi creerà problemi lato backend il fatto che ci sia "Learner" (tipo delle share) e 
"Learner" (tipo del DB di Primsa)?
Non ha senso avere un file "types": molto meglio usare sempre zod e esportare sia 
{tipo}Schema, sia Tipo. p.e.

learnerSchema = ...
type Learner

// nel codie

const learner = learnerSchema.parse()

const learner: LearnerData
VS.
const learner: Learner
VS.
const learner: LearnerPreview
VS.
const learner: LearnerInfo
VS.
const learner: LearnerSummary
VS.
const learner: LearnerPublicData ()


const learnerFullData: LearnerFullData
VS.
const learnerAdminData: LearnerAdminData
VS.
const learnerManageData: learnerManageData
VS.
const learnerModel: LearnerModel

https://stackoverflow.com/questions/70155912/restful-api-best-practice-for-admin-and-user-scope

di fatto è una questione tra diversi "scope" (admin vs user, dove user è "visibile a tutti").

le api che sto creando adesso non sono "learner" per tutti, sono "learnerAdmin" (solo per gli amministratori)

const learnerAdminData: LearnerAdminData
const learner: LearnerPublicData
const learner: Learner

const learnerPriceAdmindata: LearnerPriceAdminData
const learnerPrice: LearnerPricePublicData
const learnerPrice: LearnerPrice

ci vedo bene una regola:
se è presente il nome di una "resource" (come è chiamata nelle API REST), allora è
sottintesi che si tratta di "dati pubblici", con quindi implicito il suffisso "PublicData"
p.e. "type Learner" equivale a "type LearnerPublicData".

Di fatto, per ogni risorsa è sempre implicito che esista una risorsa con contesto pubblico
e una risorsa con contesto "admin". Alune risorse, potrebbero avere anche ulteriori contesti.

const learner: LearnerFollowerData
const learner: LearnerPriceFollowerData

---


alternativa?
const learner: LearnerDataForAdmin
const learner: LearnerDataForPublic
const learner: LearnerData

const learnerPriceDataForAdmin: LearnerPriceDataForAdmin
const learnerPrice: LearnerPriceDataForPublic
const learnerPrice: LearnerPrice

---

no, direi che non suona bene

p.e. "LearnerPriceAdminData" funziona bene perchè scoroportato diventa:
"LearnerPrice" + "AdminData"
"gli [AdminData] di [LearnerPrice]"
"i dati da amministratore dei prezzi dei learner"

# props e ref per React

https://stackoverflow.com/questions/55892409/how-to-extend-html-attributes-in-react-with-typescript

https://dmitripavlutin.com/react-forwardref/

https://echobind.com/post/conditionally-render-fields-using-react-hook-form

