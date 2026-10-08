import { chromium, devices } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("test-results/visual");
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const reports = [];
const targets = [
  { name: "desktop", options: { viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 } },
  { name: "mobile", options: { ...devices["Pixel 7"] } },
];

for (const target of targets) {
  const context = await browser.newContext(target.options);
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
  const teamSection = page.locator("#team");
  await teamSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await teamSection.screenshot({ path: path.join(outputDir, `team-rotation-${target.name}-mara.png`) });

  await page.getByRole("button", { name: "Leonie Krüger fokussieren" }).click();
  await page.waitForTimeout(350);
  await teamSection.screenshot({ path: path.join(outputDir, `team-rotation-${target.name}-transition.png`) });
  await page.waitForTimeout(500);
  await teamSection.screenshot({ path: path.join(outputDir, `team-rotation-${target.name}-leonie.png`) });

  reports.push({
    viewport: target.name,
    activeName: await page.locator('.team-card[aria-current="true"] h3').textContent(),
    leftCards: await page.locator('.team-card[data-slot="left"]').count(),
    rightCards: await page.locator('.team-card[data-slot="right"]').count(),
    consoleErrors,
    pageErrors,
    documentWidth: await page.evaluate(() => document.documentElement.scrollWidth),
    viewportWidth: await page.evaluate(() => window.innerWidth),
  });
  await context.close();
}

const reducedContext = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const reducedPage = await reducedContext.newPage();
const reducedConsoleErrors = [];
const reducedPageErrors = [];
reducedPage.on("console", (message) => {
  if (message.type() === "error") reducedConsoleErrors.push(message.text());
});
reducedPage.on("pageerror", (error) => reducedPageErrors.push(error.message));
await reducedPage.goto("http://127.0.0.1:3100/", { waitUntil: "networkidle" });
await reducedPage.locator("#team").scrollIntoViewIfNeeded();
await reducedPage.waitForTimeout(4800);
await reducedPage.locator("#team").screenshot({ path: path.join(outputDir, "team-rotation-reduced-motion.png") });
reports.push({
  viewport: "desktop-reduced-motion",
  activeName: await reducedPage.locator('.team-card[aria-current="true"] h3').textContent(),
  consoleErrors: reducedConsoleErrors,
  pageErrors: reducedPageErrors,
  documentWidth: await reducedPage.evaluate(() => document.documentElement.scrollWidth),
  viewportWidth: await reducedPage.evaluate(() => window.innerWidth),
});
await reducedContext.close();
await browser.close();

await writeFile(path.join(outputDir, "team-rotation-report.json"), JSON.stringify(reports, null, 2));
console.log(JSON.stringify(reports, null, 2));
