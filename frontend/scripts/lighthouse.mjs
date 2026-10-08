import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";

const port = 3100;
const url = `http://127.0.0.1:${port}`;
const outputDir = path.resolve("test-results");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const server = spawn(npmCommand, ["run", "start", "--", "-p", String(port)], {
  cwd: process.cwd(),
  stdio: ["ignore", "pipe", "pipe"],
  windowsHide: true,
  shell: process.platform === "win32",
});

let serverOutput = "";
server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Production server did not become ready.\n${serverOutput}`);
}

async function stopServer() {
  if (server.exitCode !== null) return;

  if (process.platform === "win32") {
    await new Promise((resolve) => {
      const killer = spawn("taskkill.exe", ["/pid", String(server.pid), "/T", "/F"], {
        stdio: "ignore",
        windowsHide: true,
      });
      killer.once("close", resolve);
      killer.once("error", resolve);
    });
  } else {
    server.kill("SIGTERM");
  }
}

let chrome;
try {
  await waitForServer();
  chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  });

  const result = await lighthouse(url, {
    port: chrome.port,
    logLevel: "error",
    output: ["json", "html"],
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });

  if (!result) throw new Error("Lighthouse returned no result.");

  await mkdir(outputDir, { recursive: true });
  const reports = Array.isArray(result.report) ? result.report : [result.report];
  await writeFile(path.join(outputDir, "lighthouse.json"), reports[0]);
  await writeFile(path.join(outputDir, "lighthouse.html"), reports[1] ?? "");

  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([key, category]) => [key, Math.round((category.score ?? 0) * 100)]),
  );
  console.log(JSON.stringify(scores));

  const minimums = { performance: 80, accessibility: 90, "best-practices": 90, seo: 90 };
  const failures = Object.entries(minimums).filter(([key, minimum]) => (scores[key] ?? 0) < minimum);
  if (failures.length > 0) {
    throw new Error(`Lighthouse thresholds missed: ${failures.map(([key, minimum]) => `${key} < ${minimum}`).join(", ")}`);
  }
} finally {
  await chrome?.kill();
  await stopServer();
}
