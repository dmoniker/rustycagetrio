import { formatShowDate, upcomingShows } from "@/lib/content";

export function ShowsList() {
  const items = upcomingShows();

  if (items.length === 0) {
    return (
      <p className="lede">
        No public shows on the calendar right now. Private bookings are open —
        request a quote.
      </p>
    );
  }

  return (
    <ol className="show-list">
      {items.map((show) => (
        <li key={`${show.date}-${show.venue}-${show.city}`}>
          <time dateTime={show.date}>{formatShowDate(show.date)}</time>
          <span className="show-time">{show.time}</span>
          <span className="show-place">
            {show.venue}, {show.city}
          </span>
          {show.facebook ? (
            <a href={show.facebook} rel="noreferrer" target="_blank">
              Facebook event
            </a>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
