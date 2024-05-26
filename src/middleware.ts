import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptToken } from '@/lib/crypto';
import { verifyToken } from '@/lib/auth';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const userCookie = req.cookies.get('user')?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;
    const encryptedAuthToken = req.cookies.get('access_token')?.value;

    // Redirigir a /dashboard si el usuario está autenticado y se encuentra en la raíz
    if (url.pathname === '/' && user) {
        console.log('Redirecting to Dashboard');
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Proteger rutas del dashboard
    if (url.pathname.startsWith('/dashboard')) {
        if (!encryptedAuthToken) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        try {
            const authToken = decryptToken(encryptedAuthToken);
            verifyToken(authToken);
        } catch (error) {
            console.log('Invalid auth token, but allowing access to prevent redirect loop');
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*'],
};
