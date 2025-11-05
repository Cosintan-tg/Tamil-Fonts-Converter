import { NextResponse, NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/favicon.ico') {
    return NextResponse.redirect(
      new URL('/favicon/favicon.ico', request.url),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/favicon.ico'],
};
