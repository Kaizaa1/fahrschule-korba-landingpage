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

  for (const selector of ["#ablauf", "#team", "#preise", ".app-section", "#termin"]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(450);
  }

  await page.locator("#ablauf").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2600);
  await page.locator("#ablauf").screenshot({ path: path.join(outputDir, `${target.name}-process.png`) });

  await page.locator("#team").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1300);
  await page.locator("#team").screenshot({ path: path.join(outputDir, `${target.name}-team.png`) });

  await page.locator("#preise").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.locator("#preise").screenshot({ path: path.join(outputDir, `${target.name}-pricing.png`) });

  await page.locator(".app-section").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.locator(".app-section").screenshot({ path: path.join(outputDir, `${target.name}-app.png`) });

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.screenshot({ fullPage: true, path: path.join(outputDir, `${target.name}-full.png`) });

  reports.push({
    viewport: target.name,
    consoleErrors,
    pageErrors,
    documentWidth: await page.evaluate(() => document.documentElement.scrollWidth),
    viewportWidth: await page.evaluate(() => window.innerWidth),
  });

  await context.close();
}

await browser.close();
await writeFile(path.join(outputDir, "report.json"), JSON.stringify(reports, null, 2));
console.log(JSON.stringify(reports, null, 2));
