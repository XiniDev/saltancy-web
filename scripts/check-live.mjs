// Checks the live site after a deploy: the Worker serves www, the apex and plain
// HTTP redirect to it, the security headers are on, static files cache forever,
// and the build carries the analytics beacon. Retries while a fresh custom
// domain comes up. Usage: node scripts/check-live.mjs
const WWW = "https://www.saltancy.com";
const ATTEMPTS = 12;
const PAUSE_MS = 10_000;
const ANALYTICS_TOKEN = process.env.SALTANCY_WEB_ANALYTICS_TOKEN;

const HSTS = "max-age=63072000";

async function get(url) {
  const res = await fetch(url, { redirect: "manual", headers: { "cache-control": "no-cache" } });
  return { status: res.status, headers: res.headers, body: await res.text() };
}

function expect(problems, ok, message) {
  if (!ok) problems.push(message);
}

async function check() {
  const problems = [];

  const home = await get(`${WWW}/`);
  expect(problems, home.status === 200, `www: status ${home.status}, expected 200`);
  expect(problems, home.headers.get("server") === "cloudflare", `www: served by "${home.headers.get("server")}", expected cloudflare`);
  expect(problems, home.headers.get("strict-transport-security")?.includes(HSTS), "www: HSTS header missing");
  expect(problems, home.headers.get("x-content-type-options") === "nosniff", "www: nosniff header missing");
  expect(problems, home.body.includes("data-site-header"), "www: not the Saltancy home page");
  if (ANALYTICS_TOKEN) {
    expect(problems, home.body.includes(`{&quot;token&quot;:&quot;${ANALYTICS_TOKEN}&quot;}`), "www: analytics beacon missing");
  }

  expect(
    problems,
    home.body.includes(`<meta property="og:image" content="${WWW}/opengraph-image`),
    "www: the social card image is not an absolute www URL"
  );
  const favicon = await get(`${WWW}/favicon.ico`);
  expect(problems, favicon.status === 200, `favicon.ico: status ${favicon.status}`);

  const asset = home.body.match(/\/_next\/static\/[^"]+\.js/)?.[0];
  expect(problems, !!asset, "www: no /_next/static script found in the page");
  if (asset) {
    const file = await get(`${WWW}${asset}`);
    expect(problems, file.status === 200, `${asset}: status ${file.status}`);
    expect(problems, file.headers.get("cache-control")?.includes("immutable"), `${asset}: not cached as immutable`);
  }

  const apex = await get("https://saltancy.com/privacy?from=check");
  expect(problems, apex.status === 301, `apex: status ${apex.status}, expected 301`);
  expect(
    problems,
    apex.headers.get("location") === `${WWW}/privacy?from=check`,
    `apex: redirects to "${apex.headers.get("location")}", expected ${WWW}/privacy?from=check`
  );
  expect(problems, apex.headers.get("strict-transport-security")?.includes(HSTS), "apex: HSTS header missing");

  const http = await get("http://www.saltancy.com/");
  expect(problems, [301, 308].includes(http.status), `http: status ${http.status}, expected a permanent redirect`);
  expect(problems, http.headers.get("location") === `${WWW}/`, `http: redirects to "${http.headers.get("location")}"`);

  return problems;
}

for (let attempt = 1; ; attempt++) {
  let problems;
  try {
    problems = await check();
  } catch (error) {
    problems = [`request failed: ${error.cause?.code ?? error.message}`];
  }
  if (problems.length === 0) {
    console.log(`Live site checks pass (attempt ${attempt}).`);
    break;
  }
  console.log(`Attempt ${attempt}/${ATTEMPTS}:\n  ${problems.join("\n  ")}`);
  if (attempt === ATTEMPTS) process.exit(1);
  await new Promise((resolve) => setTimeout(resolve, PAUSE_MS));
}
