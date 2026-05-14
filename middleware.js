import { NextResponse } from "next/server";

export function middleware(request) {

    const token = request.cookies.get("token");

    // Protect dashboard
    if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {

        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Prevent login page after login
    if (token && request.nextUrl.pathname.startsWith("/login")) {

        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};