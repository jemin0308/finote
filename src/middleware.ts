import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get country from Vercel's geolocation header, or default to 'KR' (e.g. locally)
    const country = (request as any).geo?.country || 'KR';

    // Clone the request headers and set a new header `x-user-country`
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-country', country);

    // Continue the request with the new headers
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
