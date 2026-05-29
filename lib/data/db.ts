import crypto from "node:crypto";

export type UserRecord = {
  id: string;
  email: string;
  displayName: string;
  passwordHash: string | null;
  plan: "free" | "pro" | "team" | "admin";
  createdAt: string;
  updatedAt: string;
};

export type SessionRecord = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
};

export function cryptoId(): string {
  return crypto.randomUUID();
}
