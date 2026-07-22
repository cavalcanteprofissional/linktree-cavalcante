"use client";

import { useEffect, useState } from "react";
import LoginForm from "@/components/dashboard/LoginForm";
import StatCard from "@/components/dashboard/StatCard";
import ClicksChart from "@/components/dashboard/ClicksChart";
import LinksChart from "@/components/dashboard/LinksChart";
import ReferrersTable from "@/components/dashboard/ReferrersTable";
import RecentClicks from "@/components/dashboard/RecentClicks";
import type { DashboardStats } from "@/lib/dashboard-api";

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [authEnabled, setAuthEnabled] = useState(false);
  const [checking, setChecking] = useState(true);

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [clicksOverTime, setClicksOverTime] = useState<{ date: string; total: number }[]>([]);
  const [linksData, setLinksData] = useState<{ label: string; total: number }[]>([]);
  const [referrers, setReferrers] = useState<{ referrer: string; total: number }[]>([]);
  const [recent, setRecent] = useState<{ label: string | null; clicked_at: string; referrer: string | null }[]>([]);

  async function checkAuth() {
    try {
      const res = await fetch("/api/dashboard/auth");
      const data = await res.json();
      setAuthEnabled(data.authEnabled);
      setAuthed(data.authenticated);
    } catch {
      setAuthed(false);
    } finally {
      setChecking(false);
    }
  }

  async function fetchData() {
    const [s, c, l, r, rec] = await Promise.all([
      fetch("/api/dashboard/stats").then((r) => r.json()),
      fetch("/api/dashboard/clicks").then((r) => r.json()),
      fetch("/api/dashboard/links").then((r) => r.json()),
      fetch("/api/dashboard/referrers").then((r) => r.json()),
      fetch("/api/dashboard/recent").then((r) => r.json()),
    ]);
    setStats(s);
    setClicksOverTime(Array.isArray(c) ? c : []);
    setLinksData(Array.isArray(l) ? l : []);
    setReferrers(Array.isArray(r) ? r : []);
    setRecent(Array.isArray(rec) ? rec : []);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authed) {
      fetchData();
    } else if (!authEnabled) {
      setAuthed(true);
      fetchData();
    }
  }, [authed, authEnabled]);

  if (checking) return null;

  if (authEnabled && !authed) {
    return <LoginForm onLogin={() => { setAuthed(true); fetchData(); }} />;
  }

  return (
    <div className="min-h-dvh bg-slate-900">
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">
            📊 Dashboard
          </h1>
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Voltar
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Hoje" value={stats?.today ?? 0} />
          <StatCard label="Últimos 7 dias" value={stats?.last7 ?? 0} />
          <StatCard label="Total" value={stats?.total ?? 0} />
          <StatCard
            label="Top link"
            value={stats?.topLink?.label ?? "—"}
            highlight
          />
        </div>

        <section className="bg-secondary/50 rounded-xl p-4 sm:p-6 border border-border">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
            Cliques por dia (últimos 30 dias)
          </h2>
          <ClicksChart data={clicksOverTime} />
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <section className="bg-secondary/50 rounded-xl p-4 sm:p-6 border border-border">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Cliques por link
            </h2>
            <LinksChart data={linksData} />
          </section>

          <section className="bg-secondary/50 rounded-xl p-4 sm:p-6 border border-border">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Top referrers
            </h2>
            <ReferrersTable data={referrers} />
          </section>
        </div>

        <section className="bg-secondary/50 rounded-xl p-4 sm:p-6 border border-border">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
            Últimos cliques
          </h2>
          <RecentClicks data={recent} />
        </section>
      </main>
    </div>
  );
}
