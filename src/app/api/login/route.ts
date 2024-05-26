import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { encryptToken } from '@/lib/crypto';

// TODO: Mover a .env
const API_URL = 'https://apibackoffice.tipsterchat.com/login';

export async function POST(req: NextRequest) {
    const { basicToken } = await req.json();

    try {
        const response = await axios.post(API_URL, {}, {
            headers: {
                Authorization: `Basic ${basicToken}`
            }
        });

        const { user, access_token, refresh_token } = response.data;

        const encryptedAuthToken = encryptToken(access_token);
        const encryptedRefreshToken = encryptToken(refresh_token);

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // Un día
            path: '/',
        };

        cookies().set('access_token', encryptedAuthToken, cookieOptions);
        cookies().set('refresh_token', encryptedRefreshToken, cookieOptions);

        const userCookieOptions = {
            path: '/',
            maxAge: 60 * 60 * 24 // Un día
        };
        const userData = { username: user.name, email: user.email };
        cookies().set('user', JSON.stringify(userData), userCookieOptions);

        return NextResponse.redirect(new URL('/dashboard', req.url)); // Redirige al usuario al dashboard después del login exitoso
    } catch (error: any) {
        console.error('Authentication failed', error.response ? error.response.data : error.message);
        return NextResponse.json({ message: 'Authentication failed' }, { status: 401 });
    }
}
