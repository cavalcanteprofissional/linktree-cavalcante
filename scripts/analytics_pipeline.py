#!/usr/bin/env python3
"""
[PLACEHOLDER] Pipeline batch de analytics.
Só executa se SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY estiverem presentes.
Será implementado na Etapa 10.

Uso:
    python scripts/analytics_pipeline.py
"""

import os
import sys

def main():
    if not os.getenv("SUPABASE_URL") or not os.getenv("SUPABASE_SERVICE_ROLE_KEY"):
        print("[analytics_pipeline] Supabase não configurado. Pulando pipeline.")
        sys.exit(0)

    # TODO: agregar link_clicks por dia, link_id, etc.
    print("[analytics_pipeline] Pipeline não implementado ainda.")
    sys.exit(0)

if __name__ == "__main__":
    main()
