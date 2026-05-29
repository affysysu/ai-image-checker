import { cookies } from "next/headers";
import { deleteSession, getUserBySessionToken } from "@/lib/data/repository";
import type { UserProfile } from "@/lib/data/types";

export const sessionCookieName = "aichecker_session";

export async function getCurrentUser(): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;
  return getUserBySessionToken(token);
}

export async function clearCurrentSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;
  await deleteSession(token);
  cookieStore.delete(sessionCookieName);
}
