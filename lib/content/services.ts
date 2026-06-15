export type ServiceIcon = "web" | "backend" | "mobile" | "data";

export type Service = {
  slug: string;
  title: string;
  description: string;
  capabilities: string[];
  icon: ServiceIcon;
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "web",
    title: "Web Applications",
    description:
      "Interfaces with structural integrity. Server-first Next.js, typed end to end, fast under load and built to scale without cracking.",
    capabilities: ["Next.js", "RSC", "TypeScript", "Edge"],
    icon: "web",
    featured: true,
  },
  {
    slug: "backend",
    title: "Backend Systems",
    description:
      "The load-bearing core. APIs, data models, and cloud infrastructure architected to stay rigid as traffic and complexity grow.",
    capabilities: ["APIs", "Postgres", "Cloud", "Observability"],
    icon: "backend",
  },
  {
    slug: "mobile",
    title: "Mobile Apps",
    description:
      "One structure, every surface. Cross-platform apps that keep their shape from phone to tablet without a second build.",
    capabilities: ["React Native", "Offline", "Native APIs"],
    icon: "mobile",
  },
];
