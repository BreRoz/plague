# Post-Launch Playbook (Phase 2)

Run this once the site is live. It covers what files alone cannot verify — and the AI-citation loop, which is the single biggest reason to test against a real deployed site. Use web/fetch and search tools against the production URL.

> In file mode, copy this file into the project as `SEO-AEO-post-launch.md` and fill in the **site-specific targets** section before launch so it's ready to run.

## Site-specific targets

- Production URL: `https://plaguemap2026.com` (also check that `https://www.plaguemap2026.com` 301-redirects to the apex. Both routes are attached to the Worker, so without a redirect you have duplicate hosts.)
- Top pages to validate: `/` (the tracker, holding all FAQ/answer content), `/about` (the E-E-A-T and publisher page), `/sitemap.xml`, `/robots.txt`
- Primary target queries:
  - pneumonic plague Russia
  - Irkutsk plague / Irkutsk plague case
  - plague tracker / plague map 2026
  - suspected plague case Russia lab worker
  - pneumonic plague 2026
  - is pneumonic plague contagious
- Known competitors (for the same queries): WHO Disease Outbreak News, CDC plague pages, ECDC weekly threats report, AP / Reuters / NBC / CNBC live coverage, Wikipedia (if an article on the incident exists), BNO News and similar outbreak trackers
- Target AI questions to run in ChatGPT, Perplexity, Google AI Overview / Gemini and Claude:
  1. Has pneumonic plague been confirmed in Russia?
  2. What happened at the Irkutsk Anti-Plague Research Institute?
  3. Is there a second plague case in Irkutsk?
  4. How many people are under observation for plague in Russia?
  5. What is WHO's risk assessment for the Russia plague case?
  6. Is pneumonic plague contagious?
  7. Is plague treatable with antibiotics?
  8. Should I be worried about plague in Russia?
  9. Is there a map of plague cases in 2026?
  10. What did the CDC say about the Russian plague case?
  11. Did Trump talk to Putin about the plague case?
  12. Is there a U.S. Embassy health alert for Irkutsk?
  13. Difference between bubonic and pneumonic plague
  14. How does plague spread?
  15. Where is the plague outbreak in 2026?

  For each one, record: cited (Y/N), the URL cited, whether the facts match the tracker as of that date, and which competitor was cited instead.

## Carried over from file mode (could not be done from source)

- **Core Web Vitals, measured live.** The `<head>` loads two third-party scripts, AdSense and gtag (both `async`). Measure their effect on LCP/INP. The home page is one large client component (`"use client"` in `app/page.tsx`), so hydration cost on mobile is worth checking.
- **Map image.** `/world-map.svg` is the likely LCP element. Check its weight and whether it needs `width`/`height` or `fetchpriority="high"`.
- **Freshness signals.** `LAST_UPDATED` in `app/page.tsx` drives the visible date and `dateModified` in the JSON-LD, and `app/sitemap.ts` has its own `lastModified`. Bump all three with each data update, then confirm Google shows the current date in results.
- **FAQPage rich results.** Google limits FAQ rich results to authoritative government/health sites, so expect the markup to help AI extraction more than it changes SERP appearance. Validate it in the Rich Results Test anyway.
- **Search Console.** Verify the domain, submit `/sitemap.xml`, and request indexing of `/` after each major update. This is a breaking-news topic, so crawl speed matters.
- **AI crawler access.** `app/robots.ts` allows every crawler, including GPTBot, ClaudeBot, PerplexityBot and Google-Extended. Confirm Cloudflare's bot settings (Bot Fight Mode / "Block AI bots") aren't overriding that at the edge, because that silently kills AI citations.

---

## 1. Performance — real Core Web Vitals

Measure on the live site (lab + field where available):

- **LCP** (largest contentful paint) — target < 2.5s. Common fixes: optimize/lazy-load the hero image, preload critical assets, cut render-blocking CSS/JS.
- **INP** (interaction to next paint) — target < 200ms. Reduce heavy JS on the main thread.
- **CLS** (cumulative layout shift) — target < 0.1. Set explicit dimensions on images/embeds, reserve space for dynamic content.
- Audit third-party scripts and total image weight — these are usually the biggest live wins and can't be measured from source.

## 2. Indexing & crawl health

- Confirm the site is indexed (site: search; Search Console if the user has it).
- Verify key pages are discoverable and not accidentally `noindex`/blocked on the live host.
- Confirm the live robots.txt and sitemap.xml resolve correctly and the sitemap is submitted.
- Check for crawl errors, redirect chains, and broken internal links on the deployed site.

## 3. SERP & competitor comparison

- Search the primary target queries and record where the site's pages actually appear.
- For each query, examine the top results: what subtopics, formats, depth, and entities do they cover that this site doesn't? This reveals content-depth gaps you can only see against the live competitive set.
- Note featured-snippet and AI-overview presence for each query — and who currently wins them.

## 4. AI-citation loop (highest value)

This is the payoff step and the reason to wait for a live site: you cannot test whether AI engines cite a page until that page is live and (ideally) indexed.

For each target question, query the engines and record the result:

1. **ChatGPT** (with browsing/search) — does the answer cite or surface the site? Is its info accurate?
2. **Perplexity** — is the site among the cited sources? Perplexity citations are explicit and easy to read.
3. **Google AI Overview / Gemini** — does the site appear in the overview or its source links?
4. (Optionally Claude with search.)

For every **miss**, diagnose the cause and map to a fix:

| Why it wasn't cited | Fix |
|---|---|
| Answer not extractable (buried, vague) | Restructure to answer-first; add a direct definition/answer block |
| No structured data | Add the relevant schema (FAQPage, Article, etc.) |
| Page not indexed | Resolve indexing/crawl issue first |
| Thin / no distinctive info | Add a real statistic, framework, or original insight worth quoting |
| Wrong entity understanding | Clarify what the product is/category/audience consistently across pages |
| Not seen as authoritative | Build supporting content, earn mentions/links over time |

Re-test after fixes ship and indexing catches up. Citation visibility lags deploys — set expectations that some wins take a re-crawl cycle.

## 5. Deliver the prioritized fix list

Group findings:

- **Quick wins (0–30 days)** — high impact, low effort: extractable-answer rewrites, missing schema, indexing fixes, obvious CWV wins (image optimization).
- **Mid-term (30–90 days)** — content-depth gaps vs competitors, new FAQ/comparison/definition pages the citation loop showed were missing, internal-linking buildout.
- **Strategic (90+ days)** — topical authority clusters, original research/benchmark assets that earn citations and links, any SSR/prerender migration flagged in file mode.

Tie each item to what the live test revealed, so the user can see why it's on the list.
