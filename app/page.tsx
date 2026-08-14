import Image from "next/image";
import Link from "next/link";
import { packages, proof, site } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="wrap hero">
        <div>
          <p className="kicker">
            {site.location} · est. {site.formed}
          </p>
          <h1>{site.tagline}</h1>
          <p className="lede">
            Warm, low-volume country for rooms that still want conversation.
            Vocals, guitar, harmonica, bass, and drums. We bring the PA — and a
            generator if the site has no power.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/contact">
              Request a quote
            </Link>
            <Link className="btn btn-ghost" href="/songs">
              See the song list
            </Link>
          </div>
        </div>
        <figure className="frame">
          <Image
            src="/photos/hero.jpeg"
            alt="Rusty Cage Trio, Shoreline"
            width={1200}
            height={1500}
            priority
          />
          <figcaption>The trio. Shoreline, Washington.</figcaption>
        </figure>
      </section>

      <section className="wrap band">
        <div className="section-head">
          <div>
            <p className="kicker">Proof</p>
            <h2>Already booked for the rooms that matter</h2>
          </div>
        </div>
        <div className="proof-grid">
          {proof.map((item) => (
            <article className="proof-card" key={item.value}>
              <span className="kicker">{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap band">
        <div className="section-head">
          <div>
            <p className="kicker">Packages</p>
            <h2>Clear pricing. No 15-page rider.</h2>
          </div>
        </div>
        <div className="packages">
          {packages.map((item) => (
            <article className="package" key={item.name}>
              <p className="kicker">{item.duration}</p>
              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
              <p className="duration">{item.detail}</p>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
        <p className="fine" style={{ marginTop: "1.1rem" }}>
          Travel ~200 miles. Generator for sites with no power.
        </p>
      </section>

      <section className="wrap band split">
        <div>
          <p className="kicker">Listen</p>
          <h2>Jolene, the way we play it</h2>
          <p className="lede">
            A porch-volume country trio — not a bar-band brochure. If this
            sounds like your wedding, party, or company night, ask for a date.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/contact">
              Request a quote
            </Link>
            <a
              className="btn btn-ghost"
              href={site.gigsalad}
              rel="noreferrer"
              target="_blank"
            >
              5.0 on Gig Salad
            </a>
          </div>
        </div>
        <div className="video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${site.joleneVideoId}`}
            title="Rusty Cage Trio — Jolene"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <section className="wrap band split">
        <figure className="frame" style={{ transform: "rotate(0.5deg)" }}>
          <Image
            src="/photos/forest.jpeg"
            alt="Rusty Cage Trio in the woods near Shoreline"
            width={1400}
            height={1800}
          />
        </figure>
        <div>
          <p className="kicker">The fit</p>
          <h2>Built for wineries, backyards, boats, and halls</h2>
          <p>
            We keep the volume low and the footprint small — about 5′ × 6′.
            Own PA. Travel from Shoreline about 200 miles. Formed 2024, already
            in living rooms, on a company boat, and at MOHAI.
          </p>
          <p>
            <Link href="/about">More about the trio</Link>
          </p>
        </div>
      </section>
    </>
  );
}
