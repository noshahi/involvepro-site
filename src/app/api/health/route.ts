import { NextResponse } from "next/server";
import { isDatabaseConfigured, prisma } from "@/lib/db";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ status: "ok", database: "not_configured" });
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", database: "reachable" });
  } catch (err) {
    console.error("[health] Database check failed:", err);
    return NextResponse.json({ status: "error", database: "unreachable" }, { status: 503 });
  }
}
