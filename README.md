# Rusty Cage Trio

Public site for the Shoreline / Seattle acoustic country trio. Built to close private bookings — weddings, parties, corporate — and to replace the BandVista page at rustycagetrio.com.

No auth, no CMS, no database, no API keys. Quote requests POST to FormSubmit (`rustycagetrio@gmail.com`) and redirect to `/thanks`.

## Local

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production check:

```bash
npm run build
npm start
```

## Routes

- `/` home
- `/songs` setlist
- `/about` the trio
- `/contact` quote form
- `/thanks` form success

## Vercel

This app is meant for Vercel. Import the project, keep the Next.js defaults, and deploy.

When the preview looks right, point `rustycagetrio.com` at the Vercel project: add the custom domain in the Vercel dashboard, then update DNS (A / CNAME) at the registrar. No app change is required for the domain cutover.

## Photos

Live photos in `public/photos` came from the existing BandVista media page. Do not replace them with generated pictures of the musicians.