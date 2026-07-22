#!/usr/bin/env python3
"""
Pipeline batch de analytics — agrega cliques por dia/link/referrer.

Requer:
    pip install supabase

Uso:
    python scripts/analytics_pipeline.py

Variáveis de ambiente necessárias:
    SUPABASE_URL
    SUPABASE_SERVICE_ROLE_KEY
"""

import os
import sys
from datetime import date, timedelta
from supabase import create_client, Client


def main():
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if not supabase_url or not supabase_key:
        print("[analytics_pipeline] Supabase não configurado. Pulando pipeline.")
        sys.exit(0)

    supabase: Client = create_client(supabase_url, supabase_key)

    yesterday = date.today() - timedelta(days=1)
    print(f"[analytics_pipeline] Agregando cliques de {yesterday}...")

    clicks = (
        supabase.table("link_clicks")
        .select("link_id, referrer")
        .gte("clicked_at", yesterday.isoformat())
        .lt("clicked_at", date.today().isoformat())
        .execute()
    )

    if not clicks.data:
        print("[analytics_pipeline] Nenhum clique encontrado para agregação.")
        sys.exit(0)

    daily: dict[str, int] = {}
    for c in clicks.data:
        daily[c["link_id"]] = daily.get(c["link_id"], 0) + 1

    for link_id, total in daily.items():
        supabase.table("link_clicks_daily").upsert(
            {
                "link_id": link_id,
                "click_date": yesterday.isoformat(),
                "total_clicks": total,
            },
            on_conflict="link_id, click_date",
        ).execute()

    print(f"[analytics_pipeline] {len(daily)} links agregados com sucesso.")
    sys.exit(0)


if __name__ == "__main__":
    main()
