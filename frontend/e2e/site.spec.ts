import { expect, test } from "@playwright/test";

test("renders the complete landing page and dedicated FAQ", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Fahrschule Korba/);
  await expect(page.getByRole("heading", { name: "Führerschein so leicht wie noch nie" })).toBeVisible();
  await expect(page.locator("#klassen")).toBeVisible();
  await expect(page.locator("#preise").getByText("49 € einmalig")).toBeVisible();

  await page.goto("/faq");
  await expect(page.getByRole("heading", { name: "Fragen vor der ersten Fahrstunde" })).toBeVisible();
  const question = page.getByRole("button", { name: "Was ist B197?" });
  await question.click();
  await expect(page.getByText(/praktische Prüfung auf einem Automatikfahrzeug/)).toBeVisible();
});

test("uses the revised order, compact route, and even team layout", async ({ page, isMobile }) => {
  await page.goto("/");

  const orderIsCorrect = await page.evaluate(() => {
    const pricing = document.querySelector("#preise");
    const app = document.querySelector(".app-section");
    const booking = document.querySelector("#termin");
    if (!pricing || !app || !booking) return false;

    return Boolean(
      pricing.compareDocumentPosition(app) & Node.DOCUMENT_POSITION_FOLLOWING
      && app.compareDocumentPosition(booking) & Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
  expect(orderIsCorrect).toBe(true);

  const process = page.locator("#ablauf");
  await process.scrollIntoViewIfNeeded();
  await expect(page.getByRole("img", { name: "Rakete auf der Strecke von Beratung bis Prüfung" })).toBeVisible();
  await expect(process.locator(".process-station")).toHaveCount(6);
  expect(await process.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);

  const teamCarousel = page.locator(".team-carousel");
  await teamCarousel.scrollIntoViewIfNeeded();
  await expect(teamCarousel.locator('.team-card[aria-current="true"]')).toHaveCount(1);
  await expect(teamCarousel.locator('.team-card[data-slot="left"]')).toHaveCount(1);
  await expect(teamCarousel.locator('.team-card[data-slot="right"]')).toHaveCount(1);
  await expect(page.getByRole("article", { name: /Mara Özdemir/ })).toHaveAttribute("aria-current", "true");
  await expect(page.getByText("Im Fokus", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /Rotation (pausieren|fortsetzen)/ })).toHaveCount(0);

  if (isMobile) {
    const mobileWidths = await teamCarousel.evaluate((carousel) => ({
      carousel: carousel.getBoundingClientRect().width,
      focus: carousel.querySelector('[data-slot="focus"]')?.getBoundingClientRect().width ?? Infinity,
    }));
    expect(mobileWidths.carousel - mobileWidths.focus).toBeGreaterThanOrEqual(56);
  } else {
    const boxes = await teamCarousel.locator(".team-card").evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        slot: element.getAttribute("data-slot"),
        top: rect.top,
        baseHeight: (element as HTMLElement).offsetHeight,
      };
    }));
    const focusTop = boxes.find((box) => box.slot === "focus")?.top ?? Infinity;
    const sideTops = boxes.filter((box) => box.slot !== "focus").map((box) => box.top);

    expect(Math.max(...boxes.map((box) => box.baseHeight)) - Math.min(...boxes.map((box) => box.baseHeight))).toBeLessThanOrEqual(1);
    expect(focusTop).toBeLessThan(Math.min(...sideTops));
  }

  await page.waitForTimeout(2200);
  await expect(page.getByRole("article", { name: /Leonie Krüger/ })).toHaveAttribute("aria-current", "true");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});

test("supports reduced motion, stable layout, and an immediate mobile CTA", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const state = window as Window & { __cls?: number };
    state.__cls = 0;

    new PerformanceObserver((list) => {
      for (const rawEntry of list.getEntries()) {
        const entry = rawEntry as PerformanceEntry & { value: number; hadRecentInput: boolean };
        if (!entry.hadRecentInput) state.__cls = (state.__cls ?? 0) + entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto("/");
  await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");
  await expect(page.getByRole("link", { name: "Termin buchen" }).first()).toBeVisible();
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);

  if (isMobile) {
    await expect(page.locator(".hero-actions").getByRole("link", { name: "Termin buchen" })).toBeVisible();
  }

  await page.waitForTimeout(500);
  expect(await page.evaluate(() => (window as Window & { __cls?: number }).__cls ?? 0)).toBeLessThan(0.1);

  const teamCarousel = page.locator(".team-carousel");
  await teamCarousel.scrollIntoViewIfNeeded();
  await expect(page.getByRole("article", { name: /Mara Özdemir/ })).toHaveAttribute("aria-current", "true");
  const reducedCardPositions = await teamCarousel.locator(".team-card").evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return `${Math.round(rect.left)}:${Math.round(rect.top)}`;
    }),
  );
  expect(new Set(reducedCardPositions).size).toBe(3);
  await page.waitForTimeout(4200);
  await expect(page.getByRole("article", { name: /Mara Özdemir/ })).toHaveAttribute("aria-current", "true");
});

test("provides working legal destinations", async ({ page }) => {
  await page.goto("/impressum");
  await expect(page.getByRole("heading", { name: "Impressum" })).toBeVisible();

  await page.goto("/datenschutz");
  await expect(page.getByRole("heading", { name: "Datenschutz" })).toBeVisible();
});

test("validates and completes the honest demo booking flow", async ({ page }) => {
  await page.goto("/#termin");

  await page.getByRole("button", { name: "Anfrage vorbereiten" }).click();
  await expect(page.getByText("Bitte wähle eine Führerscheinklasse aus.")).toBeVisible();

  await page.getByLabel("Führerscheinklasse").selectOption("B197");
  await page.getByLabel("Kontaktweg").selectOption("E-Mail");
  await page.getByLabel("Name").fill("Qaiser Barto");
  await page.getByLabel("E-Mail oder Telefonnummer").fill("qaiser@example.de");
  await page.getByLabel("Nachricht").fill("Ich möchte mich zu B197 beraten lassen.");
  await page.getByRole("button", { name: "Anfrage vorbereiten" }).click();

  await expect(page.getByText("Demo-Anfrage vorbereitet. Es wurden keine Daten versendet.")).toBeVisible();
});

test("uses the compact mobile navigation", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only behavior");
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Menü öffnen" });
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(page.getByRole("navigation", { name: "Mobile Navigation" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Mobile Navigation" }).getByRole("link", { name: "FAQ" })).toBeVisible();
});
