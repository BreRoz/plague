"use client";

import { useState } from "react";

const locations = [
  { id:"irkutsk", name:"Irkutsk region", country:"Russia", status:"1 reported death · 1 additional illness report unverified", detail:"A 28-year-old employee of the Irkutsk Anti-Plague Research Institute died after developing severe pneumonia. Russia’s public-health agency says her illness was pneumonia of unknown cause and reported no plague among her contacts. Testing identified two COVID-19 infections and two rhinovirus infections, but no pathogens causing other infectious diseases. WHO says it has also requested information about media reports of a second employee with pneumonia of undetermined cause. That additional illness remains unverified; no second plague case has been confirmed. AP reports WHO assessed risk as very low for the European region. See the source desk for the reporting and uncertainty.", source:"Associated Press", sourceUrl:"https://apnews.com/article/5aa82b8bc3d8300c551cd0e1bf91e32c", updated:"Oct. 7, 2026", x:"78.9%", y:"20.9%", tone:"suspected", metrics: [
    { label:"Reported illnesses under review", value:"2 reports", note:"Second illness unverified" },
    { label:"Confirmed plague cases", value:"None reported", note:"No diagnosis confirmed" },
    { label:"Reported deaths", value:"1", note:"Plague cause unconfirmed" },
    { label:"Contacts placed under observation", value:"189", note:"Reported Oct. 5 · CNBC" },
    { label:"Confirmed secondary plague cases", value:"None reported", note:"Additional illness report unverified" },
    { label:"Investigation status", value:"Diagnosis unresolved", note:"Suspected pneumonic plague" },
  ] },
];

const stories = [
  { source:"Spectrum News · AP", date:"Oct. 7, 2026", time:"10:46 AM CT", title:"Russia keeps a tight lid on suspected pneumonic plague case", summary:"Russia says no plague is registered; WHO presses for answers on the death.", tags:["No plague registered", "Cause unresolved", "Transparency concerns"], url:"https://spectrumlocalnews.com/nys/binghamton/health/2026/10/07/russia-quiet-suspected-case-of-pneumonic-plague", authorityUrl:"https://www.who.int/news-room/fact-sheets/detail/plague", authority:"WHO disease context" },
  { source:"Forbes", date:"Oct. 7, 2026", time:"Oct. 7", title:"WHO seeks details about report of a second illness", summary:"WHO seeks details on the death and a reported second illness, still unverified.", tags:["Second illness unverified", "WHO information request"], url:"https://www.forbes.com/sites/siladityaray/2026/10/07/russian-plague-scare-who-seeks-details-about-reported-second-illness-as-trump-plans-putin-call/", authorityUrl:"https://www.who.int/news-room/fact-sheets/detail/plague", authority:"WHO disease context"},
  { source:"The Independent", date:"Oct. 7, 2026", time:"Oct. 7", title:"WHO investigates reports of a second possible case", summary:"Local outlet reports a second Irkutsk death; WHO is checking. Unconfirmed.", tags:["Local media report", "Not confirmed"], url:"https://www.the-independent.com/news/world/europe/russia-plague-second-case-lab-siberia-b3062609.html", authorityUrl:"https://www.who.int/news-room/fact-sheets/detail/plague", authority:"WHO disease context"},
  { source:"The Hill", date:"Oct. 6, 2026", time:"Oct. 7", title:"Rubio calls on Russia to share more information", summary:"Rubio urges Russia to share more; WHO calls risk low. Plague unconfirmed.", tags:["U.S. response", "Diagnosis unconfirmed"], url:"https://thehill.com/policy/healthcare/6133282-world-health-organization-russia-plague-lab-death/", authorityUrl:"https://www.cdc.gov/plague/", authority:"CDC plague guidance"},
  { source:"POLITICO Europe", date:"Oct. 6, 2026", time:"5:18 PM CT", title:"WHO seeks information from Russia about suspected plague case", summary:"WHO verifying the death with Russia; no contacts have symptoms; risk low.", tags:["WHO information request", "Cause unconfirmed", "Low public risk"], url:"https://www.politico.eu/article/world-health-organization-who-information-pneumonia-russia-plague/", authorityUrl:"https://www.who.int/news-room/fact-sheets/detail/plague", authority:"WHO disease context"},
  {"source": "Axios", "date": "Oct. 6, 2026", "time": "5:18 PM CT", "title": "CDC monitors suspected Russian case", "summary": "CDC is coordinating federal assessments and says it is ready to respond.", "tags": ["U.S. monitoring"], "url": "https://www.axios.com/2026/10/06/cdc-russia-pneumonic-plague-outbreak-threat-us-risk", "authorityUrl": "https://www.cdc.gov/plague/", "authority": "CDC plague guidance"},
  {"source": "Associated Press", "date": "Oct. 6, 2026", "time": "5:18 PM CT", "title": "WHO assesses risk outside Russia as very low", "summary": "WHO rates risk very low for Europe, sees no COVID-like situation.", "tags": ["WHO assessment", "Diagnosis unconfirmed"], "url": "https://apnews.com/article/russia-plague-trump-who-irkutsk-5aa82b8bc3d8300c551cd0e1bf91e32c", "authorityUrl": "https://www.who.int/news-room/fact-sheets/detail/plague", "authority": "WHO disease context"},
  {"source": "Fox News", "date": "Oct. 6, 2026", "time": "5:18 PM CT", "title": "Former arms-control official raises concerns about resistant plague", "summary": "Ex-official recalls Soviet-era resistant plague research; no link shown.", "tags": ["Expert commentary", "Unverified hypothesis"], "url": "https://www.foxnews.com/politics/russian-researchers-mystery-death-could-be-far-worse-than-plague-former-senior-trump-official-warns", "authorityUrl": "https://www.who.int/news-room/fact-sheets/detail/plague", "authority": "WHO disease context"},
  {"source": "The Atlantic · Opinion", "date": "Oct. 6, 2026", "time": "5:18 PM CT", "title": "Analysis calls for transparency on Siberian lab death", "summary": "Opinion: Russia’s thin answers demand scrutiny; lab theories unproven.", "tags": ["Opinion / analysis", "Transparency"], "url": "https://www.theatlantic.com/ideas/2026/10/russia-siberia-pneumonic-plague/688895/", "authorityUrl": "https://www.who.int/news-room/fact-sheets/detail/plague", "authority": "WHO disease context"},

  { source:"Reuters", date:"Oct. 6, 2026", time:"12:55 PM CT", title:"Russia reports no plague cases among contacts of deceased lab worker", summary:"No plague among contacts, Russia says; not ruled out in the death.", tags:["No plague among contacts", "Cause unresolved", "Local services resumed"], url:"https://www.reuters.com/business/healthcare-pharmaceuticals/russia-says-no-plague-cases-have-been-detected-among-contacts-deceased-lab-2026-10-06/", authorityUrl:"https://www.who.int/news-room/fact-sheets/detail/plague", authority:"WHO disease context" },
  { source:"The Washington Post", date:"Oct. 5, 2026", time:"2:16 PM CT", title:"U.S. officials seek details on reported Russian plague death and quarantines", summary:"U.S. agencies seek details; diagnosis unconfirmed, U.S. risk low.", tags:["U.S. monitoring", "Diagnosis unconfirmed"], url:"https://www.washingtonpost.com/politics/2026/10/05/us-officials-seeking-details-reported-russian-plague-death-quarantines/", authorityUrl:"https://www.who.int/news-room/fact-sheets/detail/plague", authority:"WHO disease context" },
  { source:"NBC News", date:"Oct. 5, 2026", time:"2:16 PM CT", title:"Lab worker dies as nearly 200 contacts are monitored", summary:"Nearly 200 people monitored after the lab worker’s death; plague unconfirmed.", tags:["189 monitored", "Precautionary measures"], url:"https://www.nbcnews.com/world/europe/russia-plague-suspected-lab-worker-dies-200-medical-observation-rcna601559", authorityUrl:"https://www.cdc.gov/plague/", authority:"CDC plague guidance" },
  { source:"CNBC", date:"Oct. 5, 2026", time:"2:16 PM CT", title:"Nearly 200 monitored after researcher’s death", summary:"189 people monitored, a hospital quarantined; Russia has not confirmed plague.", tags:["189 monitored", "No official confirmation"], url:"https://www.cnbc.com/2026/10/05/suspected-plague-cases-reported-in-russias-irkutsk-region.html", authorityUrl:"https://www.who.int/news-room/fact-sheets/detail/plague", authority:"WHO disease context" },
  { source:"Axios", date:"Oct. 4, 2026", time:"2:16 PM CT", title:"White House monitors suspected plague case in Russia", summary:"White House monitoring reports and assessing options; plague unconfirmed.", tags:["White House monitoring", "Suspected case"], url:"https://www.axios.com/2026/10/04/russia-plague-outbreak-white-house-us", authorityUrl:"https://www.cdc.gov/plague/", authority:"CDC plague guidance" },
];

const reportingColumns = [
  { title: "Reasons for concern", tone: "concern", items: [
    { title: "The cause of death remains unresolved.", text: "A 28-year-old anti-plague institute employee was hospitalized Sept. 29 and died Oct. 2 after developing severe pneumonia. Officials describe it as pneumonia of unknown cause and have not confirmed what caused her illness.", sources: ["Spectrum News · AP", "Reuters"] },
    { title: "The investigation prompted substantial precautions.", text: "Reports described 189 people under medical observation. As of Oct. 7, the hospital where she died remained under quarantine, not admitting or discharging patients, though its outpatient clinic kept operating.", sources: ["CNBC", "Spectrum News · AP"] },
    { title: "Important questions remain unanswered.", text: "WHO has asked Russia to clarify the cause of the pneumonia and the pathogen that prompted public-health measures, and U.S. officials have urged Russia to share more. WHO is also seeking information about a reported second employee with unexplained pneumonia, and a local outlet reported a second death at an Irkutsk medical facility. Neither report is verified.", sources: ["Spectrum News · AP", "The Hill", "The Independent"] },
    { title: "Pneumonic plague can be serious if confirmed.", text: "It can spread between people through respiratory particles and requires rapid treatment.", sources: ["WHO"] },
  ] },
  { title: "Reasons for reassurance", tone: "reassurance", items: [
    { title: "Plague has not been confirmed in this investigation.", text: "Moscow told WHO no plague case has been registered in the Irkutsk region, and Russia’s public-health agency says testing found no evidence her illness was caused by the pathogens she worked with. The death remains a suspected case.", sources: ["Spectrum News · AP", "Reuters"] },
    { title: "No plague has been found among contacts.", text: "Russia reported no dangerous infectious-disease pathogens among her contacts. Testing found two COVID-19 and two rhinovirus infections, and no contacts have shown health changes associated with infectious disease.", sources: ["Reuters", "Spectrum News · AP"] },
    { title: "WHO rates the wider risk as low to very low.", text: "WHO’s initial assessment rates the risk as moderate to low in Irkutsk, low for Russia as a whole, and very low for the WHO European region. AP reports WHO sees no indication of a situation similar to the COVID-19 pandemic.", sources: ["UN News", "Associated Press"] },
    { title: "Plague is treatable.", text: "Antibiotics are effective, and early diagnosis and treatment can save lives.", sources: ["WHO"] },
  ] },
];

function reportingSourceUrl(source: string) {
  if (source === "WHO") return "https://www.who.int/news-room/fact-sheets/detail/plague";
  if (source === "UN News") return "https://news.un.org/en/story/2026/10/1168533";
  return stories.find(story => story.source === source)!.url;
}

export default function Home() {
  const [active, setActive] = useState(locations[0]);
  const [shared, setShared] = useState(false);
  const [showAllStories, setShowAllStories] = useState(false);
  const visibleStories = showAllStories ? stories : stories.slice(0, 5);
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
        <a className="brand" href="#top" aria-label="Plague Map 2026 home"><span className="brand-mark" aria-hidden="true">&gt;_</span><span>PLAGUE_MAP <b>2026</b></span></a>
        <button className="share" onClick={shareTracker} type="button"><span aria-hidden="true">↗</span> {shared ? "Link copied" : "Share tracker"}</button>
      </header>
      <div className="system-bar"><span>PUBLIC REPORT ARCHIVE // TERMINAL 026</span><span>CONNECTION ESTABLISHED</span></div>
      <nav className="terminal-nav" aria-label="Report sections"><a href="#reporting-title">[01] EVIDENCE</a><a href="#map-title">[02] MAP</a><a href="#updates-title">[03] DISPATCHES</a><a href="#guide-title">[04] HELP</a></nav>
      <section className="hero" id="top">
        <h1>PNEUMONIC PLAGUE<span className="title-secondary">SURVEILLANCE TERMINAL<span className="cursor" aria-hidden="true">█</span></span></h1>
        <p className="dek">Public sources. Verified signals. Unresolved reports. Examine what’s confirmed and what remains unknown. Informational only—not medical advice.</p>
        <div className="stats" aria-label="Tracked reports and reported medical observation">
          <div className="stat stat-deaths"><span>Confirmed deaths</span><strong>000</strong></div>
          <div className="stat stat-confirmed"><span>Confirmed cases</span><strong>000</strong></div>
          <div className="stat stat-suspected"><span>Unverified reports</span><strong>002</strong></div>
          <div className="stat stat-observation"><span>Under observation <small>Reported Oct. 5</small></span><strong>189</strong></div>
        </div>
      </section>
      <section className="reporting-context" aria-labelledby="reporting-title">
        <div className="section-head"><div><span className="kicker">01 / EVIDENCE.LOG</span><h2 id="reporting-title">What the reporting tells us</h2></div></div>
        <p className="reporting-intro">The investigation is unresolved. Here are the concerns and reassuring findings reported so far.</p>
        <div className="reporting-columns">{reportingColumns.map(column => <article className={`reporting-column ${column.tone}`} key={column.title}>
          <h3>{column.title}</h3>
          <ul>{column.items.map(item => <li key={item.title}><h4>{item.title}</h4><p>{item.text}</p><div className="reporting-sources">Sources: {item.sources.map((source, index) => <span key={source}>{index > 0 ? " · " : ""}<a href={reportingSourceUrl(source)} target="_blank" rel="noreferrer">{source === "Associated Press" ? "AP" : source} ↗</a></span>)}</div></li>)}</ul>
        </article>)}</div>
      </section>
      <section className="map-section" aria-labelledby="map-title">
        <div className="section-head"><div><span className="kicker">02 / GEOLOCATION.SYS</span><h2 id="map-title">Case map</h2></div><div className="legend"><span><i className="confirmed-key" /> Confirmed</span><span><i className="suspected-key" /> Unverified</span></div></div>
        <div className="map-frame"><div className="window-bar"><span>WORLD_MAP.SYS</span><span aria-hidden="true">[ − ][ □ ][ × ]</span></div>
          <div className="map-visual">
            <img src="/world-map.svg" alt="World map showing reported plague locations" />
            {locations.map((location) => <button key={location.id} className={`map-pin ${location.tone} ${active.id === location.id ? "active" : ""}`} style={{left:location.x,top:location.y}} onClick={() => setActive(location)} aria-label={`${location.name}: ${location.status}`} type="button"><span /></button>)}
          </div>
          <div className="map-card" aria-live="polite"><span className={`status ${active.tone}`}>{active.status}</span><h3>{active.name}</h3><small>{active.country}</small>
            <dl className="location-metrics" aria-label={`${active.name} incident data`}>{active.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}<small>{metric.note}</small></dd></div>)}</dl>
            <p className="incident-note">The suspected case and reported death refer to the same person. Observation does not mean infection; 189 is the reported number placed under monitoring, not a verified current total.</p>
            <h4 className="incident-story-title">Incident report</h4><p>{active.detail}</p><div className="card-source"><a href={active.sourceUrl} target="_blank" rel="noreferrer">Source: {active.source} ↗</a><a href="https://www.cnbc.com/2026/10/05/russia-plague-suspected-case-irkutsk.html" target="_blank" rel="noreferrer">Observation: CNBC</a><a href="https://www.ecdc.europa.eu/en/news-events/ecdc-closely-monitoring-situation-following-case-pneumonia-unknown-origin-russia" target="_blank" rel="noreferrer">Secondary cases: ECDC</a><span>Evidence reviewed {active.updated} · 5:18 PM CT</span></div></div>
        </div>
        <p className="map-note">Tap a marker for details · Locations are approximate</p>
      </section>
      <section className="updates" aria-labelledby="updates-title">
        <div className="section-head stories-head"><div><span className="kicker">03 / INCOMING DISPATCHES</span><h2 id="updates-title">Latest updates</h2></div><span className="last-updated">Last updated Oct. 7, 2026</span></div>
        <div className="story-list">{visibleStories.map((story) => <article className="story" key={story.url}><time className="story-date">{story.date}</time><div className="story-body"><div className="story-meta"><b>{story.source}</b><time>Reviewed {story.time}</time></div><h3>{story.title}</h3><p>{story.summary}</p><div className="authority-line">Authority reference: <a href={story.authorityUrl} target="_blank" rel="noreferrer">{story.authority} ↗</a></div><div className="story-footer"><div className="tags">{story.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href={story.url} target="_blank" rel="noreferrer">Read report <span aria-hidden="true">↗</span></a></div></div></article>)}</div>
        {stories.length > 5 && <button type="button" className="see-more" aria-expanded={showAllStories} onClick={() => setShowAllStories(!showAllStories)}>{showAllStories ? "Show fewer" : `See more (${stories.length - 5} older)`}</button>}
      </section>
      <section className="field-guide" aria-labelledby="guide-title">
        <div className="section-head guide-head"><div><span className="kicker">04 / README.TXT</span><h2 id="guide-title">Understand the map</h2></div><p>How we report, what plague is, and practical ways to reduce risk.</p></div>
        <div className="drawers">
          <details>
            <summary><span>01</span> How this tracker works <i>+</i></summary>
            <div className="drawer-copy"><p>Plague Map 2026 is a manually maintained record of credible public reporting. We review the source, identify the location described, and classify each report before placing it on the map. A map marker represents a reported event—not a measurement of community-wide transmission.</p><p><b>Confirmed</b> means an identified public-health authority reports a positive diagnostic result. <b>Unverified</b> means credible reporting exists but no confirming notice from WHO, CDC, ECDC, or the relevant national or local health authority has been identified. Counts change only when new sourcing supports a change. Locations are approximate to protect privacy and because reports often identify a city or region rather than an exact address.</p><p>Every numerical claim carries a source and review timestamp. We prioritize WHO, CDC, ECDC, national ministries, and local public-health agencies. News reports may provide context but are never presented as official confirmation. We do not treat social posts, anonymous claims, crowdsourced submissions, or duplicated coverage as confirmed cases.</p></div>
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
      <footer><span>Plague Map 2026</span><nav aria-label="Site information"><a href="/about">About</a><a href="/contact">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav><p>© 2026 <a href="https://hoursand.co/" target="_blank" rel="noreferrer">Hours &amp; Co.</a></p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
