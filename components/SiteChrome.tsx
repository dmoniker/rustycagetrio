"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const live = pathname === "/live";

  useEffect(() => {
    document.body.classList.toggle("live-hub", live);
    return () => document.body.classList.remove("live-hub");
  }, [live]);

  if (live) {
    return <main className="live-shell">{children}</main>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
