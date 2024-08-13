import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/kamera/:path*',
    '/hasil-deteksi/:path*',
    '/owner/operator-list/:path*',
    '/pelanggar/[plat]/[id]/:path*'
  ],
};
