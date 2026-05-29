import crypto from "node:crypto";
import { promisify } from "node:util";
import { cryptoId } from "@/lib/data/db";
import { getSupabase } from "@/lib/data/supabase";
import type { UserProfile } from "@/lib/data/types";

const scryptAsync = promisify(crypto.scrypt);

// ---------------------------------------------------------------------------
// Password hashing
// ---------------------------------------------------------------------------

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return crypto.timingSafeEqual(Buffer.from(key, "hex"), derived);
}

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export async function createUser(email: string, password: string, displayName: string): Promise<UserProfile> {
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await hashPassword(password);
  const now = new Date().toISOString();
  const { data: created, error } = await getSupabase()
    .from("users")
    .insert({
      id: cryptoId(),
      email: normalizedEmail,
      display_name: displayName.trim() || normalizedEmail.split("@")[0],
      password_hash: passwordHash,
      plan: "free",
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();
  if (error) {
    if (error.code === "23505") throw new Error("EMAIL_EXISTS");
    throw error;
  }
  return mapUserFromDb(created);
}

export async function authenticateUser(email: string, password: string): Promise<UserProfile | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const { data: user } = await getSupabase()
    .from("users")
    .select("*")
    .eq("email", normalizedEmail)
    .single();
  if (!user || !user.password_hash) return null;
  const valid = await verifyPassword(password, user.password_hash as string);
  return valid ? mapUserFromDb(user) : null;
}

export async function findOrCreateUser(email: string, displayName?: string): Promise<UserProfile> {
  const normalizedEmail = email.trim().toLowerCase();
  const { data: existing } = await getSupabase()
    .from("users")
    .select("*")
    .eq("email", normalizedEmail)
    .single();
  if (existing) return mapUserFromDb(existing);

  const now = new Date().toISOString();
  const { data: created, error } = await getSupabase()
    .from("users")
    .insert({
      id: cryptoId(),
      email: normalizedEmail,
      display_name: displayName?.trim() || normalizedEmail.split("@")[0],
      plan: "free",
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();
  if (error) throw error;
  return mapUserFromDb(created);
}

export async function getUserByEmail(email: string): Promise<UserProfile | null> {
  const { data, error } = await getSupabase()
    .from("users")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .single();
  if (error || !data) return null;
  return mapUserFromDb(data);
}

export async function updateUserProfile(userId: string, displayName: string): Promise<void> {
  const { error } = await getSupabase()
    .from("users")
    .update({ display_name: displayName, updated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw error;
}

export async function updateUserPlan(userId: string, plan: UserProfile["plan"]): Promise<void> {
  const { error } = await getSupabase()
    .from("users")
    .update({ plan, updated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw error;
}

export async function deleteUser(userId: string): Promise<void> {
  const { error } = await getSupabase().from("users").delete().eq("id", userId);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

export async function createSession(userId: string): Promise<{ token: string; expiresAt: string }> {
  const token = crypto.randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30).toISOString();

  const { error } = await getSupabase().from("sessions").insert({
    id: cryptoId(),
    user_id: userId,
    token_hash: tokenHash,
    expires_at: expiresAt,
    created_at: now.toISOString(),
  });
  if (error) throw error;
  return { token, expiresAt };
}

export async function getUserBySessionToken(token: string | undefined): Promise<UserProfile | null> {
  if (!token) return null;
  const tokenHash = hashToken(token);
  const now = new Date().toISOString();

  const { data: session } = await getSupabase()
    .from("sessions")
    .select("user_id, expires_at")
    .eq("token_hash", tokenHash)
    .gt("expires_at", now)
    .single();
  if (!session) return null;

  const { data: user } = await getSupabase()
    .from("users")
    .select("*")
    .eq("id", session.user_id)
    .single();
  return user ? mapUserFromDb(user) : null;
}

export async function deleteSession(token: string | undefined): Promise<void> {
  if (!token) return;
  const tokenHash = hashToken(token);
  await getSupabase().from("sessions").delete().eq("token_hash", tokenHash);
}

// ---------------------------------------------------------------------------
// Entitlements
// ---------------------------------------------------------------------------

export function getPlanEntitlements(plan: UserProfile["plan"]) {
  const plans = {
    free: { dailyDetections: 10, maxFileSize: 20 * 1024 * 1024, engines: ["all"], historyLimit: 20 },
    pro: { dailyDetections: null, maxFileSize: 50 * 1024 * 1024, engines: ["all"], historyLimit: 500 },
    team: { dailyDetections: null, maxFileSize: 50 * 1024 * 1024, engines: ["all"], historyLimit: null },
    admin: { dailyDetections: null, maxFileSize: 100 * 1024 * 1024, engines: ["all"], historyLimit: null },
  };
  return plans[plan] ?? plans.free;
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

type DbRow = Record<string, unknown>;

function mapUserFromDb(row: DbRow): UserProfile {
  return {
    id: row.id as string,
    email: row.email as string,
    displayName: (row.display_name ?? "") as string,
    plan: row.plan as UserProfile["plan"],
    createdAt: (row.created_at ?? "") as string,
  };
}

function hashToken(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}
