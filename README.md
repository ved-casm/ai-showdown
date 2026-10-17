# AI Showdown

One prompt, three AIs - a scrapbook-style showdown of Gemini vs ChatGPT vs a Personal Agent on photorealistic product imagery.

Live: https://ai-showdown-vg.vercel.app/

## What is in it

- **The cast** - two characters, Emma and Jake. Each has an avatar-generation prompt and the avatars made by all three models, side by side.
- **Product rounds** - watch, headphones, honey, pillow and perfume. Each round shows the exact prompt with the three models' outputs next to it. Rounds with people use Emma and Jake, and the perfume round is product-only.
- **Scrapbook design** - dotted paper, washi tape, sticky notes, polaroids on a string, a marquee and a radio-style tuner nav for jumping between categories.
- **Contact form** - sends a themed thank-you email to the visitor and a notification to the site owner.
- **/production** - static concept pages for three fictional brands, with an Old/New switch to move between the two versions of the site.

## Content

All rounds, prompts and image paths live in `data/products.ts`. Images are AVIF files in `public/images` (our outputs) and `public/uploads` (Gemini and ChatGPT outputs). An empty path renders a "waiting for upload" placeholder.

## Stack

Next.js (App Router), React 19, TypeScript, Lenis for smooth scrolling, sharp for image processing. Tests use Jest and React Testing Library.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm test         # Jest
npm run build    # production build
```
