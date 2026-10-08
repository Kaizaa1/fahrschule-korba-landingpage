# Team-Fokusrotation – Design-Spezifikation

**Status:** Vom Nutzer freigegeben  
**Datum:** 2026-08-06

## Ziel

Die drei Mitarbeiterkarten im Teamabschnitt bewegen sich zyklisch zwischen linker, mittlerer und rechter Position. Alle zwei Sekunden steht eine andere Person in der mittleren Fokusposition. Die Bewegung wirkt leicht schwebend und räumlich, ohne die ruhige, kompakte Gestaltung der Seite zu verlassen.

## Desktop-Verhalten

- Alle drei Mitarbeiter bleiben gleichzeitig sichtbar.
- Die Fokuskarte steht mittig, ist gerade ausgerichtet, leicht angehoben und minimal größer.
- Die linke und rechte Karte sind etwas kleiner, vertikal abgesenkt und um wenige Grad zur Mitte geneigt.
- Nach jeweils exakt 2.000 ms wechselt die nächste Person in den Fokus.
- Der Positionswechsel dauert ungefähr 700 ms und nutzt ein kräftiges Ease-in-out.
- Die Karten bewegen sich zyklisch; nach der dritten Person folgt wieder die erste.
- Kartenhöhe, Bildformat `16 / 10` und vorhandene Inhalte bleiben gleich.

## Mobile-Verhalten

- Die Fokuskarte steht vollständig in der Mitte.
- Die beiden anderen Karten bleiben links und rechts als schmale Vorschau sichtbar.
- Es entsteht kein horizontaler Dokument-Overflow; die Bühne selbst schneidet überstehende Karten kontrolliert ab.
- Karteninhalte bleiben in der Fokusposition vollständig lesbar.

## Bedienung

- Die Rotation pausiert, solange Mauszeiger oder Tastaturfokus innerhalb der Team-Bühne liegen.
- Drei beschriftete Auswahlpunkte erlauben die direkte Wahl einer Person.
- Eine manuelle Auswahl setzt diese Person sofort in den Fokus und startet anschließend einen neuen 2-Sekunden-Zyklus.
- Wenn der Browser-Tab nicht sichtbar ist, läuft der Timer nicht weiter.

## Barrierefreiheit

- Die aktive Karte erhält `aria-current="true"`.
- Bedienelemente besitzen eindeutige zugängliche Namen.
- Bei `prefers-reduced-motion: reduce` bleibt die bestehende statische, gleichmäßige Kartenansicht erhalten; automatische Rotation und räumliche Bewegung sind deaktiviert.
- Keine Karte wird aus dem DOM entfernt, sodass alle Inhalte weiterhin zugänglich bleiben.

## Animationstechnik

- Kartenpositionen werden aus einem stabilen aktiven Index abgeleitet.
- Animiert werden ausschließlich vollständige `translate3d(...) rotate(...) scale(...)`-Transforms und Opacity.
- Die Übergangskurve wird als `cubic-bezier(0.77, 0, 0.175, 1)` umgesetzt.
- Die Team-Autoanimation bleibt exakt bei `1.05 s` und `[0.16, 1, 0.3, 1]`.
- Die Hero-Autoanimation bleibt exakt bei `2 s` und `[0.3, 0, 0.2, 1]`.

## Komponentenstruktur

- Die bestehende `Team`-Komponente verwaltet aktiven Index, automatische Rotation, Interaktionspause und Sichtbarkeit des Dokuments.
- Eine kleine pure Hilfsfunktion berechnet aus Kartenindex und aktivem Index den Slot `left`, `focus` oder `right`.
- Jede Mitarbeiterkarte bleibt ein semantisches `<article>`.
- Der Auto-Introbereich oberhalb der Karten wird nicht verändert.

## Tests

- Unit-Test: Slotberechnung rotiert alle drei Personen zyklisch korrekt.
- Komponententest mit Fake Timers: Fokus wechselt nach 2.000 ms zur nächsten Person.
- Komponententest: Interaktion pausiert den Wechsel und manuelle Auswahl setzt den Fokus.
- Komponententest: Reduced Motion deaktiviert die Rotation.
- Playwright: Desktop zeigt drei Karten mit genau einer Fokuskarte.
- Playwright: Mobile erzeugt keinen horizontalen Dokument-Overflow.
- Visueller Audit: Ausgangszustand, Wechselphase und nächster Fokus auf Desktop und Mobile.
- Vor Abschluss: Vitest, ESLint, TypeScript, Production-Build, Playwright und Browserkonsole.

## Nicht im Umfang

- Änderungen an Namen, Bildern oder Texten der Mitarbeiter.
- Änderungen an Hero- oder Team-Autoanimationen.
- Drag- oder Swipe-Gesten.
- Endloses freies 3D-Orbiting oder starke perspektivische Effekte.
