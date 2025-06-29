import { NextResponse, NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    const tokens = request.cookies.get('tokens')

    if (!tokens) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/cart'
    ],
}