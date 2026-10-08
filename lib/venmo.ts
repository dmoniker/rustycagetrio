import { site } from "@/lib/content";

export const VENMO_USERNAME = site.venmo;
export const REQUEST_AMOUNTS = [5, 10, 20] as const;

/**
 * How long to wait after a venmo:// handoff before opening the website.
 * Cancelled if the page hides, which is what an app switch does.
 * Android intent:// links do not use this; Chrome applies browser_fallback_url.
 */
export const VENMO_APP_FALLBACK_MS = 1500;

export type RequestAmount = (typeof REQUEST_AMOUNTS)[number];

export function formatVenmoAmount(amount: number): string {
  return amount.toFixed(2);
}

export function songRequestNote(song: { title: string; artist: string }): string {
  return `Song Request: ${song.title} — ${song.artist}`;
}

export function tipNote(): string {
  return "Tip — Rusty Cage";
}

function payParams(amount: number, note: string): URLSearchParams {
  return new URLSearchParams({
    txn: "pay",
    amount: formatVenmoAmount(amount),
    note,
  });
}

/**
 * Encode a query the way Venmo's own app-switch code does: percent-encode
 * spaces as %20. URLSearchParams would otherwise emit "+" for spaces.
 */
function appQuery(params: Record<string, string>): string {
  return new URLSearchParams(params).toString().replace(/\+/g, "%20");
}

/**
 * https://venmo.com universal / web pay link.
 * iOS Safari opens the installed app from this URL. Other mobile browsers
 * do not honor that universal link, so they use venmoSchemeUrl / venmoIntentUrl.
 */
export function venmoPayUrl(amount: number, note: string): string {
  return `https://venmo.com/${VENMO_USERNAME}?${payParams(amount, note)}`;
}

/**
 * Custom scheme registered by the Venmo app.
 * `venmo://paycharge` is still in the app binary (public string dump, May 2026).
 * Query shape matches Venmo's published paycharge handler:
 * txn, recipients, amount, note.
 */
export function venmoSchemeUrl(amount: number, note: string): string {
  const query = appQuery({
    txn: "pay",
    recipients: VENMO_USERNAME,
    amount: formatVenmoAmount(amount),
    note,
  });
  return `venmo://paycharge?${query}`;
}

/**
 * Android Chrome / Samsung Internet intent. `browser_fallback_url` is the
 * https pay link, used when the Venmo package is not installed.
 * @see https://developer.chrome.com/docs/android/intents
 */
export function venmoIntentUrl(amount: number, note: string): string {
  const query = appQuery({
    txn: "pay",
    recipients: VENMO_USERNAME,
    amount: formatVenmoAmount(amount),
    note,
  });
  const fallback = encodeURIComponent(venmoPayUrl(amount, note));
  return `intent://paycharge?${query}#Intent;scheme=venmo;package=com.venmo;S.browser_fallback_url=${fallback};end`;
}

/** Web checkout fallback if the profile link does not prefill. */
export function venmoWebPayUrl(amount: number, note: string): string {
  const params = new URLSearchParams({
    txn: "pay",
    audience: "public",
    recipients: VENMO_USERNAME,
    amount: formatVenmoAmount(amount),
    note,
  });
  return `https://account.venmo.com/pay?${params}`;
}

export type VenmoClientHints = {
  userAgent: string;
  platform?: string;
  maxTouchPoints?: number;
};

export type VenmoHandoffMode = "web" | "scheme" | "intent";

const IOS_BROWSER_THAT_SKIPS_UNIVERSAL_LINKS =
  /CriOS|FxiOS|EdgiOS|OPiOS|OPT\/|DuckDuckGo|GSA\/|Brave/i;

const IN_APP_BROWSER =
  /Instagram|FBAN|FBAV|FB_IAB|FB4A|MessengerForiOS|MessengerLiteForiOS|Line\/|Twitter|Snapchat|TikTok|BytedanceWebview|musical_ly|Pinterest|LinkedInApp|MicroMessenger/i;

function isAndroid(userAgent: string): boolean {
  return /Android/i.test(userAgent);
}

function isAppleMobile(hints: VenmoClientHints): boolean {
  const ua = hints.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  // iPadOS reports a desktop Macintosh UA. Touch + MacIntel is the iPad signal.
  const touch = hints.maxTouchPoints ?? 0;
  return touch > 1 && hints.platform === "MacIntel" && /Macintosh/i.test(ua);
}

function isIosSafari(userAgent: string): boolean {
  if (IOS_BROWSER_THAT_SKIPS_UNIVERSAL_LINKS.test(userAgent)) return false;
  if (IN_APP_BROWSER.test(userAgent)) return false;
  return /Safari|Macintosh/i.test(userAgent);
}

/**
 * Pick how this browser should open Venmo.
 * - web: https universal link (Safari, including iPadOS) or desktop web.
 * - scheme: venmo:// for browsers that ignore universal links and don't
 *   implement Android intent URLs (iOS Chrome/Firefox/Edge, in-app browsers,
 *   Android Firefox).
 * - intent: Android Chrome-family browsers, which apply browser_fallback_url.
 */
export function detectVenmoHandoff(hints: VenmoClientHints): VenmoHandoffMode {
  const ua = hints.userAgent || "";
  if (isAndroid(ua)) {
    if (/Firefox\//i.test(ua) && !/Seamonkey/i.test(ua)) return "scheme";
    if (IN_APP_BROWSER.test(ua) || /\bwv\b/.test(ua)) return "scheme";
    return "intent";
  }
  if (isAppleMobile(hints)) {
    return isIosSafari(ua) ? "web" : "scheme";
  }
  return "web";
}

export type VenmoLaunchPlan = {
  mode: VenmoHandoffMode;
  url: string;
  fallbackUrl: string;
};

export function venmoLaunchPlan(
  hints: VenmoClientHints,
  amount: number,
  note: string,
): VenmoLaunchPlan {
  const fallbackUrl = venmoPayUrl(amount, note);
  const mode = detectVenmoHandoff(hints);
  if (mode === "intent") {
    return { mode, url: venmoIntentUrl(amount, note), fallbackUrl };
  }
  if (mode === "scheme") {
    return { mode, url: venmoSchemeUrl(amount, note), fallbackUrl };
  }
  return { mode, url: fallbackUrl, fallbackUrl };
}
