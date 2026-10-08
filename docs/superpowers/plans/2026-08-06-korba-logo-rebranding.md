# Korba Logo Rebranding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Das freigegebene FK-Logo, seine Blau-Grün-Farbwelt und die zwei bereitgestellten weißen Touareg-Assets konsistent in die bestehende Landingpage integrieren.

**Architecture:** Markenassets werden nicht destruktiv aus den Nutzerdateien abgeleitet und unter stabilen Pfaden in `frontend/public/images` gespeichert. Zentrale CSS-Tokens steuern die Farbrollen; Header, Hero und Footer verwenden dieselben Logoassets über Next Image. Bestehende Struktur, Inhalte und Motion-Definitionen bleiben erhalten.

**Tech Stack:** Next.js App Router, TypeScript, Next Image, CSS Design Tokens, Motion for React, Pillow für reproduzierbare lokale Assetaufbereitung, Vitest, Playwright.

## Global Constraints

- Hero-Auto bleibt exakt `duration: 2`, `ease: [0.3, 0, 0.2, 1]`.
- Team-Auto bleibt exakt `duration: 1.05`, `ease: [0.16, 1, 0.3, 1]`.
- Blau führt, Grün unterstützt; kein Gelb als UI-Akzent.
- `prefers-reduced-motion` bleibt erhalten.
- Keine Änderung an Inhalt, Formularlogik oder Abschnittsreihenfolge.
- Keine Commits ohne ausdrückliche Nutzeranweisung.

---

### Task 1: Reproduzierbare Markenassets

**Files:**
- Create: `frontend/scripts/prepare-brand-assets.py`
- Create: `frontend/public/images/korba-logo-full.png`
- Create: `frontend/public/images/korba-logo-mark.png`
- Replace: `frontend/public/images/korba-touareg-hero.png`
- Replace: `frontend/public/images/korba-touareg-team.png`
- Test: `frontend/src/content/site.test.ts`

**Interfaces:**
- Produces: `/images/korba-logo-full.png`, `/images/korba-logo-mark.png`, `/images/korba-touareg-hero.png`, `/images/korba-touareg-team.png`.

- [ ] Test `imageAssets` auf Logo- und Autopfade erweitern und gezielt rot ausführen.
- [ ] Pillow-Skript erstellen: weißen Logohintergrund weich in Alpha überführen, Inhaltsgrenzen zuschneiden, Full-Logo und FK-Signet mit transparentem Rand exportieren.
- [ ] Rechtsfahrendes Auto als Hero und linksfahrendes Auto als Teamasset verlustfrei kopieren/optimieren.
- [ ] Pixelmaße, Alphaumfang und lesbare Dateien per Pillow verifizieren.
- [ ] Content-Test grün ausführen.

### Task 2: Logo in Header, Hero, Footer und Metadaten

**Files:**
- Modify: `frontend/src/content/site.ts`
- Modify: `frontend/src/components/site-header.tsx`
- Modify: `frontend/src/components/hero-scene.tsx`
- Modify: `frontend/src/components/site-footer.tsx`
- Modify: `frontend/src/app/layout.tsx`
- Modify: `frontend/src/app/page.test.tsx`

**Interfaces:**
- Consumes: `imageAssets.logoMark` und `imageAssets.logoFull`.

- [ ] Seitentest um sichtbare Markenstruktur und zugängliche Brandbezeichnung erweitern.
- [ ] Header-K-Kästchen durch Next Image mit FK-Signet ersetzen.
- [ ] Hero-Ersatzwortmarke durch dezentes Signetbild ersetzen, ohne Auto-Motion zu verändern.
- [ ] Footer auf vollständiges Logo umstellen.
- [ ] Favicon/Icons in Next-Metadata auf das Signet setzen.
- [ ] Gezielte Komponenten-/Seitentests grün ausführen.

### Task 3: Blau-Grün-Tokens und Appvisual

**Files:**
- Modify: `frontend/src/app/globals.css`
- Replace: `frontend/public/images/korba-app.webp`
- Modify: `README.md`

**Interfaces:**
- Produces CSS tokens `--brand-blue`, `--primary`, `--brand-green`, `--blue-soft`, `--green-soft`.

- [ ] Gelbe UI-Rollen inventarisieren und bewusst auf Blau oder Grün zuordnen.
- [ ] Root-Tokens und betroffene Komponentenstile anpassen: CTA/Fokus Blau, Route/Checks Grün, Oberflächen Off-White/Hellblau/Hellgrün.
- [ ] Footer als helle Markenfläche gestalten und Logoabstände responsiv festlegen.
- [ ] Appvisual markenkonform auf Blau/Grün anpassen und sichtbare Texte unverändert lesbar halten.
- [ ] README-Assettabelle und Markenhinweise aktualisieren.
- [ ] Kontrastpaare rechnerisch auf WCAG AA prüfen.

### Task 4: Vollständige Verifikation

**Files:**
- Update generated evidence: `frontend/test-results/visual/*`
- Update generated evidence: `frontend/test-results/lighthouse.json`

- [ ] `npm test -- --reporter=dot` ausführen; erwartet: alle Tests bestanden.
- [ ] `npm run lint` und `npm run typecheck` ausführen; erwartet: Exitcode 0.
- [ ] `npm run build` ausführen; erwartet: Exitcode 0.
- [ ] `npm run test:e2e` ausführen; erwartet: alle verpflichtenden Tests bestanden.
- [ ] Temporären Production-Server starten, Desktop-/Mobile-Screenshots erzeugen und Browserkonsole sowie horizontales Overflow prüfen; Server danach stoppen.
- [ ] Logo, Hero-Auto, Team-Auto, Footer und Appvisual visuell prüfen.
- [ ] `npm run audit:lighthouse` ausführen und Scores dokumentieren.
- [ ] `git diff --check` und finalen Dateiintegritätscheck ausführen.
