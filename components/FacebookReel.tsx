export function FacebookReel({
  href,
  title,
  width,
  height,
}: {
  href: string;
  title: string;
  /** Source video width in px; only the ratio matters. */
  width: number;
  height: number;
}) {
  // Match the plugin's width/height params to the real video orientation.
  const embedWidth = 560;
  const embedHeight = Math.round((embedWidth * height) / width);
  const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(href)}&show_text=false&width=${embedWidth}&height=${embedHeight}`;

  return (
    <figure className="reel">
      <div
        className="reel-frame"
        style={{ "--reel-ratio": `${width} / ${height}` } as React.CSSProperties}
      >
        <iframe
          src={src}
          title={`${title} — Rusty Cage on Facebook`}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <figcaption>
        <a href={href} rel="noreferrer" target="_blank">
          {title} on Facebook
        </a>
      </figcaption>
    </figure>
  );
}
