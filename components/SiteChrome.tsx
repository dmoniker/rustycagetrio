"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const live = pathname === "/live";

  useEffect(() => {
    document.body.classList.toggle("live-hub", live);
    document.body.classList.toggle(
      "has-mobile-dock",
      !live && pathname !== "/contact",
    );
    return () => {
      document.body.classList.remove("live-hub");
      document.body.classList.remove("has-mobile-dock");
    };
  }, [live, pathname]);

  if (live) {
    return <main className="live-shell">{children}</main>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {pathname !== "/contact" ? (
        <div className="mobile-dock">
          <Link className="btn" href="/contact">
            Check your date
          </Link>
        </div>
      ) : null}
    </>
  );
}
