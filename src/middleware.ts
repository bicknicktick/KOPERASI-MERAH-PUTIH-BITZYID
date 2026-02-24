import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');
  const isApiAuth = req.nextUrl.pathname.startsWith('/api/auth');

  if (isApiAuth) return NextResponse.next();

  if (isAuthPage) {
    if (token) return NextResponse.redirect(new URL('/', req.url));
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Lindungi halaman admin
  if (req.nextUrl.pathname.startsWith('/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|manifest.json|icon-.*\\.png|sw.js).*)'],
};
