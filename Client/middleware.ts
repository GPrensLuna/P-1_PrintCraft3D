import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname.startsWith('/Admin') && token?.userRoll !== 'Admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  const isAdminRoute = req.nextUrl.pathname.startsWith('/Admin/ProductList');
  const isProfileRoute = req.nextUrl.pathname.startsWith('/Profile');

  // Verificar si la ruta requiere ser un admin
  if (isAdminRoute && token?.userRoll !== 'Admin') {
    // Redirigir a una ruta de 'no autorizado' o al inicio
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Si la ruta es /Profile y no hay sesión (token), redirige al inicio de sesión
  if (isProfileRoute && !token) {
    return NextResponse.redirect(new URL('/LoginUp', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Admin/:path*', '/Profile/:path*'],
};
