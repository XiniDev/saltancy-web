export const cta = {
  eyebrow: "Build with structure",
  headlineLines: ["Let's set the structure", "your product will"],
  emphasis: "hold to.",
  sub: "Tell us what you're building. We'll help you architect it to hold — from the first interface down to the data layer.",
  primary: "Start a project",
  secondary: "See how we work",
  secondaryHref: "/#approach",
};

export type FooterLink = { label: string; href: string };
export type FooterGroup = { label: string; links: FooterLink[] };

export const footer = {
  positioning:
    "A technical consultancy engineering web, backend, and mobile systems built to hold their shape.",
  groups: [
    {
      label: "Navigate",
      links: [
        { label: "Services", href: "/#services" },
        { label: "Approach", href: "/#approach" },
        { label: "Contact", href: "/#cta" },
      ],
    },
    {
      label: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ] as FooterGroup[],
};
