import { NextRequest, NextResponse } from "next/server";
import { isAuthEnabled, setAuthCookie, getAuthStatus } from "@/lib/dashboard-auth";

export async function GET() {
  const authenticated = await getAuthStatus();
  return NextResponse.json({ authenticated, authEnabled: isAuthEnabled() });
}

export async function POST(request: NextRequest) {
  if (!isAuthEnabled()) {
    return NextResponse.json({ ok: true, authenticated: true });
  }

  try {
    const { password } = await request.json();
    if (password === process.env.DASHBOARD_PASSWORD) {
      await setAuthCookie();
      return NextResponse.json({ ok: true, authenticated: true });
    }
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
