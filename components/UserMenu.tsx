"use client";

import { useState, useRef, useEffect } from "react";

type UserProfile = {
  id: string;
  email: string;
  displayName: string;
  plan: "free" | "pro" | "team" | "admin";
};

export function UserMenu({ user }: { user: UserProfile }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const signOutRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const planBadges: Record<string, { label: string; color: string }> = {
    free: { label: "Free", color: "var(--text-muted)" },
    pro: { label: "Pro", color: "var(--green)" },
    team: { label: "Team", color: "#6366f1" },
    admin: { label: "Admin", color: "var(--amber)" },
  };
  const badge = planBadges[user.plan] ?? planBadges.free;

  return (
    <>
      <form ref={signOutRef} action="/api/auth/sign-out" method="post" style={{ display: "none" }} />
      <div ref={ref} className="user-menu-wrapper">
        <button
          className="user-menu-trigger"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="true"
        >
          <span className="user-avatar">{user.displayName.charAt(0).toUpperCase()}</span>
          <span className="user-name">{user.displayName}</span>
        </button>
        {open && (
          <div className="user-menu-dropdown" role="menu">
            <div className="user-menu-header">
              <p className="user-menu-display-name">{user.displayName}</p>
              <p className="user-menu-email">{user.email}</p>
              <span className="user-plan-badge" style={{ background: badge.color }}>
                {badge.label}
              </span>
            </div>
            <a href="/account" role="menuitem" className="user-menu-item" onClick={() => setOpen(false)}>
              Account Settings
            </a>
            <a href="/pricing" role="menuitem" className="user-menu-item" onClick={() => setOpen(false)}>
              Pricing
            </a>
            <hr className="user-menu-divider" />
            <button
              role="menuitem"
              className="user-menu-item user-menu-signout"
              onClick={() => {
                setOpen(false);
                signOutRef.current?.requestSubmit();
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
