# Team-Fokusrotation Implementation Plan

> **Nutzeränderung vom 2026-08-06:** Der Fokuswechsel erfolgt nach `2.000 ms` statt `4.000 ms`. Pause-/Weiter-Button und sichtbare Fokusbeschriftung wurden entfernt. Die drei direkten Auswahlpunkte sowie automatische Pause bei Hover, Tastaturfokus, unsichtbarem Tab und Reduced Motion bleiben erhalten. Diese spätere Entscheidung überschreibt widersprechende historische Schritte in diesem ausgeführten Plan.

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die drei Mitarbeiterkarten wechseln alle 2 Sekunden zyklisch ihre Position; die mittlere Karte ist im Fokus und Seitenkarten schweben dezent geneigt daneben.

**Architecture:** Eine kleine pure Hilfsdatei berechnet Slot und nächsten Index. Die bestehende Client-Komponente `Team` verwaltet Timer, Pausen und direkte Auswahl. Motion animiert ausschließlich vollständige Transform-Strings und Opacity; CSS definiert die feste Desktop-/Mobile-Bühne und den statischen Reduced-Motion-Fallback.

**Tech Stack:** React 19, TypeScript, Motion for React, Phosphor Icons, Vitest/Testing Library, Playwright, CSS.

## Global Constraints

- Fokuswechsel exakt alle `2.000 ms`.
- Positionsübergang ungefähr `700 ms` mit `cubic-bezier(0.77, 0, 0.175, 1)`.
- Nur vollständige `translate3d(...) rotate(...) scale(...)`-Transforms und Opacity animieren.
- `prefers-reduced-motion: reduce` deaktiviert Rotation und räumliche Bewegung.
- Kartenbilder bleiben `16 / 10`, alle Karten bleiben gleich hoch.
- Hero-Auto bleibt exakt `2 s` mit `[0.3, 0, 0.2, 1]`.
- Team-Auto bleibt exakt `1.05 s` mit `[0.16, 1, 0.3, 1]`.
- Kein horizontaler Dokument-Overflow.
- Keine neuen Abhängigkeiten und keine Git-Commits.

---

### Task 1: Reines Rotationsmodell

**Files:**
- Create: `frontend/src/components/home/team-rotation.ts`
- Create: `frontend/src/components/home/team-rotation.test.ts`

**Interfaces:**
- Produces: `TEAM_ROTATION_MS: 4000`
- Produces: `TeamSlot = "left" | "focus" | "right"`
- Produces: `getTeamSlot(index: number, activeIndex: number, count: number): TeamSlot`
- Produces: `getNextTeamIndex(activeIndex: number, count: number): number`

- [ ] **Step 1: Failing slot tests schreiben**

```ts
import { describe, expect, it } from "vitest";
import { getNextTeamIndex, getTeamSlot, TEAM_ROTATION_MS } from "./team-rotation";

describe("team rotation", () => {
  it("maps the active person to focus and its neighbors to the side slots", () => {
    expect([0, 1, 2].map((index) => getTeamSlot(index, 0, 3))).toEqual(["focus", "right", "left"]);
    expect([0, 1, 2].map((index) => getTeamSlot(index, 1, 3))).toEqual(["left", "focus", "right"]);
  });

  it("cycles after exactly four seconds", () => {
    expect(TEAM_ROTATION_MS).toBe(4000);
    expect(getNextTeamIndex(0, 3)).toBe(1);
    expect(getNextTeamIndex(2, 3)).toBe(0);
  });
});
```

- [ ] **Step 2: RED prüfen**

Run: `npm test -- src/components/home/team-rotation.test.ts --run --reporter=dot`  
Expected: FAIL, weil `team-rotation.ts` noch fehlt.

- [ ] **Step 3: Minimale pure Implementierung schreiben**

```ts
export const TEAM_ROTATION_MS = 4000;
export type TeamSlot = "left" | "focus" | "right";

export function getTeamSlot(index: number, activeIndex: number, count: number): TeamSlot {
  const offset = (index - activeIndex + count) % count;
  if (offset === 0) return "focus";
  return offset === 1 ? "right" : "left";
}

export function getNextTeamIndex(activeIndex: number, count: number) {
  return (activeIndex + 1) % count;
}
```

- [ ] **Step 4: GREEN prüfen**

Run: `npm test -- src/components/home/team-rotation.test.ts --run --reporter=dot`  
Expected: 2 Tests bestanden.

---

### Task 2: Timer, Pause und direkte Auswahl

**Files:**
- Create: `frontend/src/components/home/team.test.tsx`
- Modify: `frontend/src/components/home/team.tsx`

**Interfaces:**
- Consumes: `TEAM_ROTATION_MS`, `getTeamSlot`, `getNextTeamIndex` aus Task 1.
- Produces: `.team-carousel[data-reduced-motion]`, `.team-card[data-slot]`, `aria-current`, Pause-/Auswahlbuttons.

- [ ] **Step 1: Failing Komponententests schreiben**

```tsx
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MotionProvider } from "@/components/motion-provider";
import { Team } from "./team";

function renderTeam() {
  return render(<MotionProvider><Team /></MotionProvider>);
}

describe("Team focus rotation", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("focuses the next employee after four seconds", () => {
    renderTeam();
    expect(screen.getByRole("article", { name: /Mara Özdemir/ })).toHaveAttribute("aria-current", "true");
    act(() => vi.advanceTimersByTime(4000));
    expect(screen.getByRole("article", { name: /Leonie Krüger/ })).toHaveAttribute("aria-current", "true");
  });

  it("pauses and allows direct employee selection", () => {
    renderTeam();
    fireEvent.click(screen.getByRole("button", { name: "Rotation pausieren" }));
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("article", { name: /Mara Özdemir/ })).toHaveAttribute("aria-current", "true");
    fireEvent.click(screen.getByRole("button", { name: "Samir Haddad fokussieren" }));
    expect(screen.getByRole("article", { name: /Samir Haddad/ })).toHaveAttribute("aria-current", "true");
  });
});
```

- [ ] **Step 2: RED prüfen**

Run: `npm test -- src/components/home/team.test.tsx --run --reporter=dot`  
Expected: FAIL, weil Teamkarten noch kein `aria-current` und keine Rotationssteuerung haben.

- [ ] **Step 3: Zustand und Timer implementieren**

In `Team` ergänzen:

```ts
const [activeIndex, setActiveIndex] = useState(0);
const [manualPaused, setManualPaused] = useState(false);
const [interactionPaused, setInteractionPaused] = useState(false);
const [documentVisible, setDocumentVisible] = useState(true);
const shouldRotate = !reduceMotion && !manualPaused && !interactionPaused && documentVisible;
```

Ein `visibilitychange`-Effect hält `documentVisible` synchron. Ein zweiter Effect erstellt nur bei `shouldRotate` ein Interval mit `TEAM_ROTATION_MS`, verwendet `getNextTeamIndex` und räumt es vollständig auf. `activeIndex` gehört in die Abhängigkeiten, damit direkte Auswahl einen neuen Vier-Sekunden-Zyklus startet.

- [ ] **Step 4: Bühne und zugängliche Steuerung rendern**

- `team-grid` durch `team-carousel` ersetzen.
- Jedes `<m.article>` erhält `aria-labelledby`, `aria-current`, `data-slot` und einen vollständigen Transform-String aus dem Slot.
- `initial={false}` verhindert einen unnötigen Eintrittssprung.
- Transition: `{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }`.
- Container pausiert über `onMouseEnter`, `onMouseLeave`, `onFocusCapture` und ein `onBlurCapture`, das Fokuswechsel innerhalb des Containers ignoriert.
- Pausebutton verwendet `Pause`/`Play` aus Phosphor.
- Drei Auswahlbuttons heißen exakt `<Name> fokussieren`.
- Sichtbarer Text zeigt `Im Fokus: <Name>` ohne aggressives `aria-live`.

- [ ] **Step 5: GREEN prüfen**

Run: `npm test -- src/components/home/team.test.tsx src/components/home/team-rotation.test.ts --run --reporter=dot`  
Expected: 4 Tests bestanden.

---

### Task 3: Responsive Bühne, Reduced Motion und Browser-QA

**Files:**
- Modify: `frontend/src/app/globals.css:895-991, 1468-1518, 1533-1595`
- Modify: `frontend/e2e/site.spec.ts:18-52, 54-79`
- Output: `frontend/test-results/visual/team-rotation-*.png`

**Interfaces:**
- Consumes: `data-slot`, `data-reduced-motion`, `.team-carousel`, `.team-card`, `.team-controls` aus Task 2.
- Produces: feste Desktop-/Mobile-Bühne ohne Dokument-Overflow.

- [ ] **Step 1: Failing Playwright-Erwartungen ergänzen**

Im bestehenden Teamtest:

```ts
const teamCarousel = page.locator(".team-carousel");
await teamCarousel.scrollIntoViewIfNeeded();
await expect(teamCarousel.locator('.team-card[aria-current="true"]')).toHaveCount(1);
await expect(teamCarousel.locator('.team-card[data-slot="left"]')).toHaveCount(1);
await expect(teamCarousel.locator('.team-card[data-slot="right"]')).toHaveCount(1);
await page.waitForTimeout(4200);
await expect(page.getByRole("article", { name: /Leonie Krüger/ })).toHaveAttribute("aria-current", "true");
expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
```

Im Reduced-Motion-Test nach Scroll zum Teamabschnitt 4.200 ms warten und prüfen, dass Mara aktiv bleibt.

- [ ] **Step 2: RED prüfen**

Run: `npm run test:e2e -- --grep "team|reduced motion"`  
Expected: FAIL, weil Bühne und Slotattribute noch nicht vollständig gestylt sind.

- [ ] **Step 3: Desktop-CSS implementieren**

- `.team-carousel`: `position: relative`, kontrolliertes `overflow: clip`, Höhe zwischen 420 und 470 px.
- `.team-card`: absolut, `left: 50%`, gleiche Breite und Höhe, `transform-origin: center`.
- Fokuskarte: höchster `z-index`, kräftigerer Schatten und primärblauer Randanteil.
- Seitenkarten: niedrigerer `z-index`; Opacity mindestens `0.82`.
- `.team-controls`: Fokusname, drei Auswahlpunkte und Pausebutton in einer kompakten Zeile.
- Keine Hover-Lifts oder klickbare Affordance auf der Karte selbst.

- [ ] **Step 4: Mobile- und Reduced-Motion-CSS implementieren**

- Unter 960 px Kartenbreite auf höchstens 78–84 vw begrenzen; Nachbarkarten bleiben als schmale Vorschau sichtbar.
- Unter 620 px Bühne etwa 400 px hoch; Fokuskarte bleibt vollständig lesbar.
- `data-reduced-motion="true"`: normales Drei-Spalten-Grid, statische Karten, keine Transformation; unter 960 px einspaltig wie bisher.
- Globale `prefers-reduced-motion`-Regel bleibt unverändert.

- [ ] **Step 5: E2E GREEN prüfen**

Run: `npm run test:e2e -- --grep "team|reduced motion"`  
Expected: alle gefilterten Tests bestanden.

- [ ] **Step 6: Vollständige Qualitätsprüfungen**

Run in order:

```bash
npm test -- --reporter=dot
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Expected: alle Befehle Exitcode 0; der bekannte Desktop-only-Mobile-Navigationstest bleibt projektbedingt übersprungen.

- [ ] **Step 7: Visuelle Animation prüfen**

Mit temporärem Production-Server Desktop `1440 × 1000` und Mobile `390 × 844` aufnehmen:

1. Mara im Ausgangsfokus.
2. Bewegungsframe bei ungefähr 4.350 ms.
3. Leonie im nächsten Fokus nach ungefähr 4.800 ms.
4. Reduced-Motion-Ansicht nach 4.800 ms.

Zusätzlich Browserkonsole, Page-Errors und horizontalen Overflow prüfen. Server anschließend beenden.
