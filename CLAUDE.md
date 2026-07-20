# CLAUDE.md — Progetto demo-factory

## Cosa fa questo progetto
Genera demo HTML personalizzate di siti web per attività locali (ristoranti,
pizzerie, B&B, centri estetici) della Val Seriana, da mostrare durante le
visite commerciali. Lorenzo Zenucchi crea siti web e gestisce la presenza
digitale per queste attività.

## Struttura della cartella
- `templates/` — i template master ufficiali (osteria.html, pizzeria.html,
  elegante.html, loft.html, candela.html, più eventuali nuovi template
  promossi da templates-candidati/). NON SI TOCCANO MAI: sono gli stampi da
  cui nasce ogni demo. Possono restare pubblici su GitHub senza problemi.
- `templates-candidati/` — varianti di template generate da template-builder,
  in attesa di revisione. Lorenzo le valuta e promuove a mano quelle che
  vuole tenere, spostandole (con nome definitivo) dentro templates/. Quelle
  scartate possono restare qui o essere rimosse, a discrezione di Lorenzo.
- `riferimenti-template/` — immagini di riferimento esterne (screenshot di
  siti che ispirano un nuovo template) usate da template-builder. NON sono
  materiali di un cliente o prospect: sono siti di terzi usati solo come
  ispirazione di stile. Protette da `.gitignore` per motivi di copyright
  (non è materiale di Lorenzo, non va pubblicato) — vedi sezione ATTENZIONE
  sotto.
- `demos/` — le demo generate, una cartella per locale
  (es. `demos/chalet-cene/index.html`). Queste vanno pubblicate online.
- `riferimenti/` — materiali reali dei locali (foto, screenshot, link) usati
  per personalizzare le demo, organizzati per locale: `riferimenti/<slug-locale>/`.
  Lorenzo li ripulisce periodicamente a mano.
- `.claude/agents/demo-builder.md` — l'agente che genera le demo partendo dai
  dati di un prospect e da un template esistente in templates/. Va invocato
  esplicitamente per nome ("usa l'agente demo-builder..."): non si attiva
  sempre da solo.
- `.claude/agents/template-builder.md` — l'agente che crea NUOVI template
  partendo da un riferimento visivo esterno (URL, immagine in
  riferimenti-template/, o descrizione a parole). Genera sempre 3 varianti
  in templates-candidati/, non tocca mai templates/ direttamente. Va
  invocato esplicitamente per nome, come demo-builder.

## ATTENZIONE — Privacy e copyright (regola non negoziabile)
Il repository GitHub `demos` è PUBBLICO (serve per ospitare le demo online
gratis). Due cartelle NON DEVONO MAI finire nel repository pubblico, per
motivi diversi:
- `riferimenti/` — contiene foto e dati di attività non ancora clienti
  (motivo: privacy)
- `riferimenti-template/` — contiene screenshot di siti di terzi usati come
  ispirazione stilistica, non materiale di Lorenzo (motivo: copyright)

Entrambe sono protette da `.gitignore` (vedi sotto) — non rimuovere mai
quelle righe. Prima di ogni `git push`, controllare con `git status` che
né `riferimenti/` né `riferimenti-template/` compaiano tra i file da
inviare.

## Come si lavora qui
1. Lorenzo fornisce i dati dei prospect da visitare (nome, tipo, comune,
   rating, recensioni — presi dal CRM) ed eventuali materiali in `riferimenti/`
2. Si invoca ESPLICITAMENTE l'agente demo-builder per generare le demo
3. Lorenzo controlla ogni demo nel browser
4. Lorenzo fa commit e push a mano, nella sessione normale (l'agente non tocca
   mai git, e non lavora mai su riferimenti/ verso l'esterno)

Per creare un nuovo template: Lorenzo fornisce un riferimento visivo (link,
immagine salvata in riferimenti-template/, o descrizione a parole) e invoca
ESPLICITAMENTE l'agente template-builder. Le 3 varianti prodotte vanno
riviste da Lorenzo in browser prima di essere promosse a mano in templates/.

## Note tecniche
- Ogni demo è un singolo file HTML autonomo (CSS/JS inline), nessuna dipendenza
  esterna oltre ai font Google
- Le demo in `demos/` vengono pubblicate online tramite GitHub Pages dal
  repository `demos`, per generare i QR code da mettere sul foglio offerta
- Il repository è pubblico: mai committare dati sensibili (contratti, prezzi
  concordati con singoli clienti, dati personali) al di fuori delle demo stesse
