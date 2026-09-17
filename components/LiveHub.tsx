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
  const status = selected
    ? `Request: ${selected.title}`
    : "Tip only • no request (tap song to request)";
  const note = selected ? songRequestNote(selected) : tipNote();
  const action = selected ? "Request" : "Tip";

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
      <div className="live-top">
        <header className="live-brand">
          <Link className="live-wordmark" href="/">
            Rusty Cage
          </Link>
        </header>

        <a
          className="live-facebook"
          href={facebook}
          rel="noreferrer"
          target="_blank"
        >
          Gig updates · Follow on Facebook
        </a>

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
      </div>

      <div className="live-setlist" aria-label="Setlist">
        {visibleSongs.length === 0 ? (
          <p className="live-empty">No matches</p>
        ) : (
          <ul>
            {visibleSongs.map((song) => {
              const active = selected ? sameSong(song, selected) : false;
              return (
                <li key={`${song.title}-${song.artist}`}>
                  <button
                    type="button"
                    className={active ? "is-selected" : undefined}
                    aria-pressed={active}
                    onClick={() => toggleSong(song)}
                  >
                    <span>{song.title}</span>
                    <em>{song.artist}</em>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="live-dock">
        <p className="live-note" aria-live="polite">
          {status}
        </p>
        <div className="live-amounts">
          {REQUEST_AMOUNTS.map((amount) => (
            <a
              key={amount}
              className="live-amount"
              href={venmoPayUrl(amount, note)}
              aria-label={`${action} $${amount} via Venmo`}
              rel="noreferrer"
              target="_blank"
            >
              ${amount}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
