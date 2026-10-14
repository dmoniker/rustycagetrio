export function FacebookReel({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(href)}&show_text=false&width=360&height=640`;

  return (
    <figure className="reel">
      <div className="reel-frame">
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
