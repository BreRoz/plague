import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the plague tracker and new article dispatches", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Pneumonic Plague<\/title>/i);
  assert.match(html, /PNEUMONIC PLAGUE/);
  assert.match(html, /WHO investigates reports of a second possible case/);
  assert.match(html, /Rubio calls on Russia to share more information/);
  assert.match(html, /WHO seeks details about report of a second illness/);
  assert.match(html, /https:\/\/www\.the-independent\.com\/news\/world\/europe\/russia-plague-second-case-lab-siberia-b3062609\.html/);
  assert.match(html, /https:\/\/thehill\.com\/policy\/healthcare\/6133282-world-health-organization-russia-plague-lab-death\//);
  assert.match(html, /https:\/\/www\.forbes\.com\/sites\/siladityaray\/2026\/10\/07\/russian-plague-scare-who-seeks-details-about-reported-second-illness-as-trump-plans-putin-call\//);
});

test("keeps the additional illness explicitly unverified at one map location", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /Unverified reports[\s\S]*?002/);
  assert.match(html, /Second illness unverified/);
  assert.match(html, /no second plague case has been confirmed/i);
  assert.match(html, /WHO is seeking details about an unverified report of a second employee with pneumonia/);
  assert.equal((html.match(/class="map-pin /g) ?? []).length, 1);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/);
});
