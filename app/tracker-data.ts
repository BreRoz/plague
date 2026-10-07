// Single source of truth for the tracker's headline status. The hero counters,
// the Current Situation block, the map card metrics, the FAQ answers, the
// JSON-LD, the page metadata and the sitemap all read from this file. Change a
// number here and every place that shows it updates.

export const SITE_URL = "https://plaguemap2026.com";

/** When the tracker's data last changed (drives "Last updated", dateModified and the sitemap). */
export const LAST_UPDATED = { label: "Oct. 7, 2026", iso: "2026-10-07" };

/** When the evidence behind the counts was last reviewed. Add a time (e.g. "2026-10-08T09:15-05:00") when known. */
export const EVIDENCE_REVIEWED = { label: "Oct. 7, 2026", iso: "2026-10-07" };

export const SOURCES = {
  ap: { name: "Associated Press", url: "https://apnews.com/article/5aa82b8bc3d8300c551cd0e1bf91e32c" },
  spectrumAp: { name: "Spectrum News · AP", url: "https://spectrumlocalnews.com/nys/binghamton/health/2026/10/07/russia-quiet-suspected-case-of-pneumonic-plague" },
  reuters: { name: "Reuters", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/russia-says-no-plague-cases-have-been-detected-among-contacts-deceased-lab-2026-10-06/" },
  forbes: { name: "Forbes", url: "https://www.forbes.com/sites/siladityaray/2026/10/07/russian-plague-scare-who-seeks-details-about-reported-second-illness-as-trump-plans-putin-call/" },
  cnbc: { name: "CNBC", url: "https://www.cnbc.com/2026/10/05/russia-plague-suspected-case-irkutsk.html" },
  ecdc: { name: "ECDC", url: "https://www.ecdc.europa.eu/en/news-events/ecdc-closely-monitoring-situation-following-case-pneumonia-unknown-origin-russia" },
} as const;

export type Source = (typeof SOURCES)[keyof typeof SOURCES];

export const STATUS = {
  location: "Irkutsk region",
  country: "Russia",
  investigation: "Diagnosis unresolved",
  investigationNote: "Suspected pneumonic plague",
  confirmedCases: 0,
  confirmedSecondaryCases: 0,
  confirmedDeaths: 0,
  suspectedCases: 1,
  unverifiedReports: 2,
  reportedDeaths: 1,
  underObservation: 189,
  observationReported: { label: "Oct. 5, 2026", short: "Oct. 5", iso: "2026-10-05", source: SOURCES.cnbc },
};

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export const STATUS_HEADLINE = STATUS.confirmedCases === 0
  ? "No confirmed plague cases reported"
  : `${count(STATUS.confirmedCases, "confirmed plague case", "confirmed plague cases")} reported`;

export const STATUS_SUMMARY = `As of ${LAST_UPDATED.label}, ${STATUS.confirmedCases === 0
  ? "no confirmed plague cases have been reported"
  : `${count(STATUS.confirmedCases, "confirmed plague case has", "confirmed plague cases have")} been reported`} in the ${STATUS.location}, ${STATUS.country}, investigation tracked by Plague Map 2026.`;

export const STATUS_BREAKDOWN = `The investigation includes ${count(STATUS.unverifiedReports, "unverified illness report", "unverified illness reports")}, ${count(STATUS.reportedDeaths, "reported death", "reported deaths")} whose cause has not been confirmed as plague, and ${STATUS.underObservation} people reported as under medical observation (as of ${STATUS.observationReported.short}).`;

export const OUTBREAK_ANSWER = STATUS.confirmedCases === 0
  ? `No confirmed plague outbreak has been established in the sources reviewed by this tracker. It lists ${count(STATUS.suspectedCases, "suspected case", "suspected cases")} whose diagnosis is unresolved, and no official confirmation of plague has been identified.`
  : `${count(STATUS.confirmedCases, "plague case has", "plague cases have")} been confirmed by a public-health authority. See the linked sources for how officials describe the scope of transmission.`;

export const DISCLAIMER = "Plague Map 2026 is an independent tracker published by Hours & Co. It is not a government agency or an official public-health surveillance system.";

/** Convert an AP-style date ("Oct. 7, 2026", "Sept. 30, 2026") to ISO 8601. */
export function isoDate(apDate: string) {
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const match = /^([A-Za-z]+)\.? (\d{1,2}), (\d{4})$/.exec(apDate.trim());
  if (!match) throw new Error(`Unrecognized date: ${apDate}`);
  const month = months.indexOf(match[1].slice(0, 3).toLowerCase()) + 1;
  if (month === 0) throw new Error(`Unrecognized month: ${apDate}`);
  return `${match[3]}-${String(month).padStart(2, "0")}-${match[2].padStart(2, "0")}`;
}
