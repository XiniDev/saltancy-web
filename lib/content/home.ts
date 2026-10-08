/**
 * Copy for the public site. Where the phone design trims a line, `short`
 * carries the phone wording and the full line shows from the `sm` breakpoint.
 */

export type NavLink = { label: string; href: string; hub?: boolean };

export const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "How we work", href: "/#approach" },
  { label: "Project hub", href: "/#hub", hub: true },
  { label: "Contact", href: "/#contact" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const ctaLabels = {
  start: "Start a project",
  signIn: "Client sign in",
};

export const hero = {
  kickerLead: "A technical consultancy —",
  kicker: "Web · Backend · Mobile",
  headline: { before: "Software worth", after: "its", emphasis: "salt", end: "." },
  sub: "Saltancy designs and builds web apps, backends and mobile apps: engineered properly, shipped quickly, and easy to change once they're live.",
  secondary: { label: "See how we work", href: "#approach" },
};

export type Service = { index: string; title: string; body: string; stack: string };

export const services = {
  eyebrow: "What we build",
  heading: { before: "Three things, done", emphasis: "properly", end: "." },
  items: [
    {
      index: "01",
      title: "Web applications",
      body: "Fast, accessible sites and web apps, from the first landing page to the signed-in product behind it.",
      stack: "Next.js · React · TypeScript",
    },
    {
      index: "02",
      title: "Backend systems",
      body: "The part nobody sees and everything relies on: APIs, databases, sign-in, and the cloud it all runs on.",
      stack: "APIs · Postgres · Cloud",
    },
    {
      index: "03",
      title: "Mobile apps",
      body: "One codebase for iPhone and Android that still feels at home on both.",
      stack: "React Native · Offline-first",
    },
  ] satisfies Service[],
};

export type ProcessStep = { index: string; title: string; body: string; short: string };

export const process = {
  eyebrow: "How a project runs",
  heading: { before: "Built one", emphasis: "layer", end: "at a time." },
  steps: [
    {
      index: "01",
      title: "Discover",
      body: "We pin down what you need, what it has to connect to, and what done looks like.",
      short: "We pin down what you need and what done looks like.",
    },
    {
      index: "02",
      title: "Build",
      body: "Short cycles. Each one ends with a working preview you can try.",
      short: "Short cycles, each ending in a preview you can try.",
    },
    {
      index: "03",
      title: "Ship",
      body: "It goes live on real traffic, and we stay close while it settles.",
      short: "Live on real traffic, with us close by while it settles.",
    },
    {
      index: "04",
      title: "Look after",
      body: "Fixes and new features whenever you ask. Just tell us what to change.",
      short: "Fixes and new features whenever you ask.",
    },
  ] satisfies ProcessStep[],
};

/** Every name in the hub product shot is an illustrative sample, never a real client. */
export const hub = {
  eyebrow: "Your project hub",
  heading: { before: "Everything about your project, in", emphasis: "one place", end: "." },
  sub: "Sign in to follow progress, open the latest preview and ask for changes. No chasing emails, no wondering where things are.",
  subShort: "Follow progress, open the latest preview and ask for changes, all after one sign-in.",
  caption:
    "Example of the project hub a client sees after signing in: progress by phase, the latest preview, and their change requests.",
  sample: {
    projects: ["Clinic booking app", "Marketing site", "Staff mobile app"],
    client: "[Client name]",
    status: "building",
    tabs: ["Progress", "Previews", "Requests", "Files"],
    phases: [
      { name: "Phase 1 · Booking & accounts", short: "phase 1 · done", state: "done" },
      { name: "Phase 2 · Payments", short: "phase 2 · now", state: "in progress" },
      { name: "Phase 3 · Staff app", short: "phase 3 · next", state: "next" },
    ],
    build: "preview · build 41",
    requests: [
      { text: "Take a deposit at booking", state: "in progress" },
      { text: "Date picker cut off on iPhone", state: "done" },
      { text: "Add a second language", state: "queued" },
    ],
    composer: "Describe a change you'd like…",
    composerShort: "Describe a change…",
    send: "Send request",
    sendShort: "Send",
  },
};

export const start = {
  eyebrow: "Start",
  heading: { before: "Got something", after: "to", emphasis: "build", end: "?" },
  sub: "Tell us what you're working on. We'll come back with a plan, not a sales call.",
  emailLead: "Email",
};

/** The contact pop-up that "Start a project" opens. */
export const contact = {
  eyebrow: "Get in touch",
  heading: { before: "Let's", emphasis: "talk", end: "." },
  sub: "Tell us what you're building. We'll get back to you within 24 hours.",
  fields: {
    name: { label: "Your name", placeholder: "First and last name" },
    email: { label: "Email", placeholder: "name@company.com" },
    message: {
      label: "What are you building?",
      placeholder: "What you're building, where it stands, and when you'd like it live.",
    },
  },
  submit: "Send message",
  sending: "Sending…",
  success: { before: "You're", emphasis: "in", end: ".", body: "Message received. We'll get back to you within 24 hours." },
  error: "Something didn't connect. Please try again in a moment.",
};

export const footer = {
  line: "A small technical consultancy building web, backend and mobile software.",
  navLabel: "Navigate",
  legalLabel: "Legal",
};

export const meta = {
  /** The canonical origin. Shared links and their preview images resolve against it. */
  url: "https://www.saltancy.com",
  siteName: "Saltancy",
  title: "Saltancy | Technical Consultancy",
  description:
    "Saltancy designs and builds web apps, backends and mobile apps: engineered properly, shipped quickly, and easy to change once they're live.",
};
