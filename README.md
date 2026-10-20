# AI product imagery - production work

Concept / spec work by Vedank Gaur: three fictional brands (TESSEL pillow, ORRIN No. 7 perfume, SOMNA mattress) taken from brief to fidelity - reference to rollout, ads, crops, PDP and landing-page concepts.

Live: https://ai-showdown-vg.vercel.app/production

## What is in it

- Static concept pages in `public/production` (shared `style.css` + `site.js`, local fonts and images).
- A minimal Next.js shell that redirects `/` to `/production` and serves robots.txt and the sitemap.
- Hero dot-field: the dotted paper morphs into AI monograms near the cursor, carried over from the earlier version of the site.

## History

The earlier "AI showdown" version of the site (Gemini vs ChatGPT vs Personal Agent) is preserved on the `old-version` branch.

## Stack

Next.js (App Router) shell, static HTML/CSS/JS for the site itself. Tests use Jest.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000/production/index.html.
