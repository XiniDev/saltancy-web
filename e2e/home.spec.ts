import { mkdirSync } from "node:fs";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { MOCK_RESEND_KEY, MOCK_RESEND_URL } from "../playwright.config";

const HUB_ON = process.env.SALTANCY_PROJECT_HUB === "on";
const ANALYTICS_TOKEN = process.env.SALTANCY_WEB_ANALYTICS_TOKEN;
const SHOTS = "screenshots";

// Test visits must not count as page views, so the analytics beacon and its reports are stubbed.
test.beforeEach(async ({ page }) => {
  await page.route("https://static.cloudflareinsights.com/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/javascript", body: "" })
  );
  await page.route("https://cloudflareinsights.com/**", (route) => route.fulfill({ status: 204 }));
});

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  return errors;
}

async function open(page: Page) {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
}

async function scrollToY(page: Page, y: number) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
}

/** Scroll in small steps, like a reader, so scroll-driven state updates on the way. */
async function scrollThrough(page: Page, to: number, step = 90) {
  let y = await page.evaluate(() => window.scrollY);
  while (y < to) {
    y = Math.min(to, y + step);
    await scrollToY(page, y);
    await page.waitForTimeout(20);
  }
}

async function streamStats(page: Page) {
  return page.evaluate(() => {
    const canvas = document.querySelector<HTMLCanvasElement>("canvas[data-stream]");
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const data = canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height).data;
    let lit = 0;
    let hash = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 0) lit++;
      hash = (Math.imul(hash, 31) + data[i] + (data[i - 1] << 8)) | 0;
    }
    return {
      css: { width: rect.width, height: rect.height },
      backing: { width: canvas.width, height: canvas.height },
      viewport: { width: window.innerWidth, height: window.innerHeight },
      litPixels: lit,
      hash,
    };
  });
}

async function crystalCells(page: Page) {
  return page.$$eval('[data-stream-anchor="grow"] .grow-cell', (cells) =>
    cells.map((cell) => {
      const m = new DOMMatrix(getComputedStyle(cell).transform);
      return {
        shown: (cell as HTMLElement).dataset.shown === "true",
        scale: Math.round(Math.hypot(m.m11, m.m12, m.m13) * 100) / 100,
      };
    })
  );
}

async function pressedStep(page: Page) {
  return page.$$eval('#approach button[aria-pressed="true"]', (buttons) =>
    buttons.map((b) => b.textContent?.trim())
  );
}

/** Where the process section has finished: the end of its pinned stretch, or its bottom edge. */
async function processEnd(page: Page) {
  return page.evaluate(() => {
    const outer = document.querySelector<HTMLElement>("#approach")!;
    const top = outer.getBoundingClientRect().top + window.scrollY;
    return Math.round(top + outer.offsetHeight - window.innerHeight);
  });
}

async function shoot(page: Page, name: string) {
  mkdirSync(SHOTS, { recursive: true });
  const project = test.info().project.name;
  const path = `${SHOTS}/${project}${HUB_ON ? "-hub-on" : ""}-${name}.png`;
  await page.screenshot({ path });
  return path;
}

test.describe("home page", () => {
  test("sections from the brief, in order, with zero console errors", async ({ page }) => {
    const errors = collectErrors(page);
    await open(page);
    await scrollThrough(page, await page.evaluate(() => document.documentElement.scrollHeight), 400);
    await page.waitForTimeout(500);

    const order = await page.evaluate(() => {
      const ids = [
        "[data-site-header]",
        "section#top",
        "section#services",
        "section#approach",
        "section#hub",
        "section#contact",
        "body footer",
      ];
      const found = ids
        .map((sel) => ({ sel, el: document.querySelector(sel) }))
        .filter((x): x is { sel: string; el: Element } => !!x.el);
      found.sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      return found.map((x) => x.sel);
    });

    const expected = [
      "[data-site-header]",
      "section#top",
      "section#services",
      "section#approach",
      ...(HUB_ON ? ["section#hub"] : []),
      "section#contact",
      "body footer",
    ];
    console.log(`  order: ${order.join(" > ")}`);
    expect(order).toEqual(expected);

    // The final copy, section by section.
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Software worth its salt.");
    await expect(page.locator("#top")).toContainText("Saltancy designs and builds web apps, backends and mobile apps");
    await expect(page.locator("#services h2")).toHaveText("Three things, done properly.");
    await expect(page.locator("#services h3")).toHaveText(["Web applications", "Backend systems", "Mobile apps"]);
    await expect(page.locator("#approach h2")).toHaveText("Built one layer at a time.");
    await expect(page.locator("#approach button")).toHaveText(["01Discover", "02Build", "03Ship", "04Look after"]);
    await expect(page.locator("#contact h2")).toHaveText("Got somethingto build?");
    await expect(page.locator("footer")).toContainText(
      "A small technical consultancy building web, backend and mobile software."
    );
    await expect(page.locator("footer")).toContainText(`© ${new Date().getFullYear()} Saltancy`);

    console.log(`  console errors: ${errors.length}`);
    expect(errors).toEqual([]);
  });

  test("light stream: viewport-sized canvas, drawing", async ({ page }) => {
    await open(page);
    const stats = await streamStats(page);
    expect(stats).not.toBeNull();
    const s = stats!;
    console.log(
      `  canvas css ${s.css.width}x${s.css.height}, backing ${s.backing.width}x${s.backing.height}, ` +
        `viewport ${s.viewport.width}x${s.viewport.height}, lit pixels ${s.litPixels}`
    );
    expect(s.css.width).toBeLessThanOrEqual(s.viewport.width);
    expect(s.css.height).toBeLessThanOrEqual(s.viewport.height);
    expect(s.backing.width * s.backing.height).toBeLessThanOrEqual(3.2e6 + s.backing.width);
    expect(s.litPixels).toBeGreaterThan(5000);

    // It animates: two samples a moment apart differ.
    await page.waitForTimeout(300);
    const later = await streamStats(page);
    expect(later!.hash).not.toBe(s.hash);

    await shoot(page, "01-hero");
  });

  test("process: scrolling through grows the crystal to step 04 with all 8 cubes", async ({ page }) => {
    await open(page);
    await shoot(page, "00-top");

    const services = await page.evaluate(
      () => document.querySelector<HTMLElement>("#services")!.getBoundingClientRect().top + window.scrollY - 40
    );
    await scrollThrough(page, services);
    await page.waitForTimeout(600);
    await shoot(page, "02-services");

    const start = await page.evaluate(
      () => document.querySelector<HTMLElement>("#approach")!.getBoundingClientRect().top + window.scrollY
    );
    await scrollThrough(page, start);
    await page.waitForTimeout(1300);
    console.log(`  at section start: pressed ${JSON.stringify(await pressedStep(page))}`);
    expect(await pressedStep(page)).toEqual(["01Discover"]);
    expect((await crystalCells(page)).filter((c) => c.scale === 1).length).toBe(1);
    await shoot(page, "03-process-step1");

    await scrollThrough(page, await processEnd(page));
    await page.waitForTimeout(1500);
    const cells = await crystalCells(page);
    const pinned = await page.getAttribute("#approach", "data-pinned");
    console.log(
      `  after scrolling through (pinned=${pinned}): pressed ${JSON.stringify(await pressedStep(page))}, ` +
        `cubes shown ${cells.filter((c) => c.shown).length}/8, scales ${cells.map((c) => c.scale).join(",")}`
    );
    expect(await pressedStep(page)).toEqual(["04Look after"]);
    expect(cells).toHaveLength(8);
    expect(cells.every((c) => c.shown && c.scale === 1)).toBe(true);
    const stream = await streamStats(page);
    expect(stream!.litPixels).toBeGreaterThan(5000);
    await shoot(page, "04-process-step4");

    // Steps are buttons too: click and keyboard.
    await page.locator("#approach button", { hasText: "Build" }).click();
    await page.waitForTimeout(1300);
    expect(await pressedStep(page)).toEqual(["02Build"]);
    expect((await crystalCells(page)).filter((c) => c.scale === 1).length).toBe(2);
    await page.locator("#approach button", { hasText: "Ship" }).focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1300);
    expect(await pressedStep(page)).toEqual(["03Ship"]);
    expect((await crystalCells(page)).filter((c) => c.scale === 1).length).toBe(4);

    const end = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    if (HUB_ON) {
      const hub = await page.evaluate(
        () => document.querySelector<HTMLElement>("#hub")!.getBoundingClientRect().top + window.scrollY
      );
      await scrollThrough(page, hub);
      await page.waitForTimeout(600);
      await shoot(page, "05-hub");
    }
    const contact = await page.evaluate(
      () => document.querySelector<HTMLElement>("#contact")!.getBoundingClientRect().top + window.scrollY - 60
    );
    await scrollThrough(page, contact);
    await page.waitForTimeout(600);
    await shoot(page, "06-start");
    await scrollThrough(page, end);
    await page.waitForTimeout(600);
    await shoot(page, "07-footer");
  });

  test("reduced motion: a still frame and no running animations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await open(page);

    const running = await page.evaluate(
      () => document.getAnimations().filter((a) => a.playState === "running").length
    );
    const first = await streamStats(page);
    await page.waitForTimeout(800);
    const second = await streamStats(page);
    console.log(
      `  running animations ${running}; stream lit ${first!.litPixels}, ` +
        `frame unchanged after 800ms: ${first!.hash === second!.hash}`
    );
    expect(running).toBe(0);
    expect(first!.litPixels).toBeGreaterThan(5000);
    expect(second!.hash).toBe(first!.hash);

    // Steps show without animation: complete crystal, nothing pinned.
    await scrollThrough(page, await processEnd(page), 300);
    await page.waitForTimeout(300);
    expect(await page.getAttribute("#approach", "data-pinned")).toBe("false");
    expect((await crystalCells(page)).every((c) => c.scale === 1)).toBe(true);
    expect(
      await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length)
    ).toBe(0);
    await shoot(page, "08-reduced-motion-process");
  });

  test("accessibility: no serious or critical axe violations", async ({ page }) => {
    await open(page);
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    const summary = results.violations.map((v) => `${v.id}(${v.impact}, ${v.nodes.length})`);
    console.log(`  axe: ${results.passes.length} rules pass; violations: ${summary.length ? summary.join(" ") : "none"}`);
    for (const v of blocking) {
      console.log(`  ${v.id}: ${v.help}\n    ${v.nodes.map((n) => n.target.join(" ")).join("\n    ")}`);
    }
    expect(blocking).toEqual([]);
  });

  test(`project hub flag (${HUB_ON ? "on" : "off"}): hub section and sign-in links`, async ({ page }) => {
    await open(page);
    const counts = {
      hubSection: await page.locator("section#hub").count(),
      signInLinks: await page.locator("[data-signin]").count(),
      signInText: await page.getByText("Client sign in").count(),
      hubNavLinks: await page.locator('a[href$="#hub"]').count(),
    };
    console.log(`  flag ${HUB_ON ? "ON" : "OFF"}: ${JSON.stringify(counts)}`);
    if (HUB_ON) {
      expect(counts.hubSection).toBe(1);
      expect(counts.signInLinks).toBeGreaterThan(0);
      expect(counts.hubNavLinks).toBeGreaterThan(0);
      await expect(page.locator("#hub figure figcaption")).toHaveText(/Example of the project hub/);
    } else {
      expect(counts).toEqual({ hubSection: 0, signInLinks: 0, signInText: 0, hubNavLinks: 0 });
    }
  });

  test(`analytics beacon (${ANALYTICS_TOKEN ? "token set" : "no token"}): ships only with a site token`, async ({
    page,
  }) => {
    await open(page);
    const beacons = await page.$$eval('script[src="https://static.cloudflareinsights.com/beacon.min.js"]', (els) =>
      els.map((el) => ({ defer: (el as HTMLScriptElement).defer, config: el.getAttribute("data-cf-beacon") }))
    );
    console.log(`  beacons: ${beacons.length}`);
    if (ANALYTICS_TOKEN) {
      expect(beacons).toEqual([{ defer: true, config: JSON.stringify({ token: ANALYTICS_TOKEN }) }]);
    } else {
      expect(beacons).toEqual([]);
    }
  });
});

test.describe("contact form", () => {
  test.skip(!!process.env.E2E_BASE_URL, "A deployed site sends real email; only local sites use the mock Resend API.");

  async function submit(page: Page) {
    await open(page);
    await page.locator("#top button", { hasText: "Start a project" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.locator("#name").fill("Test Lead");
    await dialog.locator("#email").fill("lead@example.com");
    await dialog.locator("#message").fill("An end-to-end check of the contact form.");
    await dialog.getByRole("button", { name: "Send message" }).click();
    return dialog;
  }

  test("a lead goes out through Resend, and a refused send says so", async ({ page, request }) => {
    await request.post(`${MOCK_RESEND_URL}/__mock`, { data: { refuse: false } });
    const dialog = await submit(page);
    await expect(dialog.getByRole("status")).toContainText("You're in.");

    const { sent } = await (await request.get(`${MOCK_RESEND_URL}/__mock`)).json();
    console.log(`  sent: ${JSON.stringify(sent.map((s: { body: { subject: string } }) => s.body.subject))}`);
    expect(sent).toHaveLength(1);
    expect(sent[0].authorization).toBe(`Bearer ${MOCK_RESEND_KEY}`);
    expect(sent[0].body).toMatchObject({
      from: "Saltancy Website <info@saltancy.com>",
      to: expect.stringContaining("@"),
      subject: "New Consultancy Lead from Test Lead",
      text: "Name: Test Lead\nEmail: lead@example.com\n\nMessage:\nAn end-to-end check of the contact form.",
    });

    // Resend refusing the send (say, the domain lost its verification) must not read as success.
    await request.post(`${MOCK_RESEND_URL}/__mock`, { data: { refuse: true } });
    const refused = await submit(page);
    await expect(refused.getByText("Something didn't connect. Please try again in a moment.")).toBeVisible();
    await expect(refused.getByRole("status")).toHaveCount(0);
    expect((await (await request.get(`${MOCK_RESEND_URL}/__mock`)).json()).sent).toHaveLength(1);
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the page is complete and readable", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Software worth its salt.");
    for (const id of ["top", "services", "approach", "contact"]) {
      await expect(page.locator(`section#${id}`)).toBeVisible();
    }
    // Every step reads as active and the crystal is complete.
    const cells = await page.$$eval('[data-stream-anchor="grow"] .grow-cell', (els) =>
      els.map((e) => (e as HTMLElement).dataset.shown)
    );
    expect(cells).toEqual(Array(8).fill("true"));
    // Controls that need JavaScript give way to plain links.
    await expect(page.locator("#top a", { hasText: "Start a project" })).toBeVisible();
    await expect(page.locator("#top button", { hasText: "Start a project" })).toBeHidden();
    await expect(page.locator("#contact a[href^='mailto:'], #contact a[href='/#contact']").first()).toBeVisible();
    await shoot(page, "09-no-js");
  });
});
