import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const authPages = ["/auth"];

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isAuthPage = authPages.includes(pathname);

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (session?.email && isAuthPage) {
        return NextResponse.redirect(new URL('/account', req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|public|.*\\..*).*)'],
}; 