import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rusty Cage Trio formed in Shoreline in 2024. Vocals, guitar, harmonica, bass, and drums. Low-volume acoustic country for private events.",
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <header className="page-hero">
        <p className="kicker">Shoreline, {site.formed}</p>
        <h1>A porch band that can hold a room</h1>
        <p className="lede">
          Rusty Cage Trio formed in Shoreline in 2024. Vocals, guitar,
          harmonica, bass, and drums — played at conversation volume, with
          enough body to fill a hall.
        </p>
      </header>

      <section className="split band">
        <figure className="frame">
          <Image
            src="/photos/about.jpeg"
            alt="Rusty Cage Trio with the truck, Shoreline woods"
            width={1400}
            height={1800}
          />
        </figure>
        <div>
          <p>
            We built this for private rooms: weddings, anniversary parties,
            company nights, wineries, backyards, and boats. The setup is about
            5′ × 6′. We bring our own PA. If the site has no power, we bring a
            generator.
          </p>
          <p>
            From Shoreline we travel about 200 miles. Recent private bookings
            include an Issaquah anniversary party and a company holiday party
            on a boat. Also Porchfest Edmonds, Shorelake Arts Concerts in the
            Park, and MOHAI.
          </p>
          <p>
            The volume stays low on purpose. People can talk. People can still
            sing Jolene.
          </p>
          <p>
            <Link className="btn" href="/contact">
              Request a quote
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
            <li>Travel from Shoreline ~200 miles</li>
          </ul>
        </div>
        <figure className="frame" style={{ transform: "rotate(-0.4deg)" }}>
          <Image
            src="/photos/truck-band.jpeg"
            alt="Rusty Cage Trio in front of a Ford pickup"
            width={1600}
            height={1200}
          />
        </figure>
      </section>
    </div>
  );
}
