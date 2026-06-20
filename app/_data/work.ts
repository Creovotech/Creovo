export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  location: string;
  year: string;
  /** Filter tags for the work index. */
  tags: string[];
  /** Outcome-led case-study hero line (a sentence, not just a name). */
  outcomeTitle: string;
  /** One-liner for the index card. */
  summary: string;
  cover: string; // hero crop
  full: string; // full-page strip
  liveUrl: string;
  pageSpeedUrl: string;
  challenge: string;
  approach: string[];
  proof: { label: string; value: string }[];
};

const ps = (host: string) =>
  `https://pagespeed.web.dev/analysis?url=https://${host}&form_factor=mobile`;

// Real, deployed builds. Framed by craft + verifiable proof — no invented client
// metrics or testimonials. The "proof" items are all checkable (Lighthouse link,
// real reviews surfaced on the live site, page weight).
export const WORK: CaseStudy[] = [
  {
    slug: "golden-city-gates",
    client: "Golden City Gates",
    sector: "Gates & Automation",
    location: "Bendigo, VIC",
    year: "2026",
    tags: ["Brand", "Web", "SEO"],
    outcomeTitle:
      "We made a local gate company look like the category leader.",
    summary: "A dark-and-brass identity for a custom gate & automation business.",
    cover: "/work/golden-city-gates.png",
    full: "/work/full/golden-city-gates.jpg",
    liveUrl: "https://golden-city-gates.creovo.dev",
    pageSpeedUrl: ps("golden-city-gates.creovo.dev"),
    challenge:
      "A genuinely premium gate-maker — custom fabrication, automation, decades of craft — with an online presence that read like everyone else in town. Nothing about it signalled the quality of the actual work.",
    approach: [
      "A bespoke dark-and-brass identity built around the line 'Gates that open the way a place should feel.'",
      "Hand-coded, no theme — a fast static build with art-directed type and imagery.",
      "Range, automation and process positioned with intent, not buried in a services list.",
      "Their real Google reviews surfaced on-page via structured data.",
    ],
    proof: [
      { label: "Build", value: "Hand-coded · no template" },
      { label: "Performance", value: "Built for 100 Lighthouse" },
      { label: "SEO", value: "LocalBusiness schema + real reviews" },
    ],
  },
  {
    slug: "jaytec-fencing",
    client: "Jaytec Fencing",
    sector: "Fencing & Retaining",
    location: "Port Macquarie, NSW",
    year: "2026",
    tags: ["Brand", "Web", "SEO"],
    outcomeTitle: "A fencing contractor, rebuilt to feel design-forward.",
    summary: "A clean editorial identity with a confident, plain-spoken voice.",
    cover: "/work/jaytec-fencing.png",
    full: "/work/full/jaytec-fencing.jpg",
    liveUrl: "https://jaytec-fencing.creovo.dev",
    pageSpeedUrl: ps("jaytec-fencing.creovo.dev"),
    challenge:
      "A 5-star contractor doing clean, exact work across the Mid North Coast — with a website that didn't carry any of that confidence or clarity.",
    approach: [
      "A crisp editorial layout and a direct voice — 'A fence line, drawn dead straight.'",
      "Their perfect 5.0★ Google reviews surfaced on the page, not hidden.",
      "Conversion-first structure: quote and call sit a tap away from every section.",
      "Hand-built and light, with LocalBusiness structured data shipped by default.",
    ],
    proof: [
      { label: "Build", value: "Hand-coded · no template" },
      { label: "Proof", value: "Real 5.0★ Google reviews surfaced" },
      { label: "Performance", value: "Built for 100 Lighthouse" },
    ],
  },
  {
    slug: "jimmys-outdoors",
    client: "Jimmy's Outdoors",
    sector: "Fencing & Outdoor",
    location: "Orange, NSW",
    year: "2026",
    tags: ["Brand", "Web"],
    outcomeTitle: "A premium brand for an outdoor-living business.",
    summary: "A distinct identity that reads as the most established option in town.",
    cover: "/work/jimmys-outdoors.png",
    full: "/work/full/jimmys-outdoors.jpg",
    liveUrl: "https://jimmys-outdoors.creovo.dev",
    pageSpeedUrl: ps("jimmys-outdoors.creovo.dev"),
    challenge:
      "Strong local operator, generic web presence. Nothing set them apart from the next listing in the search results.",
    approach: [
      "A confident identity — 'Fencing & outdoor work, done the way you'd want it.'",
      "Structured services and a clear path from interest to enquiry.",
      "Real reviews and schema shipped so the site earns trust at a glance.",
      "Hand-coded and fast, designed to read premium on a phone.",
    ],
    proof: [
      { label: "Build", value: "Hand-coded · no template" },
      { label: "Performance", value: "Built for 100 Lighthouse" },
      { label: "SEO", value: "Schema + real reviews surfaced" },
    ],
  },
  {
    slug: "anesbury-fencing",
    client: "Anesbury Fencing",
    sector: "Fencing & Construction",
    location: "Wagga Wagga, NSW",
    year: "2026",
    tags: ["Brand", "Web", "SEO"],
    outcomeTitle:
      "A construction firm that finally looks as sharp as its work.",
    summary: "Custom identity with named reviews and contractor schema.",
    cover: "/work/anesbury-fencing.png",
    full: "/work/full/anesbury-fencing.jpg",
    liveUrl: "https://anesbury-fencing.creovo.dev",
    pageSpeedUrl: ps("anesbury-fencing.creovo.dev"),
    challenge:
      "Quality fencing & construction across the Riverina, with a site that didn't reflect the standard of the builds.",
    approach: [
      "A custom identity that puts the work front and centre.",
      "Named, verbatim Google reviews surfaced on the page via structured data.",
      "GeneralContractor schema shipped so search engines understand the business.",
      "A light, hand-coded page that loads in under a second.",
    ],
    proof: [
      { label: "Build", value: "Hand-coded · under ~100KB" },
      { label: "Proof", value: "Named Google reviews, verbatim" },
      { label: "SEO", value: "GeneralContractor schema" },
    ],
  },
  {
    slug: "lordan-fencing",
    client: "Lordan Fencing",
    sector: "Rural & Residential Fencing",
    location: "Dubbo, NSW",
    year: "2026",
    tags: ["Brand", "Web"],
    outcomeTitle: "Rural fencing, presented with real polish.",
    summary: "A grounded, confident identity for rural & residential fencing.",
    cover: "/work/lordan-fencing.png",
    full: "/work/full/lordan-fencing.jpg",
    liveUrl: "https://lordan-fencing.creovo.dev",
    pageSpeedUrl: ps("lordan-fencing.creovo.dev"),
    challenge:
      "A capable rural & residential fencer whose online presence didn't match the work — or the competition's polish.",
    approach: [
      "A grounded, confident identity built for the bush and the suburbs alike.",
      "Clear service breakdown and an obvious path to a quote.",
      "Real reviews and structured data shipped as standard.",
      "Hand-coded, fast, and built to rank locally.",
    ],
    proof: [
      { label: "Build", value: "Hand-coded · no template" },
      { label: "Performance", value: "Built for 100 Lighthouse" },
      { label: "SEO", value: "Local schema + reviews" },
    ],
  },
  {
    slug: "awesome-fencing",
    client: "Awesome Fencing",
    sector: "Boundary & Colorbond Fencing",
    location: "Shepparton, VIC",
    year: "2026",
    tags: ["Brand", "Web"],
    outcomeTitle: "Boundary fencing that finally looks the part.",
    summary: "A clean, trustworthy identity for Colorbond & timber fencing.",
    cover: "/work/awesome-fencing.png",
    full: "/work/full/awesome-fencing.jpg",
    liveUrl: "https://awesome-fencing.creovo.dev",
    pageSpeedUrl: ps("awesome-fencing.creovo.dev"),
    challenge:
      "Solid local fencer, forgettable web presence — easy to scroll past in a list of identical results.",
    approach: [
      "A clean, trustworthy identity that stands out in a generic field.",
      "Colorbond, timber and boundary work structured so customers self-qualify fast.",
      "Reviews and schema shipped by default.",
      "Hand-coded and light for a sub-second first load.",
    ],
    proof: [
      { label: "Build", value: "Hand-coded · no template" },
      { label: "Performance", value: "Built for 100 Lighthouse" },
      { label: "SEO", value: "Schema + reviews surfaced" },
    ],
  },
];

export const getCase = (slug: string) => WORK.find((w) => w.slug === slug);
export const nextCase = (slug: string) => {
  const i = WORK.findIndex((w) => w.slug === slug);
  return WORK[(i + 1) % WORK.length];
};
