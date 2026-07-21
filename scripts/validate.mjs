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

  // --- 1. Home page + Instagram feed ---
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  // wait for instagram feed to load
  await page.waitForTimeout(2000);
  await page.waitForLoadState("networkidle");

  await page.screenshot({
    path: join(screenshotsDir, "mobile-375x812.png"),
    fullPage: true,
  });

  const h1 = await page.textContent("h1");
  const links = await page.locator("a[target=_blank]").count();
  const dark = await page.evaluate(() =>
    document.documentElement.classList.contains("dark")
  );

  // Instagram posts - look for images in the feed
  const feedSection = page.locator("h2:has-text('Instagram')");
  const feedVisible = await feedSection.isVisible().catch(() => false);
  let mockImages = 0;
  if (feedVisible) {
    mockImages = await page
      .locator("h2:has-text('Instagram')")
      .locator("..")
      .locator("img")
      .count();
  }

  console.log("--- MOBILE (375x812) ---");
  console.log(`h1: ${h1}`);
  console.log(`link buttons: ${links}`);
  console.log(`dark: ${dark}`);
  console.log(`instagram feed visible: ${feedVisible}`);
  console.log(`instagram images: ${mockImages}`);

  // --- 2. Instagram API directly ---
  const apiResp = await page.request.get(`${BASE}/api/instagram`);
  const apiBody = await apiResp.json();
  console.log(`\n--- API /api/instagram ---`);
  console.log(`status: ${apiResp.status()}`);
  console.log(`source: ${apiBody.source}`);
  console.log(`posts count: ${apiBody.posts?.length}`);

  if (apiResp.status() !== 200)
    errors.push(`Instagram API: expected 200, got ${apiResp.status()}`);
  if (!apiBody.posts || apiBody.posts.length === 0)
    errors.push("Instagram API: no posts returned");
  if (apiBody.source !== "mock")
    errors.push(`Instagram API: expected source "mock", got "${apiBody.source}"`);

  // --- 3. Desktop screenshot ---
  const desktopCtx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto(BASE, { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(2000);
  await desktopPage.screenshot({
    path: join(screenshotsDir, "desktop-1280x800.png"),
    fullPage: true,
  });
  await desktopPage.close();
  await desktopCtx.close();

  // --- 4. Shortcode redirect ---
  const sd = await fetch(`${BASE}/portfolio`, { redirect: "manual" }).then(
    (r) => ({ status: r.status })
  );
  console.log(`\n--- SHORTCODE /portfolio ---`);
  console.log(`status: ${sd.status}`);
  if (sd.status !== 302) errors.push(`Shortcode: expected 302, got ${sd.status}`);

  // --- Assertions ---
  console.log("\n--- RESULTS ---");
  if (h1?.trim() !== "LinkTree Cavalcante")
    errors.push("Home: h1 mismatch");
  if (links === 0) errors.push("Home: no link buttons");
  if (!dark) errors.push("Home: missing dark class");
  if (!feedVisible) errors.push("Home: instagram feed section not visible");
  if (mockImages === 0) errors.push("Home: no instagram images rendered");

  if (errors.length === 0) {
    console.log("All assertions PASSED");
    console.log(`Screenshots saved to: ${screenshotsDir}`);
  } else {
    console.error("FAILURES:");
    errors.forEach((e) => console.error(`  ✗ ${e}`));
  }

  await browser.close();
  process.exit(errors.length === 0 ? 0 : 1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
