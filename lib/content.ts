export const site = {
  name: "Rusty Cage",
  email: "booking@rustycageseattle.com",
  tagline:
    "Acoustic country trio for weddings, private parties, wineries & company events — Seattle & Eastside",
  location: "Shoreline, WA",
  serviceArea: "Seattle & Eastside",
  travelLine:
    "Based in Shoreline, we travel throughout Washington and the Northwest, and travel costs are added to the quote for distances beyond about 50 miles.",
  formed: "2024",
  instagram: "https://www.instagram.com/rustycagetrio",
  facebook: "https://www.facebook.com/rustycageseattle",
  youtube: "https://www.youtube.com/@darcymenard",
  gigsalad: "https://www.gigsalad.com/rusty_cage_seattle",
  venmo: "rustycageseattle",
  joleneVideoId: "cuyIdqal2Ms",
};

export const reels = [
  {
    href: "https://www.facebook.com/reel/1085779021033672",
    title: "Friends in Low Places",
    // Source video is 320x240 (4:3) per Facebook's embed data.
    width: 320,
    height: 240,
  },
  {
    href: "https://www.facebook.com/reel/2186905388527560",
    title: "Creedence Clearwater Revival",
    // Source video is 960x540 (16:9) per Facebook's embed data.
    width: 960,
    height: 540,
  },
] as const;

export const heroPhotos = [
  {
    src: "/photos/gallery2-girls-on-the-run.jpg",
    alt: "Rusty Cage playing the Girls on the Run event stage",
    caption: "Girls on the Run event.",
  },
  {
    src: "/photos/gallery4-trio-wide-logo.jpg",
    alt: "Rusty Cage trio on stage in front of the Rusty Cage Seattle logo",
    caption: "The trio on stage.",
  },
  {
    src: "/photos/gallery3-pub-live.jpg",
    alt: "Rusty Cage playing live at a pub",
    caption: "Live at the pub.",
  },
  {
    src: "/photos/gallery1-trio-logo-square.jpg",
    alt: "Rusty Cage trio on stage with the guitar logo backdrop",
    caption: "Rusty Cage, Seattle.",
    fit: "contain",
  },
  {
    src: "/photos/gallery5-alt-country-promo.png",
    alt: "Rusty Cage alt-country Seattle promo graphic",
    caption: "Alt-country, Seattle.",
    fit: "contain",
  },
] as const;

export const packages = [
  {
    name: "Duo",
    duration: "Shorter set",
    price: "from $600",
    detail: "Two players, PA included",
    note: "A smaller lineup for small winery rooms, rehearsal dinners, and intimate private parties.",
  },
  {
    name: "Cocktail Hour",
    duration: "90 minutes",
    price: "$900",
    detail: "PA included",
    note: "Background country for cocktail hour, a rehearsal dinner, or a welcome party.",
  },
  {
    name: "Ceremony + Cocktail Hour",
    duration: "Ceremony + 90 minutes",
    price: "$1,100–$1,200",
    detail: "Processional, recessional, one learned request, PA included",
    note: "Processional and recessional songs, then we stay for cocktail hour. One learned request is included.",
  },
  {
    name: "Wedding / Private Party",
    duration: "2 hours",
    price: "$1,350",
    detail: "Two sets, requests welcome, PA included",
    note: "Weddings and private parties — birthdays, anniversaries, backyard and house parties. Short break between sets.",
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
    date: "2026-10-09",
    time: "7–10pm",
    venue: "Thorndike Room, McMenamins Anderson School",
    city: "Bothell",
    facebook: "https://www.facebook.com/events/29407027835564194/",
  },
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
  { title: "Jambalaya", artist: "Hank Williams" },
  { title: "Family Tradition", artist: "Hank Williams Jr." },
  {
    title: "(Hey Won’t You Play) Another Somebody Done Somebody Wrong Song",
    artist: "B.J. Thomas",
  },
  { title: "Danny Boy", artist: "Conway Twitty" },
  { title: "Tennessee Whiskey", artist: "Chris Stapleton" },
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
  { title: "Wake Me Up", artist: "Avicii" },
  { title: "Sweet Child O’ Mine", artist: "Guns N’ Roses" },
  { title: "The Joker", artist: "Steve Miller Band" },
  { title: "Me and Bobby McGee", artist: "Gordon Lightfoot" },
  { title: "A Horse With No Name", artist: "America" },
  { title: "Piano Man", artist: "Billy Joel" },
  { title: "Old Man", artist: "Neil Young" },
  { title: "Rocky Mountain Way", artist: "Joe Walsh" },
  { title: "Ain’t No Sunshine", artist: "Bill Withers" },
  { title: "Maggie’s Farm", artist: "Bob Dylan" },
  { title: "Rebel Yell", artist: "Billy Idol" },
  { title: "Have You Ever Seen the Rain?", artist: "Creedence Clearwater Revival" },
  { title: "Lodi", artist: "Creedence Clearwater Revival" },
  { title: "Southern Cross", artist: "Crosby, Stills & Nash" },
  { title: "Take It Easy", artist: "Eagles" },
  { title: "Truckin’", artist: "Grateful Dead" },
  { title: "Drunken Sailor", artist: "The Irish Rovers" },
  { title: "Hard Times", artist: "Ray Charles" },
  { title: "Listen to the Music", artist: "The Doobie Brothers" },
  { title: "Elderly Woman Behind the Counter", artist: "Pearl Jam" },
  { title: "The Long Cut", artist: "Uncle Tupelo" },
] as const;

export const originalSongs = [
  { title: "My Rent", artist: "Rusty Cage" },
  { title: "Tangerine Sky", artist: "Rusty Cage" },
  { title: "Technology", artist: "Rusty Cage" },
  { title: "Caterpillar Dream", artist: "Rusty Cage" },
] as const;

export type Song = {
  title: string;
  artist: string;
};

/**
 * Same book as `/songs` and `/live`.
 * Production was 38 (28 country + 10 crossover).
 * This list is 68 (33 country + 31 crossover + 4 originals).
 */
export const setlistSongs: Song[] = [
  ...countrySongs,
  ...crossoverSongs,
  ...originalSongs,
];

export const eventTypes = [
  { value: "wedding", label: "Wedding" },
  { value: "private-party", label: "Private party" },
  { value: "winery", label: "Winery" },
  { value: "corporate", label: "Company event" },
  { value: "other", label: "Other" },
] as const;

export const occasions = [
  "Ceremony",
  "Cocktail hour",
  "Dinner",
  "Sing-along",
  "Dance",
] as const;

export type Occasion = (typeof occasions)[number];

/**
 * Booking guide for where a song usually fits. Songs stay in the country /
 * crossover / originals lists; these tags only group them. A song can fit
 * more than one part of the day.
 */
const songOccasions = {
  "Friends in Low Places": ["Sing-along", "Dance"],
  Jolene: ["Sing-along", "Cocktail hour"],
  "Ring of Fire": ["Sing-along", "Dance"],
  "Folsom Prison Blues": ["Dance", "Cocktail hour"],
  "Boot Scootin’ Boogie": ["Dance"],
  "Take Me Home, Country Roads": ["Ceremony", "Sing-along"],
  "On the Road Again": ["Sing-along", "Cocktail hour"],
  "The Gambler": ["Sing-along", "Dinner"],
  "Forever and Ever, Amen": ["Ceremony", "Dinner"],
  "Copperhead Road": ["Dance"],
  Chattahoochee: ["Dance"],
  "Guitars, Cadillacs": ["Dance", "Cocktail hour"],
  "Here’s a Quarter (Call Someone Who Cares)": ["Cocktail hour", "Sing-along"],
  "Achy Breaky Heart": ["Dance", "Sing-along"],
  "Fast Car": ["Dinner", "Cocktail hour"],
  "Drivin’ My Life Away": ["Dance", "Cocktail hour"],
  "Move It On Over": ["Dance"],
  "Act Naturally": ["Cocktail hour", "Dance"],
  "King of the Road": ["Cocktail hour", "Dinner"],
  "Waltz Across Texas": ["Ceremony", "Dinner"],
  "City of New Orleans": ["Dinner", "Cocktail hour"],
  "Gentle on My Mind": ["Ceremony", "Cocktail hour", "Dinner"],
  "Rusty Cage": ["Cocktail hour"],
  "That’s All Right": ["Dance", "Cocktail hour"],
  "Call Me the Breeze": ["Cocktail hour", "Dinner"],
  "Dead Flowers": ["Cocktail hour"],
  "Willin’": ["Dinner", "Cocktail hour"],
  "Speed of the Sound of Loneliness": ["Ceremony", "Dinner"],
  Jambalaya: ["Sing-along", "Dance"],
  "Family Tradition": ["Sing-along", "Dance"],
  "(Hey Won’t You Play) Another Somebody Done Somebody Wrong Song": [
    "Dinner",
    "Sing-along",
  ],
  "Danny Boy": ["Ceremony"],
  "Harvest Moon": ["Ceremony", "Dinner"],
  "Heart of Gold": ["Ceremony", "Cocktail hour", "Dinner"],
  "Peaceful Easy Feeling": ["Ceremony", "Cocktail hour", "Dinner"],
  "Midnight Rider": ["Cocktail hour"],
  Margaritaville: ["Sing-along", "Cocktail hour"],
  "Jack and Diane": ["Sing-along"],
  "Long Train Runnin’": ["Dance"],
  "Mary Jane’s Last Dance": ["Dance"],
  "Song Sung Blue": ["Sing-along", "Dinner"],
  "All Apologies": ["Dinner", "Cocktail hour"],
  "Wake Me Up": ["Dance"],
  "Sweet Child O’ Mine": ["Sing-along", "Dance"],
  "The Joker": ["Cocktail hour", "Sing-along"],
  "Me and Bobby McGee": ["Cocktail hour", "Dinner", "Sing-along"],
  "A Horse With No Name": ["Cocktail hour", "Dinner"],
  "Piano Man": ["Sing-along"],
  "Old Man": ["Ceremony", "Dinner"],
  "Rocky Mountain Way": ["Dance", "Cocktail hour"],
  "Ain’t No Sunshine": ["Ceremony", "Dinner"],
  "Maggie’s Farm": ["Cocktail hour"],
  "Rebel Yell": ["Dance"],
  "Have You Ever Seen the Rain?": ["Sing-along", "Cocktail hour"],
  Lodi: ["Cocktail hour", "Dinner"],
  "Southern Cross": ["Cocktail hour", "Dinner"],
  "Take It Easy": ["Sing-along", "Cocktail hour"],
  "Truckin’": ["Dance", "Sing-along"],
  "Drunken Sailor": ["Sing-along", "Dance"],
  "Hard Times": ["Dinner"],
  "Listen to the Music": ["Dance", "Cocktail hour"],
  "Elderly Woman Behind the Counter": ["Dinner", "Cocktail hour"],
  "The Long Cut": ["Cocktail hour"],
  "My Rent": ["Cocktail hour"],
  "Tangerine Sky": ["Dinner", "Cocktail hour"],
  Technology: ["Cocktail hour"],
  "Caterpillar Dream": ["Dinner"],
} as const satisfies Record<string, readonly Occasion[]>;

export function occasionsFor(title: string): readonly Occasion[] {
  if (Object.prototype.hasOwnProperty.call(songOccasions, title)) {
    return songOccasions[title as keyof typeof songOccasions];
  }
  return [];
}
