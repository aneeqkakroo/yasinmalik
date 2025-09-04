// src/components/ScrollHandler.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Wait for DOM to be ready before trying to scroll
    setTimeout(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }, 0);
  }, [pathname, hash]);

  return null;
}
