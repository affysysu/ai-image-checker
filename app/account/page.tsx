import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { UserMenu } from "@/components/UserMenu";

export const metadata: Metadata = {
  title: "Account - AI Image Checker",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/account");

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" aria-label="AI Image Checker home">
          <span className="brand-mark" aria-hidden="true">AI</span>
          <span>AI Image Checker</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="/">Detector</a>
          <a href="/pricing">Pricing</a>
        </nav>
        <UserMenu user={user} />
      </header>

      <main className="pricing-page">
        <div className="pricing-header">
          <p className="eyebrow">Account</p>
          <h1>Account settings</h1>
        </div>

        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div className="auth-card" style={{ maxWidth: "100%" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", margin: "0 0 0.25rem" }}>
                Display name
              </p>
              <p style={{ margin: 0, fontSize: "1.1rem" }}>{user.displayName}</p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", margin: "0 0 0.25rem" }}>
                Email
              </p>
              <p style={{ margin: 0 }}>{user.email}</p>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", margin: "0 0 0.25rem" }}>
                Plan
              </p>
              <p style={{ margin: 0, textTransform: "capitalize" }}>{user.plan}</p>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="/pricing" className="pricing-btn pricing-btn-primary" style={{ flex: 1, textDecoration: "none" }}>
                View Pricing
              </a>
              <form action="/api/auth/sign-out" method="post" style={{ flex: 1 }}>
                <button type="submit" className="pricing-btn pricing-btn-secondary" style={{ width: "100%" }}>
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
