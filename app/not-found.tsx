import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap">
      <header className="page-hero">
        <p className="kicker">404</p>
        <h1>That page is not on the setlist.</h1>
        <p>
          <Link className="btn" href="/">
            Back home
          </Link>
        </p>
      </header>
    </div>
  );
}
