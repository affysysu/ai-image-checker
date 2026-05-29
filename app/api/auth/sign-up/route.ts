import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createUser, createSession } from "@/lib/data/repository";
import { sessionCookieName } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "");
  const next = String(formData.get("next") ?? "/");

  if (!email.includes("@")) {
    return NextResponse.redirect(new URL("/sign-up?error=invalid-email", request.url));
  }
  if (password.length < 8) {
    return NextResponse.redirect(new URL("/sign-up?error=weak-password", request.url));
  }
  if (!displayName.trim()) {
    return NextResponse.redirect(new URL("/sign-up?error=missing-name", request.url));
  }

  try {
    const user = await createUser(email, password, displayName);
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
  } catch (err) {
    if (err instanceof Error && err.message === "EMAIL_EXISTS") {
      return NextResponse.redirect(new URL("/sign-up?error=email-exists", request.url));
    }
    return NextResponse.redirect(new URL("/sign-up?error=unknown", request.url));
  }
}
