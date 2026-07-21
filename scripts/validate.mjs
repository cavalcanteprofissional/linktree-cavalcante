import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, "..", ".validation");
mkdirSync(screenshotsDir, { recursive: true });

const BASE = "http://localhost:3099";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const errors = [];

  // --- 1. Home page ---
  const page = await browser.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.screenshot({
    path: join(screenshotsDir, "mobile-375x812.png"),
    fullPage: true,
  });

  const h1 = await page.textContent("h1");
  const linkCount = await page.locator("a[target=_blank]").count();
  const dark = await page.evaluate(() =>
    document.documentElement.classList.contains("dark")
  );

  console.log("--- HOME PAGE ---");
  console.log(`h1: ${h1}`);
  console.log(`links: ${linkCount}`);
  console.log(`dark: ${dark}`);

  if (h1?.trim() !== "LinkTree Cavalcante")
    errors.push("Home: h1 mismatch");
  if (linkCount === 0) errors.push("Home: no link buttons");
  if (!dark) errors.push("Home: missing dark class");

  // --- 2. Desktop screenshot ---
  const desktopPage = await browser.newPage();
  await desktopPage.setViewportSize({ width: 1280, height: 800 });
  await desktopPage.goto(BASE, { waitUntil: "networkidle" });
  await desktopPage.screenshot({
    path: join(screenshotsDir, "desktop-1280x800.png"),
    fullPage: true,
  });
  await desktopPage.close();

  // --- 3. Shortcode redirect (known) — fetch sem seguir redirect ---
  const { status: knownStatus, headers: knownHeaders } = await fetch(
    `${BASE}/portfolio`,
    { redirect: "manual" }
  ).then((r) => ({ status: r.status, headers: Object.fromEntries(r.headers) }));

  console.log("\n--- SHORTCODE /portfolio ---");
  console.log(`status: ${knownStatus}`);
  console.log(`location: ${knownHeaders.location}`);

  if (knownStatus !== 302)
    errors.push(`Shortcode /portfolio: expected 302, got ${knownStatus}`);
  if (!knownHeaders.location?.includes("cavalcanteprofissional.github.io"))
    errors.push(`Shortcode /portfolio: unexpected redirect target: ${knownHeaders.location}`);

  // --- 4. Shortcode redirect (unknown) ---
  const { status: unknownStatus, headers: unknownHeaders } = await fetch(
    `${BASE}/unknown404`,
    { redirect: "manual" }
  ).then((r) => ({ status: r.status, headers: Object.fromEntries(r.headers) }));

  console.log("\n--- SHORTCODE /unknown404 ---");
  console.log(`status: ${unknownStatus}`);
  console.log(`location: ${unknownHeaders.location}`);

  if (unknownStatus !== 307)
    errors.push(`Shortcode /unknown404: expected 307, got ${unknownStatus}`);
  if (!unknownHeaders.location?.includes("localhost"))
    errors.push(`Shortcode /unknown404: expected redirect to home, got: ${unknownHeaders.location}`);

  // --- 5. Analytics endpoint ---
  const analyticsResp = await page.request.post(`${BASE}/api/analytics`, {
    data: {
      short_code: "portfolio",
      referrer: "test",
      user_agent: "playwright",
      timestamp: new Date().toISOString(),
    },
  });
  const analyticsStatus = analyticsResp.status();
  const analyticsBody = await analyticsResp.json();

  console.log("\n--- ANALYTICS API ---");
  console.log(`status: ${analyticsStatus}`);
  console.log(`body: ${JSON.stringify(analyticsBody)}`);

  if (analyticsStatus !== 200)
    errors.push(`Analytics: expected 200, got ${analyticsStatus}`);
  if (!analyticsBody.ok)
    errors.push(`Analytics: body.ok is false`);

  // --- Results ---
  console.log("\n--- RESULTS ---");
  if (errors.length === 0) {
    console.log("All assertions PASSED");
    console.log(`Screenshots saved to: ${screenshotsDir}`);
    await browser.close();
    process.exit(0);
  } else {
    console.error("FAILURES:");
    errors.forEach((e) => console.error(`  ✗ ${e}`));
    await browser.close();
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
