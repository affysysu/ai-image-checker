export type UserProfile = {
  id: string;
  email: string;
  displayName: string;
  plan: "free" | "pro" | "team" | "admin";
  createdAt: string;
};

export type DetectionEntitlements = {
  dailyDetections: number | null; // null = unlimited
  maxFileSize: number; // bytes
  engines: string[];
  historyLimit: number;
};
