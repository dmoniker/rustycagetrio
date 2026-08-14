import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
  metadataBase: new URL("https://www.rustycagetrio.com"),
  title: {
    default: "Rusty Cage Trio — Seattle acoustic country for private events",
    template: "%s — Rusty Cage Trio",
  },
  description:
    "Shoreline acoustic country trio for weddings, private parties, and corporate events in the Seattle area. Low volume, own PA, 5-by-6 setup. Request a quote.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rusty Cage Trio",
    description: site.tagline,
    url: "https://www.rustycagetrio.com",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/photos/hero.jpeg" }],
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
