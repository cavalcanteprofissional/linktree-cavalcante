import { hasKV, getKV } from "./kv";

export interface DashboardStats {
  today: number;
  last7: number;
  total: number;
  topLink: { label: string; clicks: number } | null;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function subDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function getStats(): Promise<DashboardStats> {
  if (!hasKV) return { today: 0, last7: 0, total: 0, topLink: null };

  const kv = getKV();
  const today = todayStr();
  const sevenDates = Array.from({ length: 7 }, (_, i) =>
    formatDate(subDays(new Date(), i))
  );

  const [daily, totalStr, links] = await Promise.all([
    kv.hgetall<Record<string, string>>("stats:daily"),
    kv.get<string>("stats:total"),
    kv.hgetall<Record<string, string>>("stats:links"),
  ]);

  const total = Number(totalStr ?? 0);
  const todayCount = Number(daily?.[today] ?? 0);
  const last7 = sevenDates.reduce(
    (acc, d) => acc + Number(daily?.[d] ?? 0),
    0
  );

  let topLink: { label: string; clicks: number } | null = null;
  if (links) {
    const entries = Object.entries(links).sort(
      (a, b) => Number(b[1]) - Number(a[1])
    );
    const first = entries[0];
    if (first) {
      topLink = { label: first[0], clicks: Number(first[1]) };
    }
  }

  return { today: todayCount, last7, total, topLink };
}

export async function getClicksOverTime(): Promise<
  { date: string; total: number }[]
> {
  if (!hasKV) return [];

  const kv = getKV();
  const daily = await kv.hgetall<Record<string, string>>("stats:daily");
  if (!daily) return [];

  const thirtyDaysAgo = formatDate(subDays(new Date(), 30));

  return Object.entries(daily)
    .filter(([date]) => date >= thirtyDaysAgo)
    .map(([date, total]) => ({ date, total: Number(total) }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getClicksPerLink(): Promise<
  { short_code: string; label: string; total: number }[]
> {
  if (!hasKV) return [];

  const kv = getKV();
  const links = await kv.hgetall<Record<string, string>>("stats:links");
  if (!links) return [];

  return Object.entries(links)
    .map(([short_code, total]) => ({
      short_code,
      label: short_code,
      total: Number(total),
    }))
    .sort((a, b) => b.total - a.total);
}

export async function getReferrers(): Promise<
  { referrer: string; total: number }[]
> {
  if (!hasKV) return [];

  const kv = getKV();
  const referrers = await kv.hgetall<Record<string, string>>(
    "stats:referrers"
  );
  if (!referrers) return [];

  return Object.entries(referrers)
    .map(([referrer, total]) => ({ referrer, total: Number(total) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);
}

export async function getRecentClicks(
  limit = 50
): Promise<
  { label: string | null; clicked_at: string; referrer: string | null }[]
> {
  if (!hasKV) return [];

  const kv = getKV();
  const raw = await kv.lrange<string>("recent", 0, limit - 1);
  if (!raw) return [];

  return raw.map((item) => {
    try {
      const parsed = JSON.parse(item);
      return {
        label: parsed.short_code ?? null,
        clicked_at: parsed.clicked_at ?? "",
        referrer: parsed.referrer ?? null,
      };
    } catch {
      return { label: null, clicked_at: "", referrer: null };
    }
  });
}
