import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/lock",
  "/about",
  "/services",
  "/areas",
  "/gallery",
  "/contact",
  "/privacy",
  "/terms",
  "/sms-policy",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/icons",
  "/acs-logo.png",
  "/api/website/quote-request",
  "/api/auth/admin-login",
  "/api/auth/logout",
];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (isPublic(pathname)) return NextResponse.next();

  const devBypass =
    process.env.NODE_ENV !== "production" &&
    String(process.env.DEV_BYPASS_LOCK ?? "").toLowerCase() === "true";
  if (devBypass) return NextResponse.next();

  const fallback = process.env.NODE_ENV === "production" ? "" : "AppPassCode2026!";
  const requiredKey = (process.env.ADMIN_ACCESS_KEY ?? process.env.AUTOMATION_API_KEY ?? fallback).trim();
  if (!requiredKey) {
    return NextResponse.json(
      { success: false, error: "ADMIN_ACCESS_KEY/AUTOMATION_API_KEY is not configured." },
      { status: 503 }
    );
  }

  const cookieKey = req.cookies.get("acs_admin_session")?.value ?? "";
  if (cookieKey === requiredKey) return NextResponse.next();

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/lock";
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)"],
};
