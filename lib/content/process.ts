export type ProcessStep = {
  index: string;
  phase: string;
  title: string;
  description: string;
};

export const process: ProcessStep[] = [
  {
    index: "01",
    phase: "Discover",
    title: "Map the stress points.",
    description: "We chart constraints, data, and load before laying a single line.",
  },
  {
    index: "02",
    phase: "Build",
    title: "Lay the bonds.",
    description: "Typed, tested, reviewed — structure that locks, not glue that slips.",
  },
  {
    index: "03",
    phase: "Ship",
    title: "Set under load.",
    description: "We deploy into real traffic and watch it hold its shape.",
  },
  {
    index: "04",
    phase: "Maintain",
    title: "Hold the lattice.",
    description: "Monitoring, hardening, and a clean handover so it bears weight for years.",
  },
];
