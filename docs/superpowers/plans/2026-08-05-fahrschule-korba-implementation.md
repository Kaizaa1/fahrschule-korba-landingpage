# Fahrschule Korba Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eine vollständige, responsive und getestete Next.js-Landingpage für Fahrschule Korba mit FAQ-Route, Auto-Animation und Demo-Terminanfrage bauen.

**Architecture:** Die Website lebt als Next.js-App in `frontend/`. Statische Inhalte liegen typisiert in `src/content/site.ts`; Server Components bauen die Seitenstruktur, kleine Client Islands kapseln Motion, Navigation, Accordion und Formularzustand. Lokale, beschriftete Platzhalterbilder können über zentrale Pfade ersetzt werden.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Motion, Radix Accordion, React Hook Form, Zod, Phosphor Icons, Vitest, Testing Library, Playwright.

## Global Constraints

- Keine Fake-Bewertungen, Fake-Zahlen oder erfundenen Erfolgsquoten.
- Primärer CTA überall exakt `Termin buchen`.
- FAQ ausschließlich unter `/faq`.
- Formular ist eine Demo und behauptet keinen echten Versand.
- Eine Signalgelb-Akzentfarbe, keine AI-purple Gradients.
- Mobile Hero eigenständig, CTA sofort sichtbar, Reduced Motion respektieren.
- Platzhalterbilder müssen über zentrale Dateipfade einfach austauschbar sein.
- Keine drei identischen Feature-Karten als Hauptlayout.

---

### Task 1: Projektbasis und testbare Content-Verträge

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/src/content/site.ts`
- Create: `frontend/src/content/site.test.ts`
- Create: `frontend/vitest.config.ts`
- Create: `frontend/src/test/setup.ts`
- Create: `frontend/next.config.ts`
- Create: `frontend/tsconfig.json`

**Interfaces:**
- Produces: `siteContent`, `prices`, `faqItems`, `team`, `drivingClasses`, `processSteps`, `imageAssets`

- [ ] Scaffold Next.js with TypeScript, Tailwind, App Router and `src/` directory.
- [ ] Add Vitest, Testing Library, Playwright, Motion, Radix Accordion, React Hook Form, Zod and Phosphor dependencies.
- [ ] Write content contract tests that require Krefeld, `/faq`, the four specified license options, app fee, three instructors and centralized image paths.
- [ ] Run `npm test` and confirm RED because `site.ts` does not exist.
- [ ] Implement the typed content module.
- [ ] Run `npm test` and confirm GREEN.

### Task 2: Global shell, navigation, hero and placeholders

**Files:**
- Create: `frontend/src/app/layout.tsx`
- Create: `frontend/src/app/globals.css`
- Create: `frontend/src/components/site-header.tsx`
- Create: `frontend/src/components/hero-scene.tsx`
- Create: `frontend/public/images/car-placeholder.svg`
- Create: `frontend/public/images/app-placeholder.svg`
- Create: `frontend/public/images/team-mara.svg`
- Create: `frontend/public/images/team-leonie.svg`
- Create: `frontend/public/images/team-samir.svg`
- Test: `frontend/src/components/site-header.test.tsx`

**Interfaces:**
- Produces: `SiteHeader`, `HeroScene`
- Consumes: `siteContent`, `imageAssets`

- [ ] Write tests for the exact CTA label, desktop nav targets and accessible mobile-menu button.
- [ ] Run focused tests and confirm RED because components do not exist.
- [ ] Implement metadata, fonts, tokens, header and Hero with reduced-motion fallback.
- [ ] Add local replacement-friendly assets with stable dimensions.
- [ ] Run focused tests and confirm GREEN.

### Task 3: Landingpage-Sektionen

**Files:**
- Create: `frontend/src/app/page.tsx`
- Create: `frontend/src/components/home/advantages.tsx`
- Create: `frontend/src/components/home/classes.tsx`
- Create: `frontend/src/components/home/process-route.tsx`
- Create: `frontend/src/components/home/app-feature.tsx`
- Create: `frontend/src/components/home/team.tsx`
- Create: `frontend/src/components/home/pricing.tsx`
- Create: `frontend/src/components/reveal.tsx`
- Test: `frontend/src/app/page.test.tsx`

**Interfaces:**
- Produces: vollständige Startseite mit IDs `klassen`, `ablauf`, `team`, `preise`, `termin`
- Consumes: alle typisierten Content-Arrays und Bildpfade

- [ ] Write a page test that requires every planned section, transparent app fee and no FAQ section on `/`.
- [ ] Run focused test and confirm RED.
- [ ] Build each section with a distinct responsive layout family and concise copy.
- [ ] Add Motion reveal islands only where hierarchy or storytelling benefits.
- [ ] Run focused test and confirm GREEN.

### Task 4: Demo-Buchung und FAQ

**Files:**
- Create: `frontend/src/components/booking-form.tsx`
- Create: `frontend/src/lib/booking-schema.ts`
- Create: `frontend/src/lib/booking-schema.test.ts`
- Create: `frontend/src/app/faq/page.tsx`
- Create: `frontend/src/components/faq-accordion.tsx`
- Test: `frontend/src/components/booking-form.test.tsx`
- Test: `frontend/src/app/faq/page.test.tsx`

**Interfaces:**
- Produces: `bookingSchema`, `BookingForm`, `FaqAccordion`
- Booking success message: `Demo-Anfrage vorbereitet. Es wurden keine Daten versendet.`

- [ ] Write validation tests for required class, contact method, valid contact data and optional instructor choice.
- [ ] Run schema tests and confirm RED.
- [ ] Implement Zod schema and confirm GREEN.
- [ ] Write component tests for form labels, errors and honest demo success state, plus FAQ route content.
- [ ] Run component tests and confirm RED.
- [ ] Implement form and Radix FAQ accordion.
- [ ] Run component tests and confirm GREEN.

### Task 5: End-to-End- und visuelle Verifikation

**Files:**
- Create: `frontend/playwright.config.ts`
- Create: `frontend/e2e/site.spec.ts`
- Create: `README.md`

**Interfaces:**
- Produces: reproduzierbarer Start-, Build- und Testworkflow

- [ ] Write Playwright checks for `/`, `/faq`, nav anchors, form error state, form demo success and mobile viewport.
- [ ] Run Playwright and fix only regressions reproduced by failing tests.
- [ ] Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` and `npm run test:e2e`.
- [ ] Start the production app, inspect desktop and mobile screenshots, interact with the form and FAQ, and check browser console.
- [ ] Audit visible copy for placeholders, fake claims, duplicate CTA intent, em/en dashes and hidden app fees.
- [ ] Document install, scripts, image replacement and demo-form limitation in `README.md`.
