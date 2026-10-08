# Technologie-Empfehlungen - Fahrschule Korba Landingpage

Grundlage: `Struktur.md` und `.hermes/research/ai-slop-fahrschule-landingpage.md`.

Ziel ist eine hochwertige, ruhige Landingpage für eine fiktive Fahrschule in Krefeld. Die Technik soll die Auto-Story, `/faq`, Preise, Team und Buchungsanfrage sauber tragen, ohne die Seite in einen generischen SaaS-/AI-Slop-Look zu drücken.

## Kurzentscheidung

Ich würde das Projekt so bauen:

| Bereich | Empfehlung |
|---|---|
| App-Framework | **Next.js + TypeScript** |
| Styling | **Tailwind CSS + eigene Design-Tokens** |
| UI-Primitives | **Radix UI sparsam, keine Default-Komponentenoptik** |
| Animation | **Motion for React + CSS-Keyframes** |
| Auto/Bildwelt | **freigestelltes WebP/PNG oder eigenes SVG/Illustration-Asset** |
| Formular | **React Hook Form + Zod, Versand später über Server Action + Resend oder Formspree** |
| Content | **strukturierte TypeScript-Content-Dateien, FAQ als eigene Route `/faq`** |
| Deployment | **Vercel** |
| Qualitätssicherung | **Playwright + Lighthouse/Web Vitals + TypeScript-Build** |

## 1. App-Framework

| Technologie | Vorteile | Nachteile |
|---|---|---|
| **Next.js** | Sehr gut für Landingpages mit eigener `/faq`-Route; einfache Vercel-Deployments; Server Actions möglich für Formular; gute Bildoptimierung. | Mehr Framework als eine reine statische Seite braucht; App Router muss sauber gehalten werden. |
| **Astro** | Extrem schnell für contentlastige Seiten; wenig JavaScript by default; sehr gut für Performance und SEO. | Interaktive Auto-/Scroll-Animationen und komplexere React-Komponenten brauchen Insel-Architektur; Formular-Backend extra planen. |
| **Vite + React** | Einfach, schnell, wenig Framework-Magie; sehr gut für eine reine Singlepage-Landingpage. | `/faq` und SEO/Metadata brauchen mehr Handarbeit; kein eingebautes Backend für Formular. |
| **Nuxt/Vue** | Gute Struktur, SSR/SSG möglich, angenehme DX wenn Vue bevorzugt wird. | Wenn das Projekt sonst React/Next-nah bleiben soll, unnötiger Wechsel; weniger naheliegend für bestehende React-Tooling-Gewohnheit. |

**Empfehlung:** **Next.js + TypeScript**. Für dieses Projekt ist Next.js am praktischsten, weil Startseite, `/faq`, Bildoptimierung, SEO-Metadaten und späteres Formular in einem sauberen Setup bleiben.

## 2. Styling und Design-System

| Technologie | Vorteile | Nachteile |
|---|---|---|
| **Tailwind CSS** | Schnell, konsistent, gut für eigene Layouts; Design-Tokens lassen sich direkt abbilden; keine generischen Komponenten nötig. | Kann unruhig werden, wenn Klassen ohne System wild wachsen; braucht klare Tokens für Farben, Abstände, Typografie. |
| **CSS Modules** | Sehr kontrolliert, wenig Abhängigkeit, gute Kapselung pro Komponente. | Für viele responsive Layouts langsamer; Design-Tokens und Varianten müssen selbst gepflegt werden. |
| **Panda CSS / Vanilla Extract** | Stärker tokenbasiert, sehr sauber für ein echtes Design-System. | Mehr Setup; für eine einzelne Landingpage eventuell zu schwer. |
| **Styled Components / Emotion** | Dynamisches Styling direkt in Komponenten; bekanntes Pattern. | Mehr Runtime/Komplexität; nicht nötig für eine performante Landingpage. |

**Empfehlung:** **Tailwind CSS mit festen Design-Tokens**. Keine AI-purple Mesh-Gradient-Hero-Fläche, keine Default-Kartenoptik. Farbwelt eher Graphit/Off-White plus ein kontrollierter Akzent, z. B. Signalgelb oder Cobalt.

## 3. UI-Komponenten

| Technologie | Vorteile | Nachteile |
|---|---|---|
| **Radix UI** | Sehr gute Accessibility für Dialoge, Selects, Accordion/FAQ; unstyled, dadurch passend zur eigenen Marke. | Man muss selbst hochwertig gestalten; kein fertiger Look. |
| **shadcn/ui** | Schnell startklar; basiert auf Radix; gute Form-/Accordion-Bausteine. | Default-Look ist inzwischen sehr wiedererkennbar; Gefahr von generischem Template-Gefühl. |
| **Headless UI** | Gute unstyled Komponenten, besonders für Menüs/Disclosure. | Weniger breit als Radix; stärker Tailwind/React-Pattern. |
| **Eigene Komponenten** | Maximale visuelle Kontrolle; kein Framework-Look. | Accessibility bei Formularen, Menüs und Accordions muss bewusst sauber gebaut werden. |

**Empfehlung:** **Radix UI sparsam + eigene Komponentenoptik**. Für FAQ-Accordion, Select im Terminformular und eventuell Dialoge ist Radix sinnvoll. Die sichtbare Gestaltung sollte komplett projekt-eigen sein.

## 4. Animation und Auto-Intro

| Technologie | Vorteile | Nachteile |
|---|---|---|
| **Motion for React** | Sehr gut für Hero-Reveal, Scroll-Reveal, Reduced Motion; leichter als komplexe Timeline-Libraries. | Für sehr präzise, lange Timeline-Sequenzen weniger mächtig als GSAP. |
| **CSS-Keyframes / Transitions** | Sehr performant; ideal für einfache Auto-Fahrt und Text-Reveal; wenig JavaScript. | Scroll-getriggerte oder zustandsabhängige Sequenzen werden schnell unübersichtlich. |
| **GSAP** | Beste Kontrolle für komplexe Timelines und ScrollTrigger; Auto-Hin-/Rückfahrt exakt steuerbar. | Größer, mehr Komplexität; kann schnell nach Effekt-Demo wirken, wenn übertrieben. |
| **Framer Motion + Lottie/Rive** | Gut für vektorbasierte Animationen mit Designer-Assets. | Lottie/Rive braucht saubere Assets; falscher Stil wirkt schnell cartoonig oder generisch. |

**Empfehlung:** **Motion for React + CSS-Keyframes**. Hero-Auto mit CSS/Motion animieren, Team-Rückfahrt per Scroll-Trigger dezent. **GSAP nur nehmen**, wenn die Auto-Timeline wirklich präzise inszeniert werden muss.

## 5. Auto-, Bild- und Asset-Strategie

| Option | Vorteile | Nachteile |
|---|---|---|
| **Freigestelltes WebP/PNG-Auto** | Realistisch, hochwertig, performant bei guter Kompression; passt zur Struktur-Vorgabe. | Gute Freistellung ist Pflicht; Stockauto kann generisch wirken. |
| **Eigenes SVG/Illustrations-Auto** | Sehr leicht, perfekt skalierbar, gut animierbar; visuell kontrollierbar. | Muss hochwertig wirken; zu simpel wird cartoonig. |
| **3D-Render als Bildsequenz/WebP** | Premium-Automotive-Look möglich; sehr eigenständig. | Aufwand höher; Dateigröße und Renderqualität kritisch. |
| **Video** | Kann sehr hochwertig wirken, wenn Material perfekt ist. | Große Dateien, Mobile-Probleme, weniger Timing-Kontrolle, Kompressionsrisiko. |

**Empfehlung:** Für den ersten Build **freigestelltes WebP/PNG oder eigenes SVG-Auto**. Kein Video als Standard. Video nur, wenn Material wirklich sauber, kurz und mobil optimiert ist.

## 6. Formular und Buchungsflow

| Technologie | Vorteile | Nachteile |
|---|---|---|
| **React Hook Form + Zod** | Saubere Validierung; gut für Klasse, Fahrlehrer-Auswahl, Kontaktweg und Nachricht; stabiler Standard. | Versand/Backend muss separat gelöst werden. |
| **Next.js Server Actions + Resend** | Formular bleibt im Projekt; E-Mail-Versand ohne eigenes Backend; gut für echte Anfragen. | API-Key nötig; Spam-/Rate-Limit-Schutz planen. |
| **Formspree / Basin / Netlify Forms** | Sehr schnell für Landingpage-Formulare; wenig Backend-Aufwand. | Externer Dienst; Branding/Free-Limits; Datenschutz prüfen. |
| **Supabase** | Gut, wenn Anfragen gespeichert, später verwaltet oder mit Auth/Admin verbunden werden sollen. | Für eine einfache fiktive Landingpage erstmal zu viel; RLS/Tabellen/Policies brauchen Sorgfalt. |

**Empfehlung:** Im ersten Schritt **React Hook Form + Zod** und eine einfache, klare Anfrage-UI. Für echten Versand später **Next.js Server Action + Resend** oder **Formspree**. Supabase erst, wenn wirklich ein Admin-/CRM-Teil geplant ist.

## 7. Content, FAQ und Datenstruktur

| Technologie/Ansatz | Vorteile | Nachteile |
|---|---|---|
| **TypeScript-Content-Dateien** | Einfach, typsicher, schnell; ideal für Preise, Klassen, Team und FAQ. | Kein Redaktions-UI; Änderungen laufen über Code. |
| **MDX** | Gut für längere FAQ-/Infoseiten; Markdown plus Komponenten. | Mehr Setup; für eine kleine FAQ eventuell unnötig. |
| **Contentlayer / Velite** | Saubere Content-Pipeline mit Typen. | Zusätzliche Komplexität; Projektabhängigkeit. |
| **CMS wie Sanity/Notion/Strapi** | Redakteure können Inhalte ohne Code ändern. | Für fiktive Landingpage zu schwer; Datenschutz/Setup/Hosting extra. |

**Empfehlung:** **TypeScript-Content-Dateien** für `team`, `preise`, `klassen`, `faq`. Das hält die Seite einfach, schnell und kontrolliert. MDX nur nehmen, wenn FAQ oder Ratgebertexte deutlich länger werden.

## 8. Routing, SEO und Performance

| Technologie/Tool | Vorteile | Nachteile |
|---|---|---|
| **Next Metadata API** | Saubere Titles, Descriptions, OpenGraph pro Route; passt zu `/faq`. | Muss bewusst gepflegt werden. |
| **next/image** | Automatische Bildoptimierung, Größen, Lazy Loading; hilft gegen LCP/CLS-Probleme. | Braucht korrekte Größen und sinnvolle Asset-Auswahl. |
| **sitemap/robots über Next** | Gute Grundlage für SEO; leicht wartbar. | Für fiktive Seite optional, aber sauber. |
| **Schema.org LocalBusiness/FAQPage** | Hilft Suchmaschinen, Fahrschule und FAQ zu verstehen. | Muss korrekt sein; keine Fake-Daten oder Fake-Ratings einbauen. |

**Empfehlung:** **Next Metadata API + next/image + LocalBusiness/FAQPage-Schema ohne Fake-Bewertungen**. Wichtig: keine künstlichen 4.9-Sterne oder erfundenen Erfolgsquoten.

## 9. Deployment und Hosting

| Plattform | Vorteile | Nachteile |
|---|---|---|
| **Vercel** | Beste Next.js-Integration; Preview Deployments; einfaches Setup. | Vendor-Lock-in leicht höher; manche Features kostenpflichtig bei größerer Nutzung. |
| **Netlify** | Gute Static-/Forms-Unterstützung; einfache Deployments. | Next.js-Unterstützung okay, aber nicht so nativ wie Vercel. |
| **Cloudflare Pages** | Schnell, günstige Edge-Infrastruktur; gut für statische Seiten. | Next.js kann je nach Feature mehr Anpassung brauchen. |
| **GitHub Pages** | Kostenlos und simpel für rein statische Seiten. | Kein Server Action/Formular-Backend; Next.js Export limitiert. |

**Empfehlung:** **Vercel**. Für eine Next.js-Landingpage mit späterem Formular und Preview-Links ist das der sauberste Weg.

## 10. Tests, QA und Anti-Slop-Prüfung

| Tool | Vorteile | Nachteile |
|---|---|---|
| **Playwright** | Echte Browserprüfung; mobile Viewports; Animation/Formular/FAQ testbar. | Setup etwas größer als reine Unit-Tests. |
| **Lighthouse / PageSpeed / Web Vitals** | Prüft Performance, Accessibility, Best Practices; passt zu Anti-Slop-Regeln. | Werte können lokal/online schwanken; Ergebnisse interpretieren statt blind optimieren. |
| **Vitest** | Schnell für kleine Logik wie Content-Validierung, Formatter, Formularschema. | Prüft keine echte UI-Wirkung. |
| **axe / eslint-plugin-jsx-a11y** | Accessibility-Probleme früher finden. | Ersetzt keinen manuellen Browser-Check. |

**Empfehlung:** **Playwright für Browser-Checks + Lighthouse/Web Vitals + TypeScript-Build**. Mindestens prüfen: Desktop-Hero, Mobile-Hero, Reduced Motion, `/faq`, Formularauswahl und Bildgrößen/CLS.

## 11. Analytics und Datenschutz

| Tool | Vorteile | Nachteile |
|---|---|---|
| **Plausible** | Datenschutzfreundlich, leichtgewichtig, kein Cookie-Banner in vielen Setups nötig. | Kostenpflichtig bei echtem Betrieb. |
| **Vercel Analytics** | Sehr einfach bei Vercel; gute Web-Vitals-Nähe. | Plattformgebunden; Datenschutztexte trotzdem sauber halten. |
| **Google Analytics** | Sehr mächtig und bekannt. | Cookie-/Consent-Thema, für lokale Fahrschule oft unnötig schwer. |
| **Kein Analytics im Prototyp** | Schnell, simpel, keine Datenschutzbaustelle. | Keine Nutzungsdaten. |

**Empfehlung:** Im Prototyp **kein Analytics**. Wenn die Seite real live geht: **Plausible** oder **Vercel Analytics**, aber sauber im Datenschutz erklären.

## 12. Was man bewusst vermeiden sollte

- Kein reines Template-Setup mit austauschbaren Feature-Cards.
- Keine shadcn/ui-Default-Landingpage ohne eigene Gestaltung.
- Kein Video-Hero als Standardlösung.
- Keine Fake-Bewertungen, Fake-Zahlen oder generischen Testimonials.
- Keine übertriebene Scroll-Spektakel-Seite, die mobil ruckelt.
- Kein schweres CMS, solange Inhalte klein und fiktiv sind.
- Keine versteckten App-Kosten im Preisbereich.

## Finale Stack-Empfehlung für die Umsetzung

```txt
Framework:        Next.js + TypeScript
Styling:          Tailwind CSS mit eigenen Tokens
UI-Primitives:    Radix UI sparsam
Animation:        Motion for React + CSS-Keyframes
Forms:            React Hook Form + Zod
Form-Versand:     später Server Action + Resend oder Formspree
Content:          TypeScript-Content-Dateien
Assets:           WebP/PNG/SVG, kein Video als Default
Hosting:          Vercel
QA:               Playwright + Lighthouse/Web Vitals + TypeScript-Build
```

Diese Kombination passt am besten zur gewünschten Seite: hochwertig, performant, animiert genug für die Auto-Idee, aber nicht überladen und nicht generisch.
