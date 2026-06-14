# Memorial Site

A small static Next.js memorial website with:

- Landing page with rotating hero photos
- Photo mosaic gallery with fullscreen lightbox
- Words/memories page
- Submit page with a Google Form placeholder
- Static photos bundled in the project under `/public/photos`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Edit basic content

- `src/data/site.ts` — name, dates, intro text, Google Form URL
- `src/data/photos.ts` — gallery photos and captions
- `src/data/posts.ts` — words/memory posts
- `public/photos/gallery` — gallery images
- `public/photos/hero` — landing page hero images

## Deploy

Push this folder to GitHub and connect the repo to Vercel.

## Updating manually

1. Resize/compress approved photos.
2. Add them to `public/photos/gallery`.
3. Add entries to `src/data/photos.ts` and/or `src/data/posts.ts`.
4. Commit and push. Vercel redeploys automatically.
