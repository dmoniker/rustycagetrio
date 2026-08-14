import type { Metadata } from "next";
import Link from "next/link";
import { countrySongs, crossoverSongs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Song list",
  description:
    "Country-first setlist from Rusty Cage Trio — Cash, Dolly, Garth, Willie, and a short crossover set.",
};

function SongBlock({
  heading,
  songs,
}: {
  heading: string;
  songs: readonly { title: string; artist: string }[];
}) {
  return (
    <div>
      <p className="kicker">{heading}</p>
      <ol className="song-list">
        {songs.map((song) => (
          <li key={song.title}>
            <span>{song.title}</span>
            <em>{song.artist}</em>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function SongsPage() {
  return (
    <div className="wrap">
      <header className="page-hero">
        <p className="kicker">The book</p>
        <h1>Songs people actually sing</h1>
        <p className="lede">
          Country first. A short crossover set after. Requests welcome — tell us
          what the room needs.
        </p>
      </header>
      <div className="song-cols">
        <SongBlock heading="Country" songs={countrySongs} />
        <SongBlock heading="Crossover" songs={crossoverSongs} />
      </div>
      <p style={{ margin: "2rem 0 3rem" }}>
        <Link className="btn" href="/contact">
          Request a quote
        </Link>
      </p>
    </div>
  );
}
