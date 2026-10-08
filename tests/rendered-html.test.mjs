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
  assert.match(html, /<title>Plague Map 2026 — Russia Plague Investigation Tracker<\/title>/i);
  assert.match(html, /PNEUMONIC PLAGUE/);
  assert.match(html, /Russia dismisses second-case reports; WHO asks Moscow to respond/);
  assert.match(html, /What to know about pneumonic plague after the Irkutsk death/);
  assert.match(html, /Trump says Putin call is scheduled; Kremlin says nothing arranged/);
  assert.match(html, /Experts weigh in on whether the suspected case could lead to an outbreak/);
  assert.match(html, /Russia keeps a tight lid on suspected pneumonic plague case/);
  assert.match(html, /https:\/\/www\.aljazeera\.com\/news\/2026\/10\/8\/russia-dismisses-reports-of-second-plague-case-as-false-information/);
  assert.match(html, /https:\/\/www\.nbcnews\.com\/health\/health-news\/plague-suspected-russia-lab-pneumonic-siberia-symptoms-treatment-rcna601589/);
});

test("keeps the additional illness explicitly unverified at one map location", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /Unverified reports[\s\S]*?002/);
  assert.match(html, /Second illness unverified/);
  assert.match(html, /no second plague case has been confirmed/i);
  assert.equal((html.match(/class="map-pin /g) ?? []).length, 1);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/);
});

test("answers the current status in crawlable HTML from one data source", async () => {
  const response = await render();
  const html = await response.text();
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
  assert.match(html, /<h1><span class="title-kicker">Plague Map 2026/);
  assert.match(html, /<h2 id="situation-title">Current situation<\/h2>/);
  assert.match(text, /As of Oct\. 8, 2026, no confirmed plague cases have been reported in the Irkutsk region, Russia, investigation/);
  assert.match(text, /2 unverified illness reports, 1 reported death whose cause has not been confirmed as plague, and 189 people reported as under medical observation/);
  assert.match(text, /People under observation are not confirmed plague cases\./);
  assert.match(text, /No confirmed plague outbreak has been established in the sources reviewed by this tracker/);
  assert.match(text, /not a government agency or an official public-health surveillance system/);
  assert.match(html, /<dt>Confirmed plague cases<\/dt><dd><span class="readout-value">0<\/span>/);
  assert.match(html, /<dt>Confirmed plague deaths<\/dt><dd><span class="readout-value">0<\/span>/);
  assert.match(html, /<time dateTime="2026-10-08">Oct\. 8, 2026<\/time>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/plaguemap2026\.com\/?"/);

  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const nodes = schemas.flatMap(schema => schema["@graph"] ?? [schema]);
  const dataset = nodes.find(node => node["@type"] === "Dataset");
  assert.ok(dataset, "Dataset JSON-LD present");
  assert.equal(dataset.variableMeasured.find(v => v.name === "Confirmed plague cases").value, 0);
  assert.equal(dataset.variableMeasured.find(v => v.name.startsWith("People under medical observation")).value, 189);
  for (const type of ["WebSite", "WebPage", "Organization", "FAQPage"]) assert.ok(nodes.some(node => node["@type"] === type), `${type} JSON-LD present`);
});
