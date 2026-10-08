# Fahrschule Korba – Logo-Rebranding

**Datum:** 2026-08-06  
**Status:** Vom Nutzer freigegeben

## Ziel

Die bestehende Landingpage übernimmt das neue FK-Logo und dessen Blau-Grün-Farbwelt. Die ruhige, persönliche Gestaltung bleibt erhalten; die Seite darf nicht wie eine generische SaaS- oder Automotive-Werbung wirken.

## Logo

Das gelieferte quadratische Rasterlogo ist 1254 × 1254 px groß, vollständig opak und besitzt einen weißen Hintergrund sowie großzügigen Außenrand.

Daraus werden nicht destruktiv zwei transparente, eng zugeschnittene Assets erzeugt:

- `frontend/public/images/korba-logo-full.png`: vollständiges Signet mit Wortmarke für Footer und Metadaten.
- `frontend/public/images/korba-logo-mark.png`: reines FK-Signet für Header und Favicon.

Der Header zeigt das Signet neben dem zugänglichen Text „Fahrschule Korba“. Der helle Footer zeigt das vollständige Logo und die Standortinformationen.

## Farbrollen

| Rolle | Farbe | Verwendung |
|---|---:|---|
| Markenblau | `#3C70FB` | Logo, grafische Markenflächen |
| UI-Blau | `#2F5FE8` | Haupt-CTAs und interaktive Flächen; Weißkontrast 5,35:1 |
| Hellblau | `#EAF0FF` | ruhige Hintergrundflächen und Karten |
| Markengrün | `#46C46F` | Route, Checks und positive Hinweise; mit Graphit 6,8:1 |
| Hellgrün | `#EAF8EE` | unterstützende Flächen |
| Graphit | `#22262B` | Text und dunkle Flächen |
| Off-White | `#F7F8F5` | Seitenhintergrund |
| Oberfläche | `#FFFDF9` | Karten und Formulare |

Blau führt die visuelle Hierarchie; Grün unterstützt. Die gelben Fahrschul-Dachschilder entfallen mit den neuen Nutzerassets. Gelb wird nicht mehr als UI-Akzent eingesetzt.

## Autoassets

Die vier übermittelten Dateien enthalten zwei eindeutige transparente Motive, jeweils doppelt:

- rechtsfahrender weißer VW Touareg, Hash-Präfix `6401bf27e415`: Hero.
- linksfahrender weißer VW Touareg, Hash-Präfix `0a4d228cf61a`: Team.

Beide sind 1774 × 887 px groß und tragen das FK-Signet, Blau-Grün-Folierung und den lesbaren Schriftzug „FAHRSCHULE KORBA“. Die vorhandenen Animationen bleiben exakt unverändert:

- Hero: `duration: 2`, `ease: [0.3, 0, 0.2, 1]`.
- Team: `duration: 1.05`, `ease: [0.16, 1, 0.3, 1]`.

## Komponentenänderungen

- Header: Ersatz des künstlichen K-Kästchens durch das FK-Signet.
- Hero: Ersatz der alten dekorativen KORBA/B-Wortmarke durch eine dezente, nicht-interaktive Signetfläche.
- Design-Tokens: Gelb durch markentreue Blau-/Grünrollen ersetzen.
- Buttons und Fokus: UI-Blau für primäre Aktionen; sichtbare Fokuszustände mit Markenblau.
- Ablaufroute und positive Zustände: Grün als funktionaler Sekundärakzent.
- Footer: helle Markenfläche und vollständiges Logo.
- Appvisual: vorhandenes Bild auf Blau/Grün angleichen oder durch eine markenkonforme Variante ersetzen, ohne Textfehler.
- Metadaten/Favicon: FK-Signet verwenden.
- Autoassets: beide neuen Nutzerbilder optimiert und unter stabilen Projektpfaden ablegen.

## Nicht-Ziele

- Keine Änderung an Textinhalten, Abschnittsreihenfolge oder Formularlogik.
- Keine Änderung an Dauer, Easing oder Bewegungscharakter der Autoanimationen.
- Keine neuen dekorativen Animationen.
- Keine Neugenerierung der Teamfotos.

## Qualität

Nach Umsetzung werden Vitest, ESLint, TypeScript, Production-Build, Playwright, Browserkonsole, Lighthouse sowie Desktop- und Mobile-Screenshots ausgeführt. Logo, Autoassets, Kontrast, Beschnitt und horizontales Overflow werden visuell geprüft.
