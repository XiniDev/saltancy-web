import "server-only";

/**
 * The project hub section and every "Client sign in" link ship behind this one
 * switch. It stays off until the portal exists, so the public site never
 * advertises or links to something that isn't live.
 *
 * Read at build time on the server and passed down as props. Turn it on by
 * building with SALTANCY_PROJECT_HUB=on.
 */
export const projectHubEnabled = process.env.SALTANCY_PROJECT_HUB === "on";

/** Where "Client sign in" points once the portal exists. */
export const clientSignInHref = "/sign-in";

/**
 * The address the contact form delivers to. Shown only to visitors whose
 * browser runs no JavaScript, where the contact pop-up cannot open. The
 * privacy and terms pages already publish it.
 */
export const contactEmail = process.env.SALTANCY_EMAIL ?? null;
