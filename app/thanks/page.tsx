import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thanks",
  description: "Your quote request reached Rusty Cage Trio.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <div className="wrap">
      <header className="page-hero">
        <p className="kicker">Received</p>
        <h1>We have the note.</h1>
      </header>
      <div className="thanks-card">
        <p>
          Your quote request is in. We will write back from {site.email} with
          availability and a clear number.
        </p>
        <p>
          If you do not see a reply in a day or two, send the same details
          straight to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p>
          <Link className="btn" href="/">
            Back to the front porch
          </Link>
        </p>
      </div>
    </div>
  );
}
