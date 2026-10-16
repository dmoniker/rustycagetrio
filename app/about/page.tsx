import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rusty Cage is based in Shoreline, WA. Acoustic country for weddings, private parties, wineries, and company events. Travel throughout Washington and the Northwest.",
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <header className="page-hero">
        <p className="kicker">
          {site.location}, {site.formed}
        </p>
        <h1>A porch band that can hold a room</h1>
        <p className="lede">
          Rusty Cage is based in {site.location}. Formed in {site.formed}.
          Vocals, guitar, harmonica, bass, and drums — played at conversation
          volume, with enough body to fill a hall.
        </p>
      </header>

      <section className="split band">
        <figure className="frame">
          <Image
            src="/photos/gallery2-girls-on-the-run.jpg"
            alt="Rusty Cage playing the Girls on the Run event stage"
            width={850}
            height={638}
          />
        </figure>
        <div>
          <p>
            We built this for private rooms: weddings, birthdays, anniversaries,
            backyard and house parties, company events, wineries, and halls.
            The setup is about 5′ × 6′. We bring our own PA. If the site has no
            power, we bring a generator.
          </p>
          <p>
            {site.travelLine} Recent private bookings include an
            Issaquah anniversary party. Also Porchfest Edmonds, Shorelake Arts
            Concerts in the Park, and MOHAI.
          </p>
          <p>
            The volume stays low on purpose. People can talk. People can still
            sing Jolene.
          </p>
          <p>
            <Link className="btn" href="/contact">
              Check your date
            </Link>
          </p>
        </div>
      </section>

      <section className="split band">
        <div>
          <p className="kicker">What we carry</p>
          <h2>Small footprint. Ready for remote sites.</h2>
          <ul>
            <li>Vocals, guitar, harmonica, bass, drums</li>
            <li>Own PA included in every package</li>
            <li>About 5′ × 6′ on the floor</li>
            <li>Generator for sites with no power</li>
            <li>Travels throughout Washington and the Northwest; travel costs added beyond about 50 miles</li>
          </ul>
        </div>
        <figure className="frame" style={{ transform: "rotate(-0.4deg)" }}>
          <Image
            src="/photos/gallery4-trio-wide-logo.jpg"
            alt="Rusty Cage trio on stage in front of the Rusty Cage Seattle logo"
            width={850}
            height={638}
          />
        </figure>
      </section>
    </div>
  );
}
