"use client";

import { useState } from "react";

const locations = [
  { id:"tahoe", name:"South Lake Tahoe", country:"United States", status:"Confirmed case", detail:"One resident tested positive after a likely infected flea bite while camping.", x:"16.7%", y:"28.4%", tone:"confirmed" },
  { id:"irkutsk", name:"Irkutsk region", country:"Russia", status:"Suspected case", detail:"A laboratory worker’s death is under scrutiny; Russian authorities deny plague was confirmed.", x:"78.9%", y:"20.9%", tone:"suspected" },
];

const stories = [
  { source:"CBS News", date:"Oct. 5, 2026", title:"Russia disputes plague fears after scientist’s death", summary:"Russian authorities deny a lab accident and attribute the death to pneumonia of unknown origin. Nearly 200 contacts were tested, with no dangerous pathogen reported.", tags:["1 suspected", "Under investigation"], url:"https://www.cbsnews.com/news/russia-plague-lab-death-pneumonia-of-unknown-origin" },
  { source:"ABC News", date:"Aug. 20, 2025", title:"California resident tests positive for plague", summary:"A South Lake Tahoe resident likely contracted plague from an infected flea while camping. Officials say public and person-to-person transmission risk remains low.", tags:["1 confirmed", "Low public risk"], url:"https://abcnews.com/Health/california-resident-tests-positive-plague/story?id=124814023" },
];

export default function Home() {
  const [active, setActive] = useState(locations[0]);
  const [shared, setShared] = useState(false);
  async function shareTracker() {
    const data = { title:"Plague Map 2026", text:"Follow confirmed and suspected plague reports worldwide.", url:window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(window.location.href); setShared(true); window.setTimeout(() => setShared(false), 1800); }
    } catch { /* A dismissed native share sheet needs no follow-up. */ }
  }
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Plague Map 2026 home"><span className="brand-mark" aria-hidden="true">P26</span><span>Plague Map <b>2026</b></span></a>
        <button className="share" onClick={shareTracker} type="button"><span aria-hidden="true">↗</span> {shared ? "Link copied" : "Share tracker"}</button>
      </header>
      <section className="hero" id="top">
        <div className="eyebrow"><span className="live-dot" /> Live situation report</div>
        <h1>A clear view of reported plague cases worldwide.</h1>
        <p className="dek">Verified reporting, mapped simply. Updated from trusted sources as new information becomes available.</p>
        <div className="stats" aria-label="Current plague report totals">
          <div className="stat stat-deaths"><span>Confirmed deaths</span><strong>0</strong></div>
          <div className="stat stat-confirmed"><span>Confirmed cases</span><strong>1</strong></div>
          <div className="stat stat-suspected"><span>Suspected cases</span><strong>1</strong></div>
        </div>
      </section>
      <section className="map-section" aria-labelledby="map-title">
        <div className="section-head"><div><span className="kicker">Global overview</span><h2 id="map-title">Case map</h2></div><div className="legend"><span><i className="confirmed-key" /> Confirmed</span><span><i className="suspected-key" /> Suspected</span></div></div>
        <div className="map-frame">
          <img src="/world-map.svg" alt="World map showing reported plague locations" />
          {locations.map((location) => <button key={location.id} className={`map-pin ${location.tone} ${active.id === location.id ? "active" : ""}`} style={{left:location.x,top:location.y}} onClick={() => setActive(location)} aria-label={`${location.name}: ${location.status}`} type="button"><span /></button>)}
          <div className="map-card" aria-live="polite"><span className={`status ${active.tone}`}>{active.status}</span><h3>{active.name}</h3><small>{active.country}</small><p>{active.detail}</p></div>
        </div>
        <p className="map-note">Tap a marker for details · Locations are approximate</p>
      </section>
      <section className="updates" aria-labelledby="updates-title">
        <div className="section-head stories-head"><div><span className="kicker">Source desk</span><h2 id="updates-title">Latest updates</h2></div><span className="last-updated">Last updated Oct. 5, 2026</span></div>
        <div className="story-list">{stories.map((story,index) => <article className="story" key={story.url}><div className="story-number">0{index+1}</div><div className="story-body"><div className="story-meta"><b>{story.source}</b><span>{story.date}</span></div><h3>{story.title}</h3><p>{story.summary}</p><div className="story-footer"><div className="tags">{story.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href={story.url} target="_blank" rel="noreferrer">Learn more <span aria-hidden="true">↗</span></a></div></div></article>)}</div>
      </section>
      <section className="field-guide" aria-labelledby="guide-title">
        <div className="section-head guide-head"><div><span className="kicker">Reader’s field guide</span><h2 id="guide-title">Understand the map</h2></div><p>How we report, what plague is, and practical ways to reduce risk.</p></div>
        <div className="drawers">
          <details open>
            <summary><span>01</span> How this tracker works <i>+</i></summary>
            <div className="drawer-copy"><p>Plague Map 2026 is a manually maintained record of credible public reporting. We review the source, identify the location described, and classify each report before placing it on the map. A map marker represents a reported event—not a measurement of community-wide transmission.</p><p><b>Confirmed</b> means a health authority or reputable news organization reports a positive diagnostic result. <b>Suspected</b> means plague is credibly under investigation but has not been verified, or authorities dispute the diagnosis. Counts change only when new sourcing supports a change. Locations are approximate to protect privacy and because reports often identify a city or region rather than an exact address.</p><p>We link every update to its original reporting so readers can inspect the source and context. We do not treat social posts, anonymous claims, or duplicated coverage as separate cases.</p></div>
          </details>
          <details>
            <summary><span>02</span> How plague spreads <i>+</i></summary>
            <div className="drawer-copy"><p>Plague is an infection caused by the bacterium <em>Yersinia pestis</em>, which is carried by some small mammals and their fleas. People are most often infected through the bite of an infected flea. Infection can also follow unprotected contact with infected animals or contaminated tissue.</p><p>Bubonic plague commonly affects the lymph nodes. Septicemic plague involves the bloodstream. Pneumonic plague affects the lungs and is the form that can spread between people through respiratory particles during close, direct contact. Bubonic plague does not ordinarily spread person to person.</p><p>Symptoms often begin suddenly and can include fever, chills, weakness, headache, painful swollen lymph nodes, or—when the lungs are involved—cough, chest pain, and difficulty breathing. Plague is treatable with antibiotics, and early medical care matters.</p><div className="source-links">Medical references: <a href="https://www.who.int/news-room/fact-sheets/detail/plague" target="_blank" rel="noreferrer">WHO plague fact sheet ↗</a> <a href="https://www.cdc.gov/plague/" target="_blank" rel="noreferrer">CDC plague guidance ↗</a></div></div>
          </details>
          <details>
            <summary><span>03</span> How to protect yourself <i>+</i></summary>
            <div className="drawer-copy"><p>In places where plague occurs naturally, reduce contact with rodents and fleas. Do not handle sick or dead wild animals. Keep campsites and homes clear of food, brush, woodpiles, and rubbish that can attract rodents. Use an appropriate insect repellent when exposure to fleas is possible, and keep pets on veterinarian-recommended flea control.</p><p>If you become ill after a flea bite, contact with a wild animal, or close exposure to someone suspected of having pneumonic plague, contact a healthcare professional promptly and explain the possible exposure. Do not rely on this tracker to diagnose illness or decide whether to seek care.</p><p>Local public-health agencies are the best source for instructions during an active investigation. In an emergency or if severe symptoms develop, seek urgent medical care.</p><div className="source-links">Prevention reference: <a href="https://www.cdc.gov/plague/prevention/index.html" target="_blank" rel="noreferrer">CDC prevention guidance ↗</a></div></div>
          </details>
          <details>
            <summary><span>04</span> Limits and corrections <i>+</i></summary>
            <div className="drawer-copy"><p>This project is a news and public-information index, not an official surveillance system. Reporting can be delayed, incomplete, corrected, or contradicted as laboratory results and investigations develop. A suspected report may later be confirmed, ruled out, or remain unresolved.</p><p>We distinguish publication dates from event dates where the source makes that possible, avoid guessing missing facts, and update labels when better evidence appears. If you find a factual error or a stronger primary source, send it to <a href="mailto:hoursandco.studio@gmail.com">hoursandco.studio@gmail.com</a> with the relevant link.</p></div>
          </details>
        </div>
      </section>
      <aside className="context"><span className="context-icon" aria-hidden="true">i</span><div><h2>Keep this in context</h2><p>Plague is rare and treatable with antibiotics when caught early. This tracker summarizes public reporting and is not a public-health authority.</p></div></aside>
      <footer><span>Plague Map 2026</span><nav aria-label="Site information"><a href="/about">About</a><a href="/contact">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav><p>© 2026 Hours &amp; Co.</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
