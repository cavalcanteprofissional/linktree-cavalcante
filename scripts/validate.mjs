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

  // --- Mobile (375x812) ---
  const mobileCtx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(BASE, { waitUntil: "networkidle" });
  await mobilePage.screenshot({
    path: join(screenshotsDir, "mobile-375x812.png"),
    fullPage: true,
  });

  // DOM checks (mobile)
  const mobileH1 = await mobilePage.textContent("h1");
  const mobileDark = await mobilePage.evaluate(() =>
    document.documentElement.classList.contains("dark")
  );
  const mobileBio = await mobilePage.textContent("p");
  const mobileLinks = await mobilePage.locator("a[target=_blank]").count();
  const mobileSkeleton = await mobilePage.locator(".animate-pulse").count();

  console.log("--- MOBILE (375x812) ---");
  console.log(`h1 text: ${mobileH1}`);
  console.log(`dark class: ${mobileDark}`);
  console.log(`bio text: ${mobileBio}`);
  console.log(`link buttons: ${mobileLinks}`);
  console.log(`skeletons: ${mobileSkeleton}`);

  // --- Desktop (1280x800) ---
  const desktopCtx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto(BASE, { waitUntil: "networkidle" });
  await desktopPage.screenshot({
    path: join(screenshotsDir, "desktop-1280x800.png"),
    fullPage: true,
  });

  const desktopH1 = await desktopPage.textContent("h1");
  const desktopLinks = await desktopPage.locator("a[target=_blank]").count();

  console.log("\n--- DESKTOP (1280x800) ---");
  console.log(`h1 text: ${desktopH1}`);
  console.log(`link buttons: ${desktopLinks}`);

  // --- Assertions ---
  const errors = [];
  if (mobileH1?.trim() !== "LinkTree Cavalcante")
    errors.push(`Mobile: h1 mismatch: "${mobileH1}"`);
  if (desktopH1?.trim() !== "LinkTree Cavalcante")
    errors.push(`Desktop: h1 mismatch: "${desktopH1}"`);
  if (!mobileDark) errors.push("Mobile: missing dark class on <html>");
  if (mobileLinks === 0)
    errors.push("Mobile: no link buttons rendered");
  if (desktopLinks === 0)
    errors.push("Desktop: no link buttons rendered");
  if (mobileSkeleton > 0)
    errors.push(`Mobile: ${mobileSkeleton} skeletons still present (should be 0)`);

  console.log("\n--- RESULTS ---");
  if (errors.length === 0) {
    console.log("All assertions PASSED");
    console.log(`Screenshots saved to: ${screenshotsDir}`);
    process.exit(0);
  } else {
    console.error("FAILURES:");
    errors.forEach((e) => console.error(`  ✗ ${e}`));
    process.exit(1);
  }

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
