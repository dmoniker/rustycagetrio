"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/songs", label: "Songs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Request a quote" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="wordmark" href="/">
          Rusty Cage <span>Trio</span>
        </Link>
        <nav aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
