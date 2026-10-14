import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { packages, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Check a date with Rusty Cage Trio for a wedding, private party, winery, or company event. Based in Shoreline, WA. Travel about 50 miles.",
};

export default function ContactPage() {
  return (
    <div className="wrap">
      <header className="page-hero">
        <p className="kicker">Book the date</p>
        <h1>Check your date</h1>
        <p className="lede">
          Tell us the room, the date, and how long you want us. Weddings,
          private parties (birthdays, anniversaries, backyard and house
          parties), wineries, and company events. We answer from{" "}
          <a className="plain-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </header>
      <div className="split band" style={{ alignItems: "start" }}>
        <QuoteForm />
        <aside>
          <p className="kicker">Rates</p>
          <ul className="rate-list">
            {packages.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <strong>{item.price}</strong>
              </li>
            ))}
          </ul>
          <p>
            Travel about {site.travel} from {site.location}. Winter and weekday
            rates are available. Generator if there is no power.
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
