// src/components/Footer.jsx
import React from "react";
import { Container } from "./ui.jsx";

/**
 * Plug-and-play Footer with social icons.
 * Edit the href values below or pass a `socials` prop to override.
 */
const defaultSocials = [
  { name: "X (Twitter)", href: "https://x.com/yasinjklf", key: "x" },
  { name: "Instagram",   href: "https://www.instagram.com/yasinmalik.official", key: "ig" },
  { name: "YouTube",     href: "https://www.youtube.com/@yasinmalik.official", key: "yt" },
  { name: "Facebook",    href: "https://www.facebook.com/yasinmalik.official", key: "fb" },
];

// Minimal inline SVG icons (adapt to currentColor)
function Icon({ k, className = "h-5 w-5" }) {
  switch (k) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case "ig":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "yt":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="7" width="18" height="10" rx="2" />
          <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "fb":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M13.5 21v-7h2l.6-3h-2.6v-1.7c0-.7.3-1.3 1.3-1.3H16V5.5c-.5-.1-1.3-.2-2.1-.2-2.1 0-3.4 1.3-3.4 3.6V11H9v3h1.5v7h3z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer({ socials = defaultSocials }) {
  const year = new Date().getFullYear();

  return (
  <footer className="mt-16 border-t border-white/10 bg-black/30 backdrop-blur min-h-40 flex">
    <Container className="flex flex-1 items-center justify-between">
        {/* Left: brand/copyright */}
        <div className="text-white/70 text-sm">
          <p>© {year} Kashmir Ke Waris</p>
          <p className="mt-1">All rights reserved.</p>
        </div>

        {/* Right: socials */}
        <nav aria-label="Social media">
          <ul className="flex items-center gap-3">
            {socials
              .filter((s) => s?.href)
              .map(({ name, href, key }) => (
                <li key={key || name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-rose-600/20 hover:border-rose-600/40 transition"
                    title={name}
                  >
                    <Icon k={key} />
                    <span className="sr-only">{name}</span>
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
