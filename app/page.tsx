import Image from "next/image";
import Link from "next/link";
import { FacebookReel } from "@/components/FacebookReel";
import { HeroPhotos } from "@/components/HeroPhotos";
import { ShowsList } from "@/components/ShowsList";
import { packages, reels, site } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="wrap hero">
        <div>
          <p className="kicker">
            {site.location} · est. {site.formed}
          </p>
          <h1>
            Acoustic country trio for weddings, private parties, wineries &
            company events
            <span className="hero-where">— {site.serviceArea}</span>
          </h1>
          <p className="lede">
            Private parties get the same care as a wedding: birthdays,
            anniversaries, backyard and house parties. We also play wineries
            and company events across {site.serviceArea}. Vocals, guitar,
            harmonica, bass, and drums, kept at a volume where people can still
            talk. We bring the PA — and a generator if the site has no power.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/contact">
              Check your date
            </Link>
            <Link className="btn btn-ghost" href="/songs">
              See the song list
            </Link>
          </div>
        </div>
        <HeroPhotos />
      </section>

      <section className="wrap band">
        <div className="song-banner">
          <div>
            <p className="kicker">The book</p>
            <h2>Songs for the whole day</h2>
            <p>
              Ceremony, cocktail hour, dinner, sing-alongs, and dancing.
              Country first — Cash, Dolly, Willie, CCR, Neil Young — then the
              songs people yell for.
            </p>
          </div>
          <Link className="btn" href="/songs">
            See the song list
          </Link>
        </div>
      </section>

      <section className="wrap band" id="packages">
        <div className="section-head">
          <div>
            <p className="kicker">Private bookings</p>
            <h2>Packages</h2>
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
          {site.travelLine} Generator for sites
          with no power. Winter and weekday rates are available — mention the
          date when you check it.
        </p>
      </section>

      <section className="wrap band">
        <div className="section-head">
          <div>
            <p className="kicker">Listen</p>
            <h2>Jolene, the way we play it</h2>
          </div>
        </div>
        <div className="split">
          <div>
            <p className="lede">
              Porch-volume country for a wedding, a birthday, a winery
              afternoon, or a company night. Two more clips — Friends in Low
              Places and CCR — are on the Facebook page.
            </p>
            <div className="cta-row">
              <Link className="btn" href="/contact">
                Check your date
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
              title="Rusty Cage — Jolene"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div className="reels">
          {reels.map((reel) => (
            <FacebookReel
              key={reel.href}
              href={reel.href}
              title={reel.title}
              width={reel.width}
              height={reel.height}
            />
          ))}
        </div>
      </section>

      <section className="wrap band split">
        <figure className="frame" style={{ transform: "rotate(0.5deg)" }}>
          <Image
            src="/photos/gallery1-trio-logo-square.jpg"
            alt="Rusty Cage trio on stage with the guitar logo backdrop"
            width={850}
            height={850}
          />
        </figure>
        <div>
          <p className="kicker">The fit</p>
          <h2>Built for wineries, backyards, and halls</h2>
          <p>
            We keep the volume low and the footprint small — about 5′ × 6′.
            Own PA. {site.travelLine} Formed {site.formed}. Living
            rooms, anniversary parties, and MOHAI.
          </p>
          <p>
            <Link href="/about">More about the trio</Link>
            {" · "}
            <Link href="/songs">Full song list</Link>
          </p>
        </div>
      </section>

      <section className="wrap band shows-quiet">
        <div className="section-head">
          <div>
            <p className="kicker">If you want to hear us first</p>
            <h2>Public shows</h2>
          </div>
          <Link href="/shows">All public shows</Link>
        </div>
        <p className="fine">
          Confirmed public nights. Weddings, private parties, wineries, and
          company events are booked with a quote.
        </p>
        <ShowsList />
      </section>
    </>
  );
}
