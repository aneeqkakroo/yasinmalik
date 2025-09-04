// src/components/ScrollHandler.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollHandler() {
  const { pathname, hash } = useLocation();

  // Disable browser's native scroll restoration so we control it
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => (window.history.scrollRestoration = prev);
    }
  }, []);

  useEffect(() => {
    // Helper: try to scroll to hash a few times in case content loads async
    const tryScrollToHash = (attempt = 0) => {
      const target = hash && document.querySelector(decodeURIComponent(hash));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        return;
      }
      if (attempt < 5) {
        setTimeout(() => tryScrollToHash(attempt + 1), 100);
      }
    };

    // Wait for next paint so the route's DOM is mounted
    requestAnimationFrame(() => {
      if (hash) {
        tryScrollToHash();
      } else {
        // Use a standards-compliant value ('auto' or 'smooth'); 'instant' is not valid
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    });
  }, [pathname, hash]);

  return null;
}
