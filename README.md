This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Checks and deploys

The site runs on Cloudflare Workers through the [OpenNext adapter](https://opennext.js.org/cloudflare).

- `npm run build`, then `npm run test:e2e`: the Playwright suite under `next start`.
- `npm run cf:build`, then `npm run test:e2e:worker`: the same suite against the Cloudflare build in
  workerd, the runtime it ships on.
- A push to `main` runs `.github/workflows/ship.yml`. It checks the Cloudflare build, both as it ships and with
  the project hub flag flipped, and then deploys the exact build that passed.

Never deploy from a local machine. OpenNext bundles every `.env*` file into the Worker, so `.env.local` would ship
inside it.
