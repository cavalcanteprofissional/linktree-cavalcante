import { NextResponse } from "next/server";
import { getAuthStatus } from "@/lib/dashboard-auth";
import { getReferrers } from "@/lib/dashboard-api";

export async function GET() {
  if (!(await getAuthStatus())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getReferrers();
  return NextResponse.json(data);
}
