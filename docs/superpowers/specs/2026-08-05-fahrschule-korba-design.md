# Fahrschule Korba Website Design

## Status

Freigegeben durch die vorhandenen Projektdokumente und die Nutzerentscheidung für den empfohlenen Stack.

## Ziel

Eine hochwertige, ruhige Fahrschul-Landingpage für die fiktive Fahrschule Korba in Krefeld. Sie richtet sich an Fahrschüler und Eltern, erklärt Angebot, Ablauf, App, Team und Preise transparent und führt zu einer klar als Demo erkennbaren Terminanfrage.

## Design Read

High-End lokale Service-Landingpage mit ruhiger Automotive-Sprache statt Template- oder SaaS-Ästhetik.

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 5`
- `VISUAL_DENSITY: 4`
- Farbwelt: kühles Off-White, Graphit und ein Signalgelb-Akzent
- Typografie: moderne Sans, klare Hierarchie, keine zufällige Serif-Mischung
- Radius-System: Flächen 20 px, Controls 10 px, CTAs pillenförmig

## Seiten und Navigation

- `/`: Hero, Vorteile, Klassen, Ablauf, App, Team, Preise, Buchungsanfrage, Footer
- `/faq`: eigenständige FAQ-Seite mit zugänglichem Accordion
- Desktop-Navigation einzeilig, mobile Navigation als kompaktes Menü
- Einheitlicher primärer CTA: `Termin buchen`

## Hero und Bewegungslogik

Das Hero nutzt eine asymmetrische Bühne. Ein austauschbares Auto-Asset fährt beim Laden von links nach rechts und verlässt den sichtbaren Bereich. Währenddessen bleibt die Wortmarke links stehen und Claim, Kurztext und CTAs werden eingeblendet. Die Desktop-Sequenz dauert ungefähr 2 Sekunden.

Im Team-Intro kommt dasselbe Auto von rechts zurück und bleibt sichtbar. Daneben erscheint ein ruhiger Dialog-Chip. Alle Bewegungen animieren nur Transform und Opacity und respektieren `prefers-reduced-motion`. Mobil wird die Strecke verkürzt und der CTA ist sofort sichtbar.

## Inhaltsarchitektur

- Vorteile ohne drei identische Karten, stattdessen typografische Liste mit Route-Motiv
- Führerscheinklassen als asymmetrische Leiste mit großen Kürzeln
- Ablauf als Straßenlinie mit sechs benannten Stationen, ohne generische Schrittnummern
- App als eigener Mehrwert vor Preisen
- Team mit drei ehrlich als Beispielbilder bezeichneten Platzhalterporträts
- Preise gruppiert in Startkosten, Fahrstunden, Prüfungen und Extras
- Formular mit Führerscheinklasse, bevorzugter Lehrkraft, Kontaktweg, Wunschtermin, Kontaktdaten und Nachricht
- Formular speichert oder versendet nichts. Erfolgstext erklärt klar den Demo-Status

## Bildstrategie

Alle Bildpfade liegen zentral in `frontend/src/content/site.ts`. Austauschbare lokale Platzhalter liegen unter `frontend/public/images/` und behalten feste Seitenverhältnisse, damit ein Bildtausch keinen Layout-Shift erzeugt. Alt-Texte nennen die Motive ehrlich als Beispielbilder.

Benötigte Austauschpunkte:

- Hero-/Team-Auto: `public/images/car-placeholder.svg`
- App-Darstellung: `public/images/app-placeholder.svg`
- Drei Team-Porträts: `public/images/team-*.svg`

## Technische Architektur

- Next.js App Router und TypeScript in `frontend/`
- Tailwind CSS für Layout und Tokens, globale Spezialanimationen in `globals.css`
- Motion in kleinen Client-Komponenten für Auto-Sequenzen und Reveals
- Radix Accordion auf `/faq`
- React Hook Form und Zod für die Demo-Terminanfrage
- Phosphor Icons als einzige Icon-Familie
- Inhalte und Preise in typisierten Datenmodulen

## Qualität

- Vitest und Testing Library für Content, Formular und FAQ-Komponenten
- Playwright für Route, Navigation, mobile Darstellung und Formularfluss
- Build, Lint und Typecheck müssen fehlerfrei laufen
- Browserprüfung auf Desktop und Mobil inklusive Konsole
- Keine Fake-Bewertungen, Fake-Erfolgszahlen, generischen Testimonials oder versteckten Kosten
