export const site = {
  name: "Rusty Cage Trio",
  email: "rustycagetrio@gmail.com",
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

export const proof = [
  { label: "Gig Salad", value: "5.0" },
  { label: "Private", value: "Issaquah anniversary party" },
  { label: "Corporate", value: "Company boat holiday party" },
  { label: "Community", value: "Porchfest Edmonds" },
  { label: "Park", value: "Shorelake Arts" },
  { label: "Museum", value: "MOHAI" },
] as const;

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
