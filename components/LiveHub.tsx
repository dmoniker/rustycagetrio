"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Song } from "@/lib/content";
import {
  REQUEST_AMOUNTS,
  songRequestNote,
  tipNote,
  venmoPayUrl,
} from "@/lib/venmo";

type LiveHubProps = {
  facebook: string;
  songs: readonly Song[];
};

function matchesQuery(song: Song, query: string): boolean {
  if (!query) return true;
  const hay = `${song.title} ${song.artist}`.toLowerCase();
  return hay.includes(query);
}

function sameSong(a: Song, b: Song): boolean {
  return a.title === b.title && a.artist === b.artist;
}

function byTitle(a: Song, b: Song): number {
  return (
    a.title.localeCompare(b.title, "en", { sensitivity: "base" }) ||
    a.artist.localeCompare(b.artist, "en", { sensitivity: "base" })
  );
}

export function LiveHub({ facebook, songs }: LiveHubProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Song | null>(null);

  const needle = query.trim().toLowerCase();
  const verb = selected ? "Request" : "Tip";
  const note = selected ? songRequestNote(selected) : tipNote();

  const visibleSongs = useMemo(
    () => songs.filter((song) => matchesQuery(song, needle)).sort(byTitle),
    [songs, needle],
  );

  function toggleSong(song: Song) {
    setSelected((current) =>
      current && sameSong(current, song) ? null : song,
    );
  }

  return (
    <div className="live">
      <header className="live-brand">
        <Link className="live-wordmark" href="/">
          Rusty Cage
        </Link>
        <p className="live-kicker">Tonight at the gig</p>
      </header>

      <a
        className="live-facebook"
        href={facebook}
        rel="noreferrer"
        target="_blank"
      >
        <span className="live-facebook-kicker">Gig updates</span>
        <strong>Follow on Facebook</strong>
        <span>Dates, rooms, and last-minute changes</span>
      </a>

      <section className="live-card" aria-labelledby="request-heading">
        <h1 className="live-kicker" id="request-heading">
          Request a song
        </h1>

        <label className="live-field">
          <span className="hp">Search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </label>

        <p className="live-count" aria-live="polite">
          {visibleSongs.length === 1
            ? "1 song"
            : `${visibleSongs.length} songs`}
        </p>

        <div className="live-setlist" aria-label="Setlist">
          {visibleSongs.length === 0 ? (
            <p className="live-empty">No matches</p>
          ) : (
            <ol>
              {visibleSongs.map((song, index) => {
                const active = selected ? sameSong(song, selected) : false;
                const n = index + 1;
                return (
                  <li key={`${song.title}-${song.artist}`} value={n}>
                    <button
                      type="button"
                      className={active ? "is-selected" : undefined}
                      aria-pressed={active}
                      onClick={() => toggleSong(song)}
                    >
                      <span className="live-num" aria-hidden="true">
                        {n}
                      </span>
                      <span>
                        <span>{song.title}</span>
                        <em>{song.artist}</em>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        <p className="live-note" aria-live="polite">
          {note}
        </p>

        <div className="live-amounts">
          {REQUEST_AMOUNTS.map((amount) => {
            const label = `${verb} $${amount}`;
            return (
              <a
                key={amount}
                className="live-amount"
                href={venmoPayUrl(amount, note)}
                aria-label={`${label} via Venmo`}
                rel="noreferrer"
                target="_blank"
              >
                <span className="live-amount-verb">{verb}</span>
                <strong>${amount}</strong>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
