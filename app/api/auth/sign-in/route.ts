import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, createSession } from "@/lib/data/repository";
import { sessionCookieName } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/");

  if (!email.includes("@") || !password) {
    return NextResponse.redirect(new URL("/sign-in?error=invalid-credentials", request.url));
  }

  const user = await authenticateUser(email, password);
  if (!user) {
    return NextResponse.redirect(new URL("/sign-in?error=invalid-credentials", request.url));
  }

  const session = await createSession(user.id);
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(session.expiresAt),
    path: "/",
  });

  return NextResponse.redirect(new URL(next.startsWith("/") ? next : "/", request.url));
}
