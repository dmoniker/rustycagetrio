import { VENMO_APP_FALLBACK_MS, type VenmoLaunchPlan } from "@/lib/venmo";

export const VENMO_HANDOFF_EVENT = "venmohandoff";

export type VenmoHandoffDetail = {
  url: string;
  mode: VenmoLaunchPlan["mode"] | "fallback";
};

/**
 * Returns false when a listener called preventDefault. Tests use that to
 * record the URL without leaving the page. Production has no listener.
 */
function dispatchHandoff(detail: VenmoHandoffDetail): boolean {
  const event = new CustomEvent<VenmoHandoffDetail>(VENMO_HANDOFF_EVENT, {
    cancelable: true,
    detail,
  });
  return document.dispatchEvent(event);
}

let cancelPendingFallback: (() => void) | undefined;

/**
 * If the custom scheme does not switch apps, the document stays visible and
 * we open the https pay link. An app switch hides the page (visibilitychange
 * or pagehide) and cancels this so we don't also load the website.
 */
function armWebFallback(fallbackUrl: string): void {
  cancelPendingFallback?.();

  let pending = true;
  const timer = window.setTimeout(() => {
    const stillHere = pending && document.visibilityState !== "hidden";
    cancel();
    if (!stillHere) return;
    if (dispatchHandoff({ url: fallbackUrl, mode: "fallback" })) {
      window.location.assign(fallbackUrl);
    }
  }, VENMO_APP_FALLBACK_MS);

  function cancel() {
    if (!pending) return;
    pending = false;
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", onPageHide);
    if (cancelPendingFallback === cancel) cancelPendingFallback = undefined;
  }

  function onVisibility() {
    if (document.visibilityState === "hidden") cancel();
  }

  function onPageHide() {
    cancel();
  }

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onPageHide);
  cancelPendingFallback = cancel;
}

/**
 * Point the tapped anchor at the platform-specific Venmo URL before the
 * browser follows it. Returns false when navigation should be cancelled.
 * Scheme handoffs also arm an https fallback for when the app is missing.
 */
export function handoffVenmoClick(
  link: HTMLAnchorElement,
  plan: VenmoLaunchPlan,
): boolean {
  if (plan.mode !== "web") {
    link.setAttribute("href", plan.url);
    link.removeAttribute("target");
    if (plan.mode === "scheme") armWebFallback(plan.fallbackUrl);
  }
  return dispatchHandoff({ url: plan.url, mode: plan.mode });
}
