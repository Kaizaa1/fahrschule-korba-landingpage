# OpenAI-Bildprompts – Fahrschule Korba

## Gemeinsame Bildsprache

Alle Motive gehören zu derselben ruhigen, sympathischen Bildwelt: glaubwürdige Fahrschule in Krefeld, natürliches weiches Tageslicht, leicht warme Hauttöne, zurückhaltende Graphit-/Steinfarben und ein dosierter Korba-Gelbton (`#F1D84A`). Keine sterile SaaS-Ästhetik, keine übertriebene Autowerbung, keine Stockfoto-Gesten, keine künstlich glatte Haut, keine dramatische Kinobeleuchtung, keine Wasserzeichen und keine zufälligen Schriftzüge.

Die Personen sind vollständig fiktiv und stellen keine realen Mitarbeiter dar.

---

## 1. Hero-Fahrschulauto

**Zieldatei:** `frontend/public/images/korba-touareg-hero.png`  
**Einsatz:** animierte Querfahrt im Hero  
**Arbeitsformat:** 1536 × 1024 px, anschließend enger transparenter Zuschnitt auf ungefähr 760 × 300 px

```text
Use case: photorealistic-natural
Asset type: transparent automotive cutout for a premium but approachable German driving-school landing-page hero

Create a photorealistic full-body cutout of a current-generation Volkswagen Touareg used as a German driving-school vehicle. The SUV is dark graphite grey with clean realistic paint, factory proportions, correct wheels, mirrors, windows, doors and headlights. Add one small professional yellow driving-school roof sign with the single correctly spelled German word “FAHRSCHULE” in plain black lettering; no other branding, slogans or decorative decals.

Composition: exact three-quarter side view, front of the vehicle pointing to the RIGHT, entire car visible from bumper to bumper, wheels level, camera at normal standing height, natural 50 mm perspective. The vehicle must look ready to drive horizontally across a website. Keep generous but even padding around the vehicle and avoid unused empty canvas. Do not crop wheels, mirrors, roof sign or bumpers.

Lighting and mood: soft overcast German daylight, subtle realistic reflections, friendly and trustworthy rather than aggressive, polished but not a commercial luxury-car advertisement.

Background/output: isolated object on true transparency if supported; otherwise a perfectly flat solid #00FF00 chroma-key background with no floor, no horizon, no shadow, no gradient and no reflection. Do not use green anywhere on the vehicle.

Avoid: wrong vehicle model, left-facing vehicle, warped body panels, malformed wheels, extra doors, extra mirrors, unreadable lettering, license-plate text, people, city background, studio floor, cast shadow, motion blur, dramatic lighting, cartoon, illustration, CGI look, watermark.
```

---

## 2. Team-Fahrschulauto mit Fahrlehrer

**Zieldatei:** `frontend/public/images/korba-touareg-team.png`  
**Einsatz:** animierte Einfahrt in den Teambereich  
**Arbeitsformat:** 1536 × 1024 px, anschließend enger transparenter Zuschnitt auf ungefähr 760 × 300 px  
**Referenz:** Das ausgewählte Hero-Auto als Bildreferenz verwenden.

```text
Use case: identity-preserve
Asset type: transparent automotive cutout for the team introduction of the same driving-school website
Input image: the approved Korba Volkswagen Touareg hero cutout is the vehicle-identity reference

Create a second photorealistic view of exactly the same current-generation dark graphite Volkswagen Touareg driving-school vehicle. Preserve the model generation, graphite paint, factory wheels, body proportions and small yellow “FAHRSCHULE” roof sign from the reference.

Show a calm, friendly fictional male driving instructor in his late 30s in the driver’s seat, visible naturally through the open or clear side window. He has short dark hair, a neat short beard, a relaxed genuine expression and simple smart-casual clothing in charcoal and light stone. He looks toward the road, not posed toward the camera.

Composition: clean side-to-three-quarter view with the front pointing to the LEFT so the vehicle visually returns into the team section. Entire vehicle visible, wheels level, camera at standing height, natural 50 mm perspective. Keep enough but not excessive transparent padding and do not crop wheels, mirrors, roof sign or bumpers.

Lighting and mood: the same soft overcast German daylight and natural reflections as the reference image; warm, approachable and competent, never salesy.

Background/output: isolated object on true transparency if supported; otherwise a perfectly flat solid #00FF00 chroma-key background with no floor, horizon, shadow, gradient or reflection. Do not use green in the subject.

Avoid: changing the vehicle, malformed hands or face, instructor waving, camera-facing stock-photo pose, unreadable roof text, random logos, license-plate text, extra people, background scenery, cast shadow, motion blur, dramatic car-advertising light, cartoon, illustration, CGI look, watermark.
```

---

## 3. Mara Özdemir – Teamfoto

**Zieldatei:** `frontend/public/images/team-mara.webp`  
**Einsatz:** erste Teamkarte, 16:10 mit `object-fit: cover`  
**Arbeitsformat:** 1536 × 1024 px

```text
Use case: photorealistic-natural
Asset type: consistent 16:10 team portrait for a friendly German driving-school website

Create a natural environmental portrait of a completely fictional Turkish-German driving instructor named Mara Özdemir, early 30s. She has shoulder-length dark wavy hair, natural skin texture, a calm open expression and a small genuine smile. Clothing: understated smart-casual dark graphite overshirt over a warm off-white top, no logos and no uniform.

Scene: beside a modern driving-school car in a quiet Krefeld street or training-area setting; the car appears only softly out of focus and never dominates. Neutral urban background with muted stone, asphalt and a very subtle yellow detail that harmonizes with the Korba website.

Composition: horizontal environmental portrait, waist-up, eyes near the upper third, subject slightly off-center, enough space around head and shoulders for a 16:10 card crop on desktop and mobile. Natural 50–70 mm lens perspective, shallow but believable depth of field.

Lighting and mood: soft overcast daylight, authentic skin tones, warm approachable competence, candid editorial photography rather than a staged corporate headshot.

Avoid: stock-photo gestures, crossed arms, exaggerated smile, beauty retouching, plastic skin, glamour makeup, dramatic rim light, neon colors, classroom cliché, visible text, logos, watermark, duplicate people, malformed hands, cartoon, illustration, CGI.
```

---

## 4. Leonie Krüger – Teamfoto

**Zieldatei:** `frontend/public/images/team-leonie.webp`  
**Einsatz:** zweite Teamkarte, 16:10 mit `object-fit: cover`  
**Arbeitsformat:** 1536 × 1024 px

```text
Use case: photorealistic-natural
Asset type: consistent 16:10 team portrait for the same friendly German driving-school website

Create a natural environmental portrait of a completely fictional German driving instructor named Leonie Krüger, mid 30s. She has chin-to-shoulder-length light brown hair, natural skin texture, attentive eyes and a relaxed genuine smile. Clothing: understated smart-casual muted olive-grey jacket over a cream knit top, no logos and no uniform.

Scene: the same visual world as Mara’s portrait, near a modern driving-school vehicle in a quiet Krefeld street or training area; car and surroundings remain softly out of focus. Muted graphite, stone and asphalt palette with one restrained Korba-yellow accent in the distant background.

Composition: horizontal environmental portrait, waist-up, eyes near upper third, subject slightly off-center in the opposite direction from Mara, generous head-and-shoulder margin for stable 16:10 cropping. Natural 50–70 mm lens and believable shallow depth of field.

Lighting and mood: matching soft overcast daylight and color grading, friendly, patient and grounded, editorial rather than corporate.

Avoid: stock-photo gestures, crossed arms, exaggerated grin, over-retouched skin, glamour styling, dramatic light, neon colors, visible text, logos, watermark, duplicate people, malformed hands, cartoon, illustration, CGI.
```

---

## 5. Samir Haddad – Teamfoto

**Zieldatei:** `frontend/public/images/team-samir.webp`  
**Einsatz:** dritte Teamkarte, 16:10 mit `object-fit: cover`  
**Arbeitsformat:** 1536 × 1024 px

```text
Use case: photorealistic-natural
Asset type: consistent 16:10 team portrait for the same friendly German driving-school website

Create a natural environmental portrait of a completely fictional German driving instructor with Middle Eastern family background named Samir Haddad, late 30s. He has short dark hair, a neat short beard, natural skin texture and a calm, reassuring expression with a subtle genuine smile. Clothing: simple smart-casual charcoal jacket over a light stone-grey shirt, no logos and no uniform.

Scene: the same visual world as Mara and Leonie, near a modern driving-school vehicle in a quiet Krefeld street or training area; background and vehicle remain softly out of focus. Muted graphite, stone and asphalt colors with one very restrained Korba-yellow detail.

Composition: horizontal environmental portrait, waist-up, eyes near upper third, slightly off-center, generous room around head and shoulders for 16:10 crops at all breakpoints. Natural 50–70 mm lens and believable shallow depth of field.

Lighting and mood: matching soft overcast daylight and color grading; composed, approachable and competent, never intimidating or overly posed.

Avoid: stock-photo thumbs-up, crossed arms, exaggerated smile, stereotypes, over-retouched skin, dramatic light, neon colors, visible text, logos, watermark, duplicate people, malformed hands, cartoon, illustration, CGI.
```

---

## 6. Korba-Fahrschulapp

**Zieldatei:** `frontend/public/images/korba-app.webp`  
**Einsatz:** App-/49-€-Sektion  
**Arbeitsformat:** 1536 × 1229 px oder 5:4

```text
Use case: ui-mockup
Asset type: polished 5:4 product visual for a German driving-school landing page

Create a photorealistic premium product image of one modern smartphone showing the Fahrschule Korba learner app. The phone is placed at a slight natural angle on a warm light-stone surface with a small graphite notebook and one yellow pencil partly visible; keep the scene clean and believable, not a generic SaaS render.

The app screen uses a restrained interface in off-white, graphite and Korba yellow (#F1D84A), with rounded cards and clear spacing. Render only these short German labels correctly and verbatim: “KORBA”, “Heute”, “Theorie 68 %”, “Nächste Fahrstunde”, “Do · 16:30”, “Lernstand”. Use simple route, calendar and progress icons. No other words, placeholder text or random characters.

Composition: 5:4 landscape, phone occupying roughly 58 percent of the frame, screen fully visible and readable, useful breathing room around it, designed to sit beside website copy. Natural perspective, no extreme angle, no hand holding the phone.

Lighting and mood: soft diffused daylight, subtle realistic contact shadow, warm and approachable, premium through restraint rather than gloss. Match a website with off-white background, dark graphite text and a muted yellow accent.

Avoid: multiple phones, floating holograms, neon gradients, generic blue SaaS palette, unreadable text, extra interface labels, fake notifications, hands, people, excessive reflections, dramatic studio light, cartoon, illustration, low-detail CGI, watermark, external logos.
```

## Auswahl- und Qualitätskontrolle

- Touareg eindeutig erkennen; Türen, Räder, Spiegel, Scheinwerfer und Fenster auf anatomische Fehler prüfen.
- Hero-Auto zeigt nach rechts, Team-Auto nach links. Die vorhandenen Animationszeiten bleiben unverändert.
- Transparente Automotive-Dateien auf enge Bounding Box, saubere Kanten und transparente Ecken prüfen.
- Porträts als zusammengehörige Serie prüfen: gleiche Lichtstimmung, Brennweite, Farbkorrektur und Kopfraum; dennoch keine geklonten Gesichter.
- Apptext bei 100 % Zoom prüfen. Bei einem einzigen Textfehler gezielt korrigieren statt das gesamte Motiv neu zu erfinden.
- Final als optimierte WebP-Dateien ausgeben; Automotive-Cutouts wegen Alpha als PNG oder verlustfreies WebP.
