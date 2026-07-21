import { NextRequest, NextResponse } from "next/server";
import { resolveShortcode } from "@/lib/shortener";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;
  const destination = await resolveShortcode(shortcode);

  if (!destination) {
    return NextResponse.redirect(new URL("/", _request.url), 307);
  }

  // fire-and-forget analytics (não bloqueia o redirect)
  const referrer = _request.headers.get("referer") ?? "";
  const userAgent = _request.headers.get("user-agent") ?? "";
  const origin = _request.nextUrl.origin;
  fetch(new URL("/api/analytics", origin), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      short_code: shortcode,
      referrer,
      user_agent: userAgent,
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {
    /* fallback analytics silencioso */
  });

  return NextResponse.redirect(destination, 302);
}
