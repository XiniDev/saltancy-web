# Saltancy — project instructions

## Start here

Phase 1, the "Ember" public site, is live on Cloudflare Workers. Phase 2 (login, portal, live
sharing) isn't planned yet. Read **`docs/next-session.md`** first. It covers the state of things, the
Phase 1 loose ends, how hosting and deploys work, and what the Phase 2 plan has to settle.

`docs/` and `saltancy-phase1-handover.md` exist only on Xini's machine. They describe login and tunnel
plans, and this repo is public, so never commit them. Deploys run only from CI; never deploy locally.

## Quality bar

**L99. Never trade quality for speed** — build to full spec every pass, no shortcuts, no scaffolding
left behind. Stay in the **Halite** design system (warm/rustic salt identity, NaCl unit-cell lattice,
Fraunces headings, Geist Mono labels, orange as ~2% scalpel accent) and keep colour **token-only —
no hardcoded hex, ever**. The portal is the same brand behind a login, not a separate-looking product.

## "Macro vision"

When Xini asks for the **macro vision**, give the shape of the product and the order its
capabilities arrive in, at the altitude you could say out loud to a client.

- Each item is a **capability that will exist** and changes what someone can do — never a task.
- Title each step as a **noun phrase** ("Edit portal", "Media pipeline", "Ticketing portal"), not a
  verb-y chore ("make it editable", "make it real").
- **Never include** commits, pushes, env vars, migrations, doc updates, config, hosting setup,
  schema splits, or "make it real." That is *how* the work happens, not *what* it is. It is implied
  — do not mention it at all, not even as an aside.
- A prerequisite outside our control gets a **five-word clause, not a step** — e.g. "Once WSMath
  goes live — …" — and then say in one sentence what we build while waiting.
- Keep it **brief**: a short lead line, ~4 numbered beats of one or two sentences each, and a
  closing through-line naming why it matters commercially.
- Test: if an item wouldn't survive being described to the client, it isn't macro.

Stay at that altitude until Xini asks you to drop down.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
