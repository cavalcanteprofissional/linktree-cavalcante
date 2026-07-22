import { NextResponse } from "next/server";
import { getAuthStatus } from "@/lib/dashboard-auth";
import { getClicksOverTime } from "@/lib/dashboard-api";

export async function GET() {
  if (!(await getAuthStatus())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getClicksOverTime();
  return NextResponse.json(data);
}
