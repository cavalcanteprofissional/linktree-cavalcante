import { NextResponse } from "next/server";
import { getAuthStatus } from "@/lib/dashboard-auth";
import { getStats } from "@/lib/dashboard-api";

export async function GET() {
  if (!(await getAuthStatus())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getStats();
  return NextResponse.json(data);
}
