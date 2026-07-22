import { hasSupabase, getSupabaseClient } from "./supabase";

type DbLink = { id: string; short_code: string; destination_url: string; label: string | null };
type DbClick = { id: string; link_id: string; clicked_at: string; referrer: string | null; user_agent: string | null };

export interface DashboardStats {
  today: number;
  last7: number;
  total: number;
  topLink: { label: string; clicks: number } | null;
}

export async function getStats(): Promise<DashboardStats> {
  if (!hasSupabase) return { today: 0, last7: 0, total: 0, topLink: null };

  const supabase = getSupabaseClient();
  const now = new Date();

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [todayRes, weekRes, totalRes, topRes] = await Promise.all([
    supabase.from("link_clicks").select("id", { count: "exact", head: true }).gte("clicked_at", todayStart),
    supabase.from("link_clicks").select("id", { count: "exact", head: true }).gte("clicked_at", weekAgo),
    supabase.from("link_clicks").select("id", { count: "exact", head: true }),
    supabase.from("link_clicks").select("link_id").gte("clicked_at", weekAgo),
  ]);

  let topLink: { label: string; clicks: number } | null = null;
  const topData = topRes.data as { link_id: string }[] | null;
  if (topData && topData.length > 0) {
    const counts: Record<string, number> = {};
    topData.forEach((c) => {
      counts[c.link_id] = (counts[c.link_id] ?? 0) + 1;
    });
    const topId = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
    if (topId) {
      const { data: link } = await supabase.from("links").select("label").eq("id", topId).single();
      topLink = { label: (link as { label: string | null })?.label ?? topId, clicks: counts[topId]! };
    }
  }

  return {
    today: todayRes.count ?? 0,
    last7: weekRes.count ?? 0,
    total: totalRes.count ?? 0,
    topLink,
  };
}

export async function getClicksOverTime(): Promise<{ date: string; total: number }[]> {
  if (!hasSupabase) return [];

  const supabase = getSupabaseClient();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { data } = await supabase
    .from("link_clicks")
    .select("clicked_at")
    .gte("clicked_at", thirtyDaysAgo)
    .order("clicked_at", { ascending: true });

  if (!data) return [];

  const raw = data as { clicked_at: string }[];
  const daily: Record<string, number> = {};
  for (const c of raw) {
    const day = c.clicked_at.slice(0, 10);
    daily[day] = (daily[day] ?? 0) + 1;
  }

  return Object.entries(daily).map(([date, total]) => ({ date, total }));
}

export async function getClicksPerLink(): Promise<{ short_code: string; label: string; total: number }[]> {
  if (!hasSupabase) return [];

  const supabase = getSupabaseClient();
  const { data: clicks } = await supabase.from("link_clicks").select("link_id");
  if (!clicks || clicks.length === 0) return [];

  const { data: links } = await supabase.from("links").select("id, short_code, label");
  if (!links) return [];

  const linkMap = new Map((links as DbLink[]).map((l) => [l.id, l]));

  const counts: Record<string, number> = {};
  for (const c of clicks as { link_id: string }[]) {
    counts[c.link_id] = (counts[c.link_id] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([id, total]) => {
      const link = linkMap.get(id);
      return { short_code: link?.short_code ?? id, label: link?.label ?? id, total };
    })
    .sort((a, b) => b.total - a.total);
}

export async function getReferrers(): Promise<{ referrer: string; total: number }[]> {
  if (!hasSupabase) return [];

  const supabase = getSupabaseClient();
  const { data } = await supabase.from("link_clicks").select("referrer");

  if (!data) return [];

  const counts: Record<string, number> = {};
  for (const c of data as { referrer: string | null }[]) {
    const ref = c.referrer || "direct";
    counts[ref] = (counts[ref] ?? 0) + 1;
  }

  return Object.entries(counts)
    .map(([referrer, total]) => ({ referrer, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);
}

export async function getRecentClicks(limit = 50): Promise<(DbClick & { label: string | null })[]> {
  if (!hasSupabase) return [];

  const supabase = getSupabaseClient();
  const { data: clicks } = await supabase
    .from("link_clicks")
    .select("id, link_id, clicked_at, referrer, user_agent")
    .order("clicked_at", { ascending: false })
    .limit(limit);

  if (!clicks || clicks.length === 0) return [];

  const linkIds = [...new Set((clicks as DbClick[]).map((c) => c.link_id))];
  const { data: links } = await supabase.from("links").select("id, label").in("id", linkIds);
  const linkMap = new Map(((links ?? []) as { id: string; label: string | null }[]).map((l) => [l.id, l.label]));

  return (clicks as DbClick[]).map((c) => ({
    ...c,
    label: linkMap.get(c.link_id) ?? null,
  }));
}
