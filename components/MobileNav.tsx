'use client';

import { useState } from 'react';

type NavLink = {
  label: string;
  href: string;
};

type MobileNavProps = {
  links: NavLink[];
};

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-nav-wrapper">
      <button
        className="mobile-menu-btn"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {open && (
        <div className="mobile-overlay" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      <nav
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        aria-label="Mobile navigation"
        role="navigation"
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
