import { NextResponse } from "next/server";
import { getAuthStatus } from "@/lib/dashboard-auth";
import { getClicksPerLink } from "@/lib/dashboard-api";

export async function GET() {
  if (!(await getAuthStatus())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getClicksPerLink();
  return NextResponse.json(data);
}
