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
  venmo: string;
  countrySongs: readonly Song[];
  crossoverSongs: readonly Song[];
};

function matchesQuery(song: Song, query: string): boolean {
  if (!query) return true;
  const hay = `${song.title} ${song.artist}`.toLowerCase();
  return hay.includes(query);
}

function sameSong(a: Song, b: Song): boolean {
  return a.title === b.title && a.artist === b.artist;
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

export function LiveHub({
  facebook,
  venmo,
  countrySongs,
  crossoverSongs,
}: LiveHubProps) {
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const needle = query.trim().toLowerCase();
  const selected: Song = { title: title.trim(), artist: artist.trim() };
  const requestNote = songRequestNote(selected.title, selected.artist);
  const canRequest = Boolean(requestNote);

  const filteredCountry = useMemo(
    () => countrySongs.filter((song) => matchesQuery(song, needle)),
    [countrySongs, needle],
  );
  const filteredCrossover = useMemo(
    () => crossoverSongs.filter((song) => matchesQuery(song, needle)),
    [crossoverSongs, needle],
  );
  const matchCount = filteredCountry.length + filteredCrossover.length;

  function pickSong(song: Song) {
    setTitle(song.title);
    setArtist(song.artist);
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
        <p className="live-kicker" id="request-heading">
          Request a song
        </p>
        <h1>Pick from the book, or type a custom one</h1>
        <p className="live-lede">
          Choose $5, $10, or $20. Venmo opens with the amount and note ready
          for @{venmo}. The notification is our cue — no account needed here.
        </p>

        <label className="live-field">
          Search the setlist
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search songs or artists"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </label>

        <div className="live-setlist" aria-label="Setlist">
          {matchCount === 0 ? (
            <p className="live-empty">No setlist match — type a custom song below.</p>
          ) : (
            <>
              <SongGroup
                heading="Country"
                songs={filteredCountry}
                selected={selected}
                onPick={pickSong}
              />
              <SongGroup
                heading="Crossover"
                songs={filteredCrossover}
                selected={selected}
                onPick={pickSong}
              />
            </>
          )}
        </div>

        <div className="live-custom">
          <p className="live-kicker">Custom request</p>
          <label className="live-field">
            Song title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Jambalaya"
              autoComplete="off"
            />
          </label>
          <label className="live-field">
            Artist
            <input
              type="text"
              value={artist}
              onChange={(event) => setArtist(event.target.value)}
              placeholder="e.g. Hank Williams"
              autoComplete="off"
            />
          </label>
        </div>

        <p className="live-note" aria-live="polite">
          {canRequest
            ? requestNote
            : "Pick a song or type a title, then tap an amount."}
        </p>

        <AmountRow
          note={requestNote}
          disabled={!canRequest}
          verb="Request"
        />

        <p className="live-fine">
          Pays @{venmo} on Venmo. The link opens the app when it is installed,
          or Venmo on the web if it is not. Search @{venmo} and paste the note
          above if you need a backup.
        </p>
      </section>

      <section className="live-card live-card-tip" aria-labelledby="tip-heading">
        <p className="live-kicker" id="tip-heading">
          Just a tip
        </p>
        <p className="live-lede">No song — a plain thank-you to the trio.</p>
        <AmountRow note={tipNote()} verb="Tip" />
      </section>
    </div>
  );
}

function SongGroup({
  heading,
  songs,
  selected,
  onPick,
}: {
  heading: string;
  songs: readonly Song[];
  selected: Song;
  onPick: (song: Song) => void;
}) {
  if (songs.length === 0) return null;

  return (
    <div>
      <p className="live-group">{heading}</p>
      <ul>
        {songs.map((song) => {
          const active = sameSong(song, selected);
          return (
            <li key={`${song.title}-${song.artist}`}>
              <button
                type="button"
                className={active ? "is-selected" : undefined}
                aria-pressed={active}
                onClick={() => onPick(song)}
              >
                <span>{song.title}</span>
                <em>{song.artist}</em>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
