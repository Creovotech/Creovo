export type WorkItem = {
  slug: string;
  title: string;
  note: string;
  tag: string;
  liveUrl: string;
  pageSpeedUrl: string;
};

const ps = (host: string) =>
  `https://pagespeed.web.dev/analysis?url=https://${host}&form_factor=mobile`;

// Only real, deployed, hand-built sites. Titles describe the CRAFT MOVE, not the
// industry. Every claim is verifiable via the live + Lighthouse links.
export const WORK: WorkItem[] = [
  {
    slug: "golden-city-gates",
    title: "Made a local gate company look like a category leader.",
    note: "A bespoke dark-and-brass identity, real Google reviews surfaced via schema, and confident range/automation positioning — hand-coded, not a theme.",
    tag: "Hand-coded · ~3 weeks",
    liveUrl: "https://golden-city-gates.creovo.dev",
    pageSpeedUrl: ps("golden-city-gates.creovo.dev"),
  },
  {
    slug: "jaytec-fencing",
    title: "A fencing contractor, rebuilt to feel design-forward.",
    note: "Clean editorial layout and a confident voice, with 5.0★ Google reviews surfaced on-page and LocalBusiness structured data shipped by default.",
    tag: "Hand-coded · ~3 weeks",
    liveUrl: "https://jaytec-fencing.creovo.dev",
    pageSpeedUrl: ps("jaytec-fencing.creovo.dev"),
  },
  {
    slug: "jimmys-outdoors",
    title: "A premium brand for an outdoor-living business.",
    note: "Distinct identity, structured services, and real reviews — a site that reads as the most established option in its market.",
    tag: "Hand-coded · ~3 weeks",
    liveUrl: "https://jimmys-outdoors.creovo.dev",
    pageSpeedUrl: ps("jimmys-outdoors.creovo.dev"),
  },
  {
    slug: "anesbury-fencing",
    title: "A construction firm that finally looks as sharp as its work.",
    note: "Custom identity, named Google reviews surfaced verbatim, GeneralContractor schema — a light, hand-coded page that loads in under a second.",
    tag: "Hand-coded · ~3 weeks",
    liveUrl: "https://anesbury-fencing.creovo.dev",
    pageSpeedUrl: ps("anesbury-fencing.creovo.dev"),
  },
];
