export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
];

export const primaryCta = { label: "Let's Talk" };

export const portalEnabled = false;
export const clientLogin: { label: string; href: string } | null = portalEnabled
  ? { label: "Client Login", href: "/portal" }
  : null;
