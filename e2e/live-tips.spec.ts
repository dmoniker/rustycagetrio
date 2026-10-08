import {
  devices,
  expect,
  test,
  type Browser,
  type Page,
} from "@playwright/test";

/**
 * Device emulation checks the URL each tip button would open.
 * Playwright cannot install the Venmo app, so a real handoff still has to be
 * tapped through on a phone. Scheme and intent clicks are cancelled via the
 * venmohandoff event unless a test opts into real navigation.
 */

const TIP_NOTE = "Tip \u2014 Rusty Cage";
// Keep in sync with VENMO_APP_FALLBACK_MS in lib/venmo.ts.
const FALLBACK_MS = 1500;
const AMOUNTS = [5, 10, 20] as const;

type Handoff = {
  url: string;
  mode: "web" | "scheme" | "intent" | "fallback";
};

type Device = (typeof devices)["Desktop Chrome"];

const CHROME_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.73 Mobile/15E148 Safari/604.1";
const FIREFOX_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/131.0 Mobile/15E148 Safari/605.1.15";
const EDGE_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/131.0.2903.48 Mobile/15E148 Safari/604.1";
const INSTAGRAM_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0.0.0";
const FACEBOOK_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/450.0.0.0.0;]";
const SAMSUNG_ANDROID =
  "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/26.0 Chrome/122.0.6261.119 Mobile Safari/537.36";
const EDGE_ANDROID =
  "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 EdgA/131.0.0.0";
const FIREFOX_ANDROID =
  "Mozilla/5.0 (Android 14; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0";
const INSTAGRAM_ANDROID =
  "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.0.0 Mobile Safari/537.36 Instagram 350.0.0.0.0";
const FACEBOOK_ANDROID =
  "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/450.0.0.0.0;]";

function expectWebPay(url: string, amount: number, note: string) {
  const parsed = new URL(url);
  expect(parsed.protocol).toBe("https:");
  expect(parsed.host).toBe("venmo.com");
  expect(parsed.pathname).toBe("/rustycageseattle");
  expect(parsed.searchParams.get("txn")).toBe("pay");
  expect(parsed.searchParams.get("amount")).toBe(amount.toFixed(2));
  expect(parsed.searchParams.get("note")).toBe(note);
}

function expectScheme(url: string, amount: number, note: string) {
  const parsed = new URL(url);
  expect(parsed.protocol).toBe("venmo:");
  expect(parsed.hostname).toBe("paycharge");
  expect(parsed.searchParams.get("txn")).toBe("pay");
  expect(parsed.searchParams.get("recipients")).toBe("rustycageseattle");
  expect(parsed.searchParams.get("amount")).toBe(amount.toFixed(2));
  expect(parsed.searchParams.get("note")).toBe(note);
}

function expectIntent(url: string, amount: number, note: string) {
  expect(url.startsWith("intent://paycharge?")).toBe(true);
  expect(url).toContain("scheme=venmo;");
  expect(url).toContain("package=com.venmo;");
  const parsed = new URL(url);
  expect(parsed.protocol).toBe("intent:");
  expect(parsed.hostname).toBe("paycharge");
  expect(parsed.searchParams.get("txn")).toBe("pay");
  expect(parsed.searchParams.get("recipients")).toBe("rustycageseattle");
  expect(parsed.searchParams.get("amount")).toBe(amount.toFixed(2));
  expect(parsed.searchParams.get("note")).toBe(note);
  const match = url.match(/S\.browser_fallback_url=([^;]*);end$/);
  expect(match, url).not.toBeNull();
  expectWebPay(decodeURIComponent(match![1]), amount, note);
}

async function openLive(
  browser: Browser,
  device: Device,
  options?: { userAgent?: string; block?: boolean; clock?: boolean; ipad?: boolean },
) {
  const context = await browser.newContext({
    ...device,
    userAgent: options?.userAgent ?? device.userAgent,
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const handoffs: Handoff[] = [];
  await page.exposeFunction(
    "__recordVenmoHandoff",
    (detail: Handoff) => {
      handoffs.push(detail);
    },
  );
  await page.addInitScript((block: boolean) => {
    document.addEventListener("venmohandoff", (event) => {
      const custom = event as CustomEvent<Handoff>;
      void (
        window as unknown as {
          __recordVenmoHandoff: (detail: Handoff) => void;
        }
      ).__recordVenmoHandoff(custom.detail);
      if (block) event.preventDefault();
    });
  }, options?.block ?? false);
  if (options?.ipad) {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "platform", {
        configurable: true,
        get: () => "MacIntel",
      });
      Object.defineProperty(navigator, "maxTouchPoints", {
        configurable: true,
        get: () => 5,
      });
    });
  }
  await page.goto("/live");
  await expect(
    page.getByRole("link", { name: "Tip $5 via Venmo" }),
  ).toBeVisible();
  if (options?.clock) await page.clock.install();
  return { context, page, errors, handoffs };
}

async function restingHrefs(page: Page, note: string) {
  for (const amount of AMOUNTS) {
    const link = page.getByRole("link", {
      name: `${note === TIP_NOTE ? "Tip" : "Request"} $${amount} via Venmo`,
    });
    const href = await link.getAttribute("href");
    expect(href, `resting href for $${amount}`).toBeTruthy();
    expectWebPay(href!, amount, note);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveText(`$${amount}`);
  }
}

async function takeHandoff(
  page: Page,
  handoffs: Handoff[],
  amount: number,
  action: "Tip" | "Request",
) {
  const before = handoffs.length;
  await page.getByRole("link", { name: `${action} $${amount} via Venmo` }).click();
  await expect.poll(() => handoffs.length, { timeout: 5_000 }).toBeGreaterThan(before);
  return handoffs[before];
}

async function expectNoErrors(errors: string[]) {
  expect(errors).toEqual([]);
}

test.describe("iPhone Safari and other iOS browsers", () => {
  test.beforeEach(({ browserName }) => {
    test.skip(browserName !== "webkit", "iOS cases run in WebKit");
  });

  test("Safari keeps the https universal link, copy, and above-the-fold tips", async ({
    browser,
  }) => {
    const { context, page, errors, handoffs } = await openLive(
      browser,
      devices["iPhone 13"],
      { block: false },
    );

    await expect(page.locator(".live-note")).toHaveText(
      "Tip only \u2022 no request (tap song to request)",
    );
    await expect(
      page.getByRole("link", { name: "Gig updates · Follow on Facebook" }),
    ).toBeVisible();
    await restingHrefs(page, TIP_NOTE);

    const box = await page.locator(".live-amounts").boundingBox();
    const viewport = page.viewportSize();
    expect(box).not.toBeNull();
    expect(viewport).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height + 1);

    await page.getByRole("searchbox", { name: "Search" }).fill("jolene");
    await expect(page.getByRole("button", { name: /Jolene/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Ring of Fire/ })).toHaveCount(0);
    await page.getByRole("searchbox", { name: "Search" }).fill("");

    for (const amount of AMOUNTS) {
      const requested: string[] = [];
      const onRequest = (request: { url: () => string }) => {
        if (request.url().includes("venmo.com/rustycageseattle")) {
          requested.push(request.url());
        }
      };
      context.on("request", onRequest);
      const popupPromise = page.waitForEvent("popup");
      const handoff = await takeHandoff(page, handoffs, amount, "Tip");
      const popup = await popupPromise;
      expect(handoff.mode).toBe("web");
      expectWebPay(handoff.url, amount, TIP_NOTE);
      await expect.poll(() => requested.length).toBeGreaterThan(0);
      expectWebPay(requested[0], amount, TIP_NOTE);
      await popup.close();
      context.off("request", onRequest);
    }

    await page.getByRole("button", { name: "Jolene Dolly Parton" }).click();
    await expect(page.locator(".live-note")).toHaveText("Request: Jolene");
    await restingHrefs(page, "Song Request: Jolene \u2014 Dolly Parton");
    const requested: string[] = [];
    context.on("request", (request) => {
      if (request.url().includes("venmo.com/rustycageseattle")) {
        requested.push(request.url());
      }
    });
    const popupPromise = page.waitForEvent("popup");
    const handoff = await takeHandoff(page, handoffs, 10, "Request");
    await popupPromise;
    expect(handoff.mode).toBe("web");
    expectWebPay(handoff.url, 10, "Song Request: Jolene \u2014 Dolly Parton");
    await expect.poll(() => requested.length).toBeGreaterThan(0);
    expectWebPay(requested[0], 10, "Song Request: Jolene \u2014 Dolly Parton");

    await expectNoErrors(errors);
    await context.close();
  });

  test("Chrome, Firefox, Edge, Instagram, and Facebook use venmo://", async ({
    browser,
  }) => {
    const browsers = [
      ["iOS Chrome", CHROME_IOS],
      ["iOS Firefox", FIREFOX_IOS],
      ["iOS Edge", EDGE_IOS],
      ["iOS Instagram", INSTAGRAM_IOS],
      ["iOS Facebook", FACEBOOK_IOS],
    ] as const;

    for (const [name, userAgent] of browsers) {
      const { context, page, errors, handoffs } = await openLive(
        browser,
        devices["iPhone 13"],
        { userAgent, block: true, clock: true },
      );
      await restingHrefs(page, TIP_NOTE);
      for (const amount of AMOUNTS) {
        const handoff = await takeHandoff(page, handoffs, amount, "Tip");
        expect(handoff.mode, name).toBe("scheme");
        expectScheme(handoff.url, amount, TIP_NOTE);
        await expect(page).toHaveURL(/\/live$/);
      }
      await expectNoErrors(errors);
      await context.close();
    }
  });

  test("iOS Chrome follows the venmo:// anchor", async ({ browser }) => {
    const { context, page, errors, handoffs } = await openLive(
      browser,
      devices["iPhone 13"],
      { userAgent: CHROME_IOS, block: false, clock: true },
    );
    const requests: string[] = [];
    page.on("request", (request) => requests.push(request.url()));
    page.on("framenavigated", (frame) => {
      if (frame === page.mainFrame()) requests.push(frame.url());
    });
    const link = page.getByRole("link", { name: "Tip $10 via Venmo" });
    await link.click();
    await expect.poll(() => handoffs.length).toBeGreaterThan(0);
    expect(handoffs[0].mode).toBe("scheme");
    expectScheme(handoffs[0].url, 10, TIP_NOTE);
    await expect(link).toHaveAttribute("href", handoffs[0].url);
    await expect(link).not.toHaveAttribute("target", "_blank");
    expect(requests.some((url) => url.startsWith("venmo://paycharge?"))).toBe(true);
    await expect(page).toHaveURL(/\/live$/);
    await expectNoErrors(errors);
    await context.close();
  });

  test("iOS Chrome falls back to the https pay link when the app does not open", async ({
    browser,
  }) => {
    const { context, page, errors, handoffs } = await openLive(
      browser,
      devices["iPhone 13"],
      { userAgent: CHROME_IOS, block: true, clock: true },
    );
    const handoff = await takeHandoff(page, handoffs, 20, "Tip");
    expectScheme(handoff.url, 20, TIP_NOTE);
    await page.clock.fastForward(FALLBACK_MS);
    await expect.poll(() => handoffs.length).toBe(2);
    expect(handoffs[1].mode).toBe("fallback");
    expectWebPay(handoffs[1].url, 20, TIP_NOTE);
    await expect(page).toHaveURL(/\/live$/);
    await expectNoErrors(errors);
    await context.close();
  });

  test("iOS Chrome fallback navigates the page to the https pay link", async ({
    browser,
  }) => {
    const { context, page, errors } = await openLive(browser, devices["iPhone 13"], {
      userAgent: CHROME_IOS,
      block: false,
      clock: true,
    });
    const webRequest = page.waitForRequest(
      (request) =>
        request.url().includes("venmo.com/rustycageseattle") &&
        request.url().includes("amount=5.00"),
    );
    await page.getByRole("link", { name: "Tip $5 via Venmo" }).click();
    await page.clock.fastForward(FALLBACK_MS);
    const request = await webRequest;
    expectWebPay(request.url(), 5, TIP_NOTE);
    await expectNoErrors(errors);
    await context.close();
  });

  test("hiding the page cancels the iOS Chrome web fallback", async ({
    browser,
  }) => {
    const { context, page, errors, handoffs } = await openLive(
      browser,
      devices["iPhone 13"],
      { userAgent: CHROME_IOS, block: true, clock: true },
    );
    await takeHandoff(page, handoffs, 5, "Tip");
    await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
    await page.clock.fastForward(FALLBACK_MS + 1000);
    await page.waitForTimeout(50);
    expect(handoffs.map((item) => item.mode)).toEqual(["scheme"]);
    await expectNoErrors(errors);
    await context.close();
  });

  test("iPadOS desktop UA is detected from touch and platform", async ({
    browser,
  }) => {
    const ipadChrome =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.73 Safari/605.1.15";
    const ipadSafari =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";

    const chromeSession = await openLive(browser, devices["iPhone 13"], {
      userAgent: ipadChrome,
      block: true,
      ipad: true,
    });
    const chrome = await takeHandoff(chromeSession.page, chromeSession.handoffs, 5, "Tip");
    expect(chrome.mode).toBe("scheme");
    expectScheme(chrome.url, 5, TIP_NOTE);
    await expectNoErrors(chromeSession.errors);
    await chromeSession.context.close();

    const safariSession = await openLive(browser, devices["iPhone 13"], {
      userAgent: ipadSafari,
      block: true,
      ipad: true,
    });
    const safari = await takeHandoff(safariSession.page, safariSession.handoffs, 10, "Tip");
    expect(safari.mode).toBe("web");
    expectWebPay(safari.url, 10, TIP_NOTE);
    await expectNoErrors(safariSession.errors);
    await safariSession.context.close();
  });
});

test.describe("Android and desktop", () => {
  test.beforeEach(({ browserName }) => {
    test.skip(browserName !== "chromium", "Android and desktop run in Chromium");
  });

  test("desktop opens the https pay link in a new tab", async ({ browser }) => {
    const { context, page, errors, handoffs } = await openLive(
      browser,
      devices["Desktop Chrome"],
      { block: false },
    );
    await restingHrefs(page, TIP_NOTE);

    for (const amount of AMOUNTS) {
      const requested: string[] = [];
      const onRequest = (request: { url: () => string }) => {
        if (request.url().includes("venmo.com/rustycageseattle")) {
          requested.push(request.url());
        }
      };
      context.on("request", onRequest);
      const popupPromise = page.waitForEvent("popup");
      const handoff = await takeHandoff(page, handoffs, amount, "Tip");
      const popup = await popupPromise;
      expect(handoff.mode).toBe("web");
      expectWebPay(handoff.url, amount, TIP_NOTE);
      await expect.poll(() => requested.length).toBeGreaterThan(0);
      expectWebPay(requested[0], amount, TIP_NOTE);
      expect(popup.url()).toContain("venmo.com");
      await popup.close();
      context.off("request", onRequest);
    }

    await page.getByRole("button", { name: /Boot Scootin/ }).click();
    const title = await page.locator("button.is-selected span").innerText();
    const artist = await page.locator("button.is-selected em").innerText();
    const note = `Song Request: ${title} \u2014 ${artist}`;
    await restingHrefs(page, note);
    const requested: string[] = [];
    context.on("request", (request) => {
      if (request.url().includes("venmo.com/rustycageseattle")) requested.push(request.url());
    });
    const popupPromise = page.waitForEvent("popup");
    const handoff = await takeHandoff(page, handoffs, 5, "Request");
    await popupPromise;
    expectWebPay(handoff.url, 5, note);
    await expect.poll(() => requested.length).toBeGreaterThan(0);
    expectWebPay(requested[0], 5, note);
    expect(note).toContain("Brooks & Dunn");

    const link = page.getByRole("link", { name: "Request $10 via Venmo" });
    const href = await link.getAttribute("href");
    const before = handoffs.length;
    await link.click({ modifiers: ["Control"] });
    await expect(link).toHaveAttribute("href", href!);
    await expect(link).toHaveAttribute("target", "_blank");
    expect(handoffs.length).toBe(before);

    await expectNoErrors(errors);
    await context.close();
  });

  test("Pixel Chrome, Samsung Internet, and Edge use an Android intent", async ({
    browser,
  }) => {
    const cases: { name: string; device: Device; userAgent?: string }[] = [
      { name: "Android Chrome", device: devices["Pixel 7"] },
      {
        name: "Samsung Internet",
        device: devices["Pixel 7"],
        userAgent: SAMSUNG_ANDROID,
      },
      {
        name: "Edge Android",
        device: devices["Pixel 7"],
        userAgent: EDGE_ANDROID,
      },
    ];

    for (const item of cases) {
      const { context, page, errors, handoffs } = await openLive(
        browser,
        item.device,
        { userAgent: item.userAgent, block: true, clock: true },
      );
      await restingHrefs(page, TIP_NOTE);
      for (const amount of AMOUNTS) {
        const handoff = await takeHandoff(page, handoffs, amount, "Tip");
        expect(handoff.mode, item.name).toBe("intent");
        expectIntent(handoff.url, amount, TIP_NOTE);
      }
      await page.getByRole("button", { name: "Jolene Dolly Parton" }).click();
      const note = "Song Request: Jolene \u2014 Dolly Parton";
      const handoff = await takeHandoff(page, handoffs, 10, "Request");
      expect(handoff.mode, item.name).toBe("intent");
      expectIntent(handoff.url, 10, note);
      await page.clock.fastForward(FALLBACK_MS + 1000);
      await page.waitForTimeout(50);
      expect(handoffs.some((entry) => entry.mode === "fallback"), item.name).toBe(false);
      await expect(page).toHaveURL(/\/live$/);
      await expectNoErrors(errors);
      await context.close();
    }
  });

  test("Android Firefox, Instagram, and Facebook use venmo:// plus https fallback", async ({
    browser,
  }) => {
    const browsers = [
      ["Android Firefox", FIREFOX_ANDROID],
      ["Android Instagram", INSTAGRAM_ANDROID],
      ["Android Facebook", FACEBOOK_ANDROID],
    ] as const;

    for (const [name, userAgent] of browsers) {
      const { context, page, errors, handoffs } = await openLive(
        browser,
        devices["Pixel 7"],
        { userAgent, block: true, clock: true },
      );
      const handoff = await takeHandoff(page, handoffs, 5, "Tip");
      expect(handoff.mode, name).toBe("scheme");
      expectScheme(handoff.url, 5, TIP_NOTE);
      await page.clock.fastForward(FALLBACK_MS);
      await expect.poll(() => handoffs.length).toBe(2);
      expect(handoffs[1].mode).toBe("fallback");
      expectWebPay(handoffs[1].url, 5, TIP_NOTE);
      await expectNoErrors(errors);
      await context.close();
    }
  });

  test("Pixel Chrome follows the intent anchor, including the #Intent fragment", async ({
    browser,
  }) => {
    const { context, page, errors, handoffs } = await openLive(
      browser,
      devices["Pixel 7"],
      { block: false },
    );
    const requests: string[] = [];
    page.on("request", (request) => requests.push(request.url()));
    const link = page.getByRole("link", { name: "Tip $5 via Venmo" });
    await link.click();
    await expect.poll(() => handoffs.length).toBeGreaterThan(0);
    expect(handoffs[0].mode).toBe("intent");
    expectIntent(handoffs[0].url, 5, TIP_NOTE);
    await expect(link).toHaveAttribute("href", handoffs[0].url);
    expect(requests.some((url) => url.startsWith("intent://paycharge?"))).toBe(true);
    await expect(page).toHaveURL(/\/live$/);
    await expectNoErrors(errors);
    await context.close();
  });
});
