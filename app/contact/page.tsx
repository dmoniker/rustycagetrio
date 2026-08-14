import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Ask Rusty Cage Trio for a wedding, private party, or corporate date in the Seattle area.",
};

export default function ContactPage() {
  return (
    <div className="wrap">
      <header className="page-hero">
        <p className="kicker">Book the date</p>
        <h1>Request a quote</h1>
        <p className="lede">
          Tell us the room, the date, and how long you want us. We answer from{" "}
          <a className="plain-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </header>
      <div className="split band" style={{ alignItems: "start" }}>
        <QuoteForm />
        <aside>
          <p className="kicker">Direct</p>
          <p className="plain-email">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            Cocktail hour from $900. Wedding / private party $1,350. Corporate
            / special event $1,750. Travel ~200 miles. Generator if there is no
            power.
          </p>
          <p>
            Prefer a marketplace listing?{" "}
            <a href={site.gigsalad} rel="noreferrer" target="_blank">
              Gig Salad
            </a>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
