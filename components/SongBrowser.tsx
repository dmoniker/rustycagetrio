"use client";

import { useMemo, useState } from "react";
import type { Occasion } from "@/lib/content";

export type TaggedSong = {
  title: string;
  artist: string;
  occasions: readonly Occasion[];
};

export type SongGroup = {
  heading: string;
  songs: readonly TaggedSong[];
};

export function SongBrowser({
  groups,
  filters,
}: {
  groups: readonly SongGroup[];
  filters: readonly Occasion[];
}) {
  const options = ["All", ...filters] as const;
  const [filter, setFilter] = useState<(typeof options)[number]>("All");

  const visible = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          songs:
            filter === "All"
              ? group.songs
              : group.songs.filter((song) => song.occasions.includes(filter)),
        }))
        .filter((group) => group.songs.length > 0),
    [groups, filter],
  );

  const count = visible.reduce((sum, group) => sum + group.songs.length, 0);

  return (
    <>
      <div className="song-filters" role="group" aria-label="Filter songs by part of the day">
        {options.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="fine">
        {filter === "All"
          ? `${count} songs. Tags are a guide — requests still welcome.`
          : `${count} ${filter.toLowerCase()} ${count === 1 ? "song" : "songs"}.`}
      </p>
      {visible.length === 0 ? (
        <p>Nothing tagged for that part of the day. Ask us anyway.</p>
      ) : (
        <div className="song-cols">
          {visible.map((group) => (
            <div key={group.heading}>
              <p className="kicker">{group.heading}</p>
              <ol className="song-list">
                {group.songs.map((song) => (
                  <li key={song.title}>
                    <span>
                      {song.title}
                      {song.occasions.length > 0 ? (
                        <span className="song-tags">
                          {song.occasions.map((occasion) => (
                            <span key={occasion}>{occasion}</span>
                          ))}
                        </span>
                      ) : null}
                    </span>
                    <em>{song.artist}</em>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
