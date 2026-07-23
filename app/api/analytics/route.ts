import { NextRequest, NextResponse } from "next/server";
import { hasKV, getKV } from "@/lib/kv";

export async function POST(request: NextRequest) {
  if (!hasKV) {
    if (process.env.NODE_ENV === "development") {
      console.log("[analytics] Vercel KV não configurado — evento ignorado");
    }
    return NextResponse.json({ ok: true, source: "noop" });
  }

  try {
    const body = await request.json();
    const { short_code, referrer, user_agent } = body;
    const today = new Date().toISOString().slice(0, 10);

    const kv = getKV();

    await Promise.all([
      kv.hincrby("stats:daily", today, 1),
      kv.incr("stats:total"),
      kv.hincrby("stats:links", short_code ?? "unknown", 1),
      kv.hincrby("stats:referrers", referrer || "direct", 1),
      kv.lpush(
        "recent",
        JSON.stringify({
          short_code: short_code ?? null,
          referrer: referrer ?? null,
          user_agent: user_agent ?? null,
          clicked_at: new Date().toISOString(),
        })
      ),
      kv.ltrim("recent", 0, 99),
    ]);

    return NextResponse.json({ ok: true, source: "kv" });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
