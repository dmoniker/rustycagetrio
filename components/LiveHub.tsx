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

function AmountRow({
  note,
  disabled,
  verb,
}: {
  note: string;
  disabled?: boolean;
  verb: "Request" | "Tip";
}) {
  return (
    <div className="live-amounts">
      {REQUEST_AMOUNTS.map((amount) => {
        const href = note ? venmoPayUrl(amount, note) : undefined;
        const label = `${verb} $${amount}`;
        return (
          <a
            key={amount}
            className="live-amount"
            href={href}
            aria-label={`${label} via Venmo`}
            aria-disabled={disabled || !href ? true : undefined}
            tabIndex={disabled || !href ? -1 : undefined}
            onClick={(event) => {
              if (disabled || !href) event.preventDefault();
            }}
            rel="noreferrer"
            target="_blank"
          >
            <span className="live-amount-verb">{verb}</span>
            <strong>${amount}</strong>
          </a>
        );
      })}
    </div>
  );
}

export function LiveHub({ facebook, songs }: LiveHubProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Song | null>(null);

  const needle = query.trim().toLowerCase();
  const requestNote = selected ? songRequestNote(selected) : "";
  const canRequest = Boolean(selected);

  const visibleSongs = useMemo(
    () => songs.filter((song) => matchesQuery(song, needle)).sort(byTitle),
    [songs, needle],
  );

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
                      onClick={() => setSelected(song)}
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

        {canRequest ? (
          <p className="live-note" aria-live="polite">
            {requestNote}
          </p>
        ) : null}

        <AmountRow
          note={requestNote}
          disabled={!canRequest}
          verb="Request"
        />
      </section>

      <section className="live-card live-card-tip" aria-labelledby="tip-heading">
        <p className="live-kicker" id="tip-heading">
          Just a tip
        </p>
        <AmountRow note={tipNote()} verb="Tip" />
      </section>
    </div>
  );
}
