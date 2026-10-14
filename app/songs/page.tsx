import type { Metadata } from "next";
import Link from "next/link";
import { SongBrowser, type SongGroup } from "@/components/SongBrowser";
import {
  countrySongs,
  crossoverSongs,
  occasions,
  occasionsFor,
  originalSongs,
  type Song,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Song list",
  description:
    "Country-first setlist from Rusty Cage Trio, tagged for ceremony, cocktail hour, dinner, sing-alongs, and dancing.",
};

function tag(songs: readonly Song[]): SongGroup["songs"] {
  return songs.map((song) => ({
    title: song.title,
    artist: song.artist,
    occasions: occasionsFor(song.title),
  }));
}

export default function SongsPage() {
  const groups: SongGroup[] = [
    { heading: "Country", songs: tag(countrySongs) },
    { heading: "Crossover", songs: tag(crossoverSongs) },
    { heading: "Originals", songs: tag(originalSongs) },
  ];

  return (
    <div className="wrap">
      <header className="page-hero">
        <p className="kicker">The book</p>
        <h1>Songs people sing</h1>
        <p className="lede">
          Country first. A short crossover set after. A handful of originals.
          Filter by ceremony, cocktail hour, dinner, sing-along, or dance —
          the tags are a guide for the room, not a wall. Requests welcome.
        </p>
      </header>
      <SongBrowser groups={groups} filters={occasions} />
      <p style={{ margin: "2rem 0 3rem" }}>
        <Link className="btn" href="/contact">
          Check your date
        </Link>
      </p>
    </div>
  );
}
