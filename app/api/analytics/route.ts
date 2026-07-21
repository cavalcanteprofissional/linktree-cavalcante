import { NextRequest, NextResponse } from "next/server";
import { hasSupabase, getSupabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  if (!hasSupabase) {
    if (process.env.NODE_ENV === "development") {
      console.log("[analytics] Supabase não configurado — evento ignorado");
    }
    return NextResponse.json({ ok: true, source: "noop" });
  }

  try {
    const body = await request.json();
    const { short_code, referrer, user_agent } = body;

    // lookup link_id
    const supabase = getSupabaseClient();
    const { data: link } = await supabase
      .from("links")
      .select("id")
      .eq("short_code", short_code)
      .single();

    if (link) {
      await supabase.from("link_clicks").insert({
        link_id: link.id,
        referrer: referrer ?? null,
        user_agent: user_agent ?? null,
      });
    }

    return NextResponse.json({ ok: true, source: "supabase" });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
