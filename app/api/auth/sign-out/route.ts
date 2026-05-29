import { NextRequest, NextResponse } from "next/server";
import { clearCurrentSession } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  await clearCurrentSession();
  return NextResponse.redirect(new URL("/", request.url));
}
