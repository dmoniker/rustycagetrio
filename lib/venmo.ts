import { site } from "@/lib/content";

export const VENMO_USERNAME = site.venmo;
export const REQUEST_AMOUNTS = [5, 10, 20] as const;

export type RequestAmount = (typeof REQUEST_AMOUNTS)[number];

export function formatVenmoAmount(amount: number): string {
  return amount.toFixed(2);
}

export function songRequestNote(title: string, artist = ""): string {
  const song = title.trim();
  const who = artist.trim();
  if (!song) return "";
  return who ? `Song Request: ${song} — ${who}` : `Song Request: ${song}`;
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
 * https://venmo.com universal / web pay link.
 * Opens the Venmo app on iOS/Android when installed; otherwise the site.
 */
export function venmoPayUrl(amount: number, note: string): string {
  return `https://venmo.com/${VENMO_USERNAME}?${payParams(amount, note)}`;
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
