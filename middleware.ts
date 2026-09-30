import { NextResponse, NextRequest } from "next/server";

function verifyTokenEdge(token: string): { userId: number; role: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/user-dashboard", "/Admin-Dashboard"];
  const adminPaths = ["/Admin-Dashboard"];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decoded = verifyTokenEdge(token);
  if (!decoded) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (adminPaths.some((path) => pathname.startsWith(path)) && decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/user-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user-dashboard/:path*", "/Admin-Dashboard/:path*"],
};
