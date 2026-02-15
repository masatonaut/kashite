import { type NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { applySecurityHeaders } from "@/lib/security";
import { updateSession } from "@/lib/supabase/middleware";

// Rate limiting configuration
const ratelimit = process.env.UPSTASH_REDIS_REST_URL
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(60, "1 m"),
      analytics: true,
      prefix: "kashite:ratelimit",
    })
  : null;

export async function middleware(request: NextRequest) {
  // Rate limiting (only for API routes)
  if (request.nextUrl.pathname.startsWith("/api") && ratelimit) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ??
               request.headers.get("x-real-ip") ??
               "127.0.0.1";

    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
          "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      });
    }
  }

  // Update Supabase session
  const response = await updateSession(request);

  // Apply security headers
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
