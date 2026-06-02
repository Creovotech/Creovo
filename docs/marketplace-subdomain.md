# Marketplace subdomain

The marketplace lives at `marketplace.<your-domain>` but ships from **this same repo and
the same Vercel deployment** — no second project, no duplicated setup.

## How it works

[`src/middleware.ts`](../src/middleware.ts) inspects the `Host` header on every request:

- `creovo.dev` (apex) → serves the main site as usual.
- `marketplace.creovo.dev` → the request path is **rewritten** under `/marketplace/*`
  internally. The visitor only ever sees `marketplace.creovo.dev/...`; the `/marketplace`
  segment never appears in the URL, and `creovo.dev/marketplace` is not a public route.

Marketplace pages live in [`src/app/marketplace/`](../src/app/marketplace). Add a route by
creating a folder there — e.g. `src/app/marketplace/browse/page.tsx` is served at
`marketplace.creovo.dev/browse`.

## Local development

Modern browsers resolve `*.localhost` to 127.0.0.1 automatically, so:

```bash
bun dev
# main site:     http://localhost:3000
# marketplace:   http://marketplace.localhost:3000
```

Or simulate the host with curl:

```bash
curl -H "Host: marketplace.localhost" http://localhost:3000/
```

## Production setup (Vercel + DNS)

1. **Vercel → Project → Settings → Domains → Add** `marketplace.creovo.dev`
   to the **same** Creovo project (do **not** create a new project).
2. **DNS** (wherever the domain is managed): add a record for the `marketplace` subdomain
   as Vercel instructs — typically:

   | Type  | Name          | Value                  |
   | ----- | ------------- | ---------------------- |
   | CNAME | `marketplace` | `cname.vercel-dns.com` |

3. Vercel provisions the TLS cert automatically. Done — both domains hit the same build,
   and the middleware routes each to the right place.

### Optional: many subdomains later

To support arbitrary tenant subdomains (`*.creovo.dev`), add a wildcard domain `*.creovo.dev`
in Vercel and a wildcard `CNAME *` DNS record, then generalize the subdomain check in the
middleware.

## Notes

- The "Back to Creovo" link in [`src/app/marketplace/layout.tsx`](../src/app/marketplace/layout.tsx)
  hardcodes `https://creovo.dev` — update it if the apex domain differs.
- If the marketplace ever needs its own API namespace, add routes under `src/app/api/...`;
  the middleware skips `/api`, so they're reachable from either host.
