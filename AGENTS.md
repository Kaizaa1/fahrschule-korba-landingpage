# Projektregeln: Fahrschule Korba

## Verbindlicher Design-Workflow

- Vor jeder Änderung an Layout, Komponenten, Interaktionen oder Animationen den Skill `emil-design-eng` laden und anwenden.
- UI-Reviews im Emil-Format mit einer Tabelle `Before | After | Why` dokumentieren.
- Die drei Quelldateien bleiben die inhaltliche Grundlage:
  - `Struktur.md`
  - `.hermes/research/ai-slop-fahrschule-landingpage.md`
  - `TECHNOLOGIE-EMPFEHLUNGEN.md`
- Späteres direktes Nutzerfeedback überschreibt widersprechende ältere Vorgaben.

## Bestätigte Nutzerentscheidungen

- Geschwindigkeit und Auftreten beider Auto-Animationen sind freigegeben und dürfen ohne neue ausdrückliche Anweisung nicht verändert werden.
  - Hero-Auto: `duration: 2`, `ease: [0.3, 0, 0.2, 1]`
  - Team-Auto: `duration: 1.05`, `ease: [0.16, 1, 0.3, 1]`
- Der App-Bereich mit dem einmaligen Preis von 49 € steht direkt unter dem allgemeinen Preisbereich.
- Der Ablauf von Beratung bis Prüfung muss vollständig ohne horizontalen Schieber sichtbar sein.
- Die Ablaufroute nutzt eine kleine Rakete mit einer erklärenden Morph-/Pfadanimation.
- Der Team-Bereich bleibt kompakt, fein und ebenmäßig. Alle drei Profile haben dieselbe visuelle Höhe.

## Qualitätsregeln

- Desktop und Mobile separat visuell prüfen.
- `prefers-reduced-motion` respektieren.
- Keine Fake-Zahlen, Fake-Bewertungen oder generische SaaS-Optik.
- Keine Animation ohne erklärende, räumliche oder rückmeldende Funktion.
- Vor Abschluss ausführen: Vitest, ESLint, TypeScript, Production-Build, Playwright und Browser-Konsole.
