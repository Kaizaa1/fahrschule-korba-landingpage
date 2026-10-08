# Fahrschule Korba Landingpage

High-End-Prototyp für eine fiktive Fahrschule in Krefeld. Die Seite erklärt Klassen, Ablauf, App, Team und Beispielpreise und enthält eine klar als Demo gekennzeichnete Terminanfrage.

## Tech-Stack

- Next.js App Router und TypeScript
- Tailwind CSS plus projektspezifische Design-Tokens
- Motion für Auto- und Reveal-Animationen
- Radix UI für das FAQ-Accordion
- React Hook Form und Zod für die Formulardemo
- Phosphor Icons
- Vitest, Testing Library und Playwright

## Struktur

```text
frontend/
  public/images/          austauschbare Platzhalterbilder
  src/app/                Startseite, FAQ-Route, globale Styles
  src/components/         Header, Formular und Inhaltssektionen
  src/content/site.ts     Texte, Preise, Team und zentrale Bildpfade
  src/lib/                Formularschema
  e2e/                    Browser-Tests
```

## Lokal starten

```bash
cd frontend
npm install
npm run dev
```

Danach: `http://localhost:3000`

Vom Projektroot aus geht auch:

```bash
npm run dev
```

## Prüfungen

```bash
cd frontend
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Beim ersten Playwright-Einsatz kann ein Browser-Download nötig sein:

```bash
npx playwright install chromium
```

## Bildassets

Alle Bildpfade sind zentral in `frontend/src/content/site.ts` unter `imageAssets` eingetragen.

| Motiv | Aktuelle Datei | Format |
|---|---|---|
| FK-Signet | `public/images/korba-logo-mark.png` | transparenter PNG-Cutout, Header/Favicon |
| Vollständiges Logo | `public/images/korba-logo-full.png` | transparenter PNG-Cutout, Footer |
| Hero-Fahrschulauto | `public/images/korba-touareg-hero.png` | weißer VW Touareg, transparent, nach rechts |
| Team-Fahrschulauto | `public/images/korba-touareg-team.png` | weißer VW Touareg, transparent, nach links |
| App-Vorschau | `public/images/korba-app.webp` | WebP, 5:4, blaue UI-Akzente |
| Mara | `public/images/team-mara.webp` | WebP, 16:10 |
| Leonie | `public/images/team-leonie.webp` | WebP, 16:10 |
| Samir | `public/images/team-samir.webp` | WebP, 16:10 |

Das Logo und die beiden folierten Touareg-Ansichten stammen aus den freigegebenen Nutzerassets. Die reproduzierbare Aufbereitung liegt in `frontend/scripts/prepare-brand-assets.py`. Die Produktionsprompts und Auswahlkriterien der übrigen Bilder stehen unter `docs/design/openai-bildprompts.md`. Die dargestellten Personen sind vollständig fiktiv und wurden mit dem OpenAI-Bildmodell erzeugt.

## Wichtige Demo-Hinweise

- Namen, Kontaktinformationen und Preise sind fiktive Beispieldaten.
- Das Formular speichert und versendet keine Daten.
- Datenschutz und Impressum sind als Demo-Routen vorhanden und müssen vor Veröffentlichung fachlich geprüft werden.
- Vor einer Veröffentlichung müssen Kontaktinformationen, Preise, Mitarbeiterbilder und Rechtstexte durch freigegebene Kundendaten ersetzt werden.
