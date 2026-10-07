# Plague Map 2026

Plague Map 2026 is a public information site that maps reported plague-related events and summarizes source reporting. It distinguishes confirmed cases from unverified reports, links to its sources, and includes context on plague, prevention, and the limits of the tracker.

The incident and news data is maintained in the application source. This project is an independent information index, not an official surveillance system or a substitute for public-health guidance.

## Requirements

- Node.js `>=22.13.0`
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by the development server.

## Commands

```bash
npm run dev       # Start local development
npm run build     # Build the site
npm test          # Build and check rendered HTML
npm run lint      # Run ESLint
npm run deploy    # Build and deploy with Wrangler
```

## Project structure

- `app/` — pages, styles, and the tracker interface
- `public/` — static assets
- `db/` and `examples/d1/` — optional Drizzle and Cloudflare D1 examples
- `worker/` — Cloudflare worker entry point
- `tests/` — rendered HTML check
- `.openai/hosting.json` — OpenAI Sites project configuration

The app uses [vinext](https://github.com/cloudflare/vinext), React, Vite, and Wrangler. Cloudflare deployment requires an appropriately configured Cloudflare account and Wrangler authentication.

## Reporting approach

The map and summaries are manually maintained in `app/page.tsx`. Each report should be checked against its linked source and clearly labeled as confirmed or unverified. News coverage is context, not official confirmation. Please preserve those distinctions when updating the data.

## Health information

Plague is a serious but treatable infection. Follow guidance from local public-health authorities and qualified medical professionals. This site does not diagnose illness or provide emergency advice. See the linked [WHO](https://www.who.int/news-room/fact-sheets/detail/plague) and [CDC](https://www.cdc.gov/plague/) guidance for current health information.

## Contributing

Issues and pull requests are welcome. Include source links for factual changes and explain any changes to report status or counts.
