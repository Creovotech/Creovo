import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Single deployment, two domains: the apex (creovo.dev) serves the main site,
// and `marketplace.<domain>` serves everything under /marketplace. We detect the
// subdomain from the Host header and rewrite the path internally so the URL the
// visitor sees stays clean (marketplace.creovo.dev/foo, not /marketplace/foo).
const MARKETPLACE_SUBDOMAIN = 'marketplace';

export function middleware(req: NextRequest) {
  const host = (req.headers.get('host') ?? '').split(':')[0]; // strip the dev port
  const isMarketplace = host.split('.')[0] === MARKETPLACE_SUBDOMAIN;

  if (isMarketplace && !req.nextUrl.pathname.startsWith('/marketplace')) {
    const url = req.nextUrl.clone();
    url.pathname = `/marketplace${req.nextUrl.pathname === '/' ? '' : req.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals, API routes, and static files (anything with a dot).
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};
