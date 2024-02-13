import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });


  const isAdminRoute = req.nextUrl.pathname.startsWith('/Admin');
  if (isAdminRoute && (!token || !token.roll || token.roll !== 'Admin')) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  const isProfileRoute = req.nextUrl.pathname.startsWith('/Profile');
  if (isProfileRoute && !token) {
    return NextResponse.redirect(new URL('/LoginUp', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Admin/:path*', '/Profile/:path*'],
};
