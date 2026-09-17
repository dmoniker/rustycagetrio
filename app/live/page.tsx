import type { Metadata, Viewport } from "next";
import { LiveHub } from "@/components/LiveHub";
import { setlistSongs, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Live",
  description:
    "Follow Rusty Cage on Facebook for gig updates, then request a song or tip the trio on Venmo.",
  alternates: { canonical: "/live" },
  openGraph: {
    title: "Rusty Cage — live",
    description:
      "Gig updates on Facebook. Request a song or tip via Venmo @rustycageseattle.",
    url: "/live",
  },
};

export const viewport: Viewport = {
  themeColor: "#14110e",
  width: "device-width",
  initialScale: 1,
};

export default function LivePage() {
  return (
    <LiveHub facebook={site.facebook} songs={setlistSongs} />
  );
}
