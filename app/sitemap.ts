import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rustycagetrio.com";
  return ["", "/songs", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-08-14"),
  }));
}
