# CLAUDE.md — Progetto demo-factory

## Cosa fa questo progetto
Genera demo HTML personalizzate di siti web per attività locali (ristoranti,
pizzerie, B&B) della Val Seriana, da mostrare durante le visite commerciali.
Lorenzo Zenucchi crea siti web e gestisce la presenza digitale per queste
attività.

## Struttura della cartella
- `templates/` — i 5 template master (osteria.html, pizzeria.html, elegante.html,
  loft.html, candela.html). NON SI TOCCANO MAI: sono gli stampi da cui nasce ogni
  demo. Possono restare pubblici su GitHub senza problemi.
- `demos/` — le demo generate, una cartella per locale
  (es. `demos/chalet-cene/index.html`). Queste vanno pubblicate online.
- `riferimenti/` — materiali reali dei locali (foto, screenshot, link) usati
  per personalizzare le demo, organizzati per locale: `riferimenti/<slug-locale>/`.
  Lorenzo li ripulisce periodicamente a mano.
- `.claude/agents/demo-builder.md` — l'agente che genera le demo. Va invocato
  esplicitamente per nome ("usa l'agente demo-builder..."): non si attiva
  sempre da solo.

## ATTENZIONE — Privacy (regola non negoziabile)
Il repository GitHub `demos` è PUBBLICO (serve per ospitare le demo online
gratis). `riferimenti/` contiene foto e dati di attività non ancora clienti:
NON DEVE MAI finire nel repository pubblico. È protetto da `.gitignore`
(vedi sotto) — non rimuovere mai quella riga. Prima di ogni `git push`,
controllare con `git status` che `riferimenti/` non compaia tra i file da
inviare.

## Come si lavora qui
1. Lorenzo fornisce i dati dei prospect da visitare (nome, tipo, comune,
   rating, recensioni — presi dal CRM) ed eventuali materiali in `riferimenti/`
2. Si invoca ESPLICITAMENTE l'agente demo-builder per generare le demo
3. Lorenzo controlla ogni demo nel browser
4. Lorenzo fa commit e push a mano, nella sessione normale (l'agente non tocca
   mai git, e non lavora mai su riferimenti/ verso l'esterno)

## Note tecniche
- Ogni demo è un singolo file HTML autonomo (CSS/JS inline), nessuna dipendenza
  esterna oltre ai font Google
- Le demo in `demos/` vengono pubblicate online tramite GitHub Pages dal
  repository `demos`, per generare i QR code da mettere sul foglio offerta
- Il repository è pubblico: mai committare dati sensibili (contratti, prezzi
  concordati con singoli clienti, dati personali) al di fuori delle demo stesse
# test
