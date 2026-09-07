export const site = {
  name: "Rusty Cage",
  email: "booking@rustycageseattle.com",
  tagline:
    "Acoustic country trio for weddings, parties, and corporate in the Seattle area",
  location: "Shoreline / Seattle",
  formed: "2024",
  instagram: "https://www.instagram.com/rustycagetrio",
  facebook: "https://www.facebook.com/rustycageseattle",
  youtube: "https://www.youtube.com/@darcymenard",
  gigsalad: "https://www.gigsalad.com/rusty_cage_seattle",
  joleneVideoId: "cuyIdqal2Ms",
};

export const packages = [
  {
    name: "Cocktail Hour",
    duration: "90 minutes",
    price: "$900",
    detail: "PA included",
    note: "Background country for cocktail hour, rehearsal dinner, or a welcome party.",
  },
  {
    name: "Wedding / Private Party",
    duration: "2 hours",
    price: "$1,350",
    detail: "Two sets, requests welcome, PA included",
    note: "The typical backyard, winery, or hall booking. Short break between sets.",
  },
  {
    name: "Corporate / Special Event",
    duration: "2.5–3 hours",
    price: "$1,750",
    detail: "PA included",
    note: "Longer set for holiday parties, boats, and company events.",
  },
] as const;

export type Show = {
  /** Calendar date as YYYY-MM-DD. Past dates drop off the public list. */
  date: string;
  time: string;
  venue: string;
  city: string;
  /** Public Facebook event URL, when one exists. */
  facebook?: string;
};

/**
 * Public, confirmed (or clearly bookable) gigs only.
 * Add a row here when a Facebook event goes up. Leave pending rooms off
 * the list until the owner locks them.
 */
export const shows: Show[] = [
  {
    date: "2026-10-10",
    time: "6–8pm",
    venue: "Trailhead Taps and Bottles",
    city: "Issaquah",
    facebook: "https://www.facebook.com/events/1568099088430168/",
  },
  {
    date: "2026-11-27",
    time: "7–10pm",
    venue: "McMenamins Anderson School",
    city: "Bothell",
  },
  {
    date: "2026-12-11",
    time: "7–10pm",
    venue: "McMenamins Anderson School",
    city: "Bothell",
  },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function todayInPacific(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function upcomingShows(): Show[] {
  const today = todayInPacific();
  return shows
    .filter((show) => show.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function formatShowDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return `${WEEKDAYS[date.getDay()]} ${MONTHS[month - 1]} ${day}, ${year}`;
}

export const countrySongs = [
  { title: "Friends in Low Places", artist: "Garth Brooks" },
  { title: "Jolene", artist: "Dolly Parton" },
  { title: "Ring of Fire", artist: "Johnny Cash" },
  { title: "Folsom Prison Blues", artist: "Johnny Cash" },
  { title: "Boot Scootin’ Boogie", artist: "Brooks & Dunn" },
  { title: "Take Me Home, Country Roads", artist: "John Denver" },
  { title: "On the Road Again", artist: "Willie Nelson" },
  { title: "The Gambler", artist: "Kenny Rogers" },
  { title: "Forever and Ever, Amen", artist: "Randy Travis" },
  { title: "Copperhead Road", artist: "Steve Earle" },
  { title: "Chattahoochee", artist: "Alan Jackson" },
  { title: "Guitars, Cadillacs", artist: "Dwight Yoakam" },
  { title: "Here’s a Quarter (Call Someone Who Cares)", artist: "Travis Tritt" },
  { title: "Achy Breaky Heart", artist: "Billy Ray Cyrus" },
  { title: "Fast Car", artist: "Luke Combs" },
  { title: "Drivin’ My Life Away", artist: "Eddie Rabbitt" },
  { title: "Move It On Over", artist: "Hank Williams" },
  { title: "Act Naturally", artist: "Buck Owens" },
  { title: "King of the Road", artist: "Roger Miller" },
  { title: "Waltz Across Texas", artist: "Ernest Tubb" },
  { title: "City of New Orleans", artist: "Willie Nelson" },
  { title: "Gentle on My Mind", artist: "Glen Campbell" },
  { title: "Rusty Cage", artist: "Johnny Cash" },
  { title: "That’s All Right", artist: "Elvis Presley" },
  { title: "Call Me the Breeze", artist: "J.J. Cale" },
  { title: "Dead Flowers", artist: "The Rolling Stones" },
  { title: "Willin’", artist: "Little Feat" },
  { title: "Speed of the Sound of Loneliness", artist: "John Prine" },
] as const;

export const crossoverSongs = [
  { title: "Harvest Moon", artist: "Neil Young" },
  { title: "Heart of Gold", artist: "Neil Young" },
  { title: "Peaceful Easy Feeling", artist: "Eagles" },
  { title: "Midnight Rider", artist: "The Allman Brothers" },
  { title: "Margaritaville", artist: "Jimmy Buffett" },
  { title: "Jack and Diane", artist: "John Mellencamp" },
  { title: "Long Train Runnin’", artist: "The Doobie Brothers" },
  { title: "Mary Jane’s Last Dance", artist: "Tom Petty" },
  { title: "Song Sung Blue", artist: "Neil Diamond" },
  { title: "All Apologies", artist: "Nirvana" },
] as const;

export const eventTypes = [
  { value: "wedding", label: "Wedding" },
  { value: "private-party", label: "Private party" },
  { value: "corporate", label: "Corporate" },
  { value: "other", label: "Other" },
] as const;
