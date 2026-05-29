import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - AI Image Checker",
  description: "Create an AI Image Checker account.",
  robots: { index: false, follow: false },
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const next = params.next ?? "/";
  const error = params.error;

  const errorMessages: Record<string, string> = {
    "email-exists": "An account with this email already exists. Try signing in instead.",
    "weak-password": "Password must be at least 8 characters.",
    "missing-name": "Please enter a display name.",
    "invalid-email": "Please enter a valid email address.",
    unknown: "Something went wrong. Please try again.",
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Account</p>
        <h1>Create account</h1>
        {error && <p className="auth-error">{errorMessages[error] ?? errorMessages.unknown}</p>}

        <form action="/api/auth/sign-up" method="post" className="auth-form">
          <input type="hidden" name="next" value={next} />
          <div className="auth-field">
            <label htmlFor="displayName">Display name</label>
            <input className="auth-input" id="displayName" name="displayName" required placeholder="Your name" />
          </div>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input className="auth-input" id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input className="auth-input" id="password" name="password" type="password" required minLength={8} placeholder="Min. 8 characters" />
          </div>
          <button className="auth-submit" type="submit">
            Create account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <a href={`/sign-in?next=${encodeURIComponent(next)}`}>Sign in</a>
        </p>
      </div>
    </main>
  );
}
