"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroPhotos } from "@/lib/content";

const INTERVAL_MS = 5500;

export function HeroPhotos() {
  const [index, setIndex] = useState(0);
  const current = heroPhotos[index];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroPhotos.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [index]);

  return (
    <figure className="frame hero-photos">
      <div className="hero-photos-stage">
        {heroPhotos.map((photo, i) => (
          <Image
            key={photo.src}
            className={i === index ? "is-current" : undefined}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 860px) 100vw, 48vw"
            priority={i === 0}
          />
        ))}
      </div>
      <figcaption>{current.caption}</figcaption>
      <div className="hero-photos-dots">
        {heroPhotos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Show photo ${i + 1} of ${heroPhotos.length}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </figure>
  );
}
