export type HeroContent = {
  eyebrow: string;
  headlineLines: string[];
  emphasis: string;
  sub: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
};

export const hero: HeroContent = {
  eyebrow: "Technical consultancy — web · backend · mobile",
  headlineLines: ["We engineer", "the structure", "your product is"],
  emphasis: "built to hold.",
  sub: "Saltancy designs and builds web, backend, and mobile systems — engineered with the rigour of a crystal lattice, so they hold their shape as you grow.",
  primaryCta: "Start building",
  secondaryCta: "See how we work",
  secondaryHref: "/#approach",
};
