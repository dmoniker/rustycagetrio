import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div>
          <strong>{site.name}</strong>
          <div>
            {site.location} acoustic country · est. {site.formed}
          </div>
          <div>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="socials">
          <a href={site.instagram} rel="noreferrer" target="_blank">
            Instagram
          </a>
          <a href={site.facebook} rel="noreferrer" target="_blank">
            Facebook
          </a>
          <a href={site.youtube} rel="noreferrer" target="_blank">
            YouTube
          </a>
          <a href={site.gigsalad} rel="noreferrer" target="_blank">
            Gig Salad
          </a>
          <Link href="/contact">Quote</Link>
        </div>
      </div>
    </footer>
  );
}
