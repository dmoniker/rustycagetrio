import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/content";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rustycageseattle.com"),
  title: {
    default: "Rusty Cage — Seattle acoustic country for private events",
    template: "%s — Rusty Cage",
  },
  description:
    "Shoreline acoustic country trio for weddings, private parties, and corporate events in the Seattle area. Low volume, own PA, 5-by-6 setup. Request a quote.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rusty Cage",
    description: site.tagline,
    url: "https://www.rustycageseattle.com",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/photos/rusty-cage-outdoor.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
