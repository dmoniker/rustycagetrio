import type { Metadata } from "next";
import Link from "next/link";
import { ShowsList } from "@/components/ShowsList";

export const metadata: Metadata = {
  title: "Shows",
  description:
    "Upcoming public shows from Rusty Cage — acoustic country in the Seattle area.",
};

export default function ShowsPage() {
  return (
    <div className="wrap">
      <header className="page-hero">
        <p className="kicker">On the calendar</p>
        <h1>Upcoming shows</h1>
        <p className="lede">
          Confirmed public nights. For a wedding, private party, winery, or
          company event, check a date instead.
        </p>
      </header>
      <ShowsList />
      <p style={{ margin: "2rem 0 3rem" }}>
        <Link className="btn" href="/contact">
          Check your date
        </Link>
      </p>
    </div>
  );
}
