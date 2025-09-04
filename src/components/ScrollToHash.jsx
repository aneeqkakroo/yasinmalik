// ScrollToHash.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;

    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // optional: focus for a11y
        el.tabIndex = -1;
        el.focus({ preventScroll: true });
      } else if (tries++ < 20) {
        // wait for content to render (e.g., data load)
        requestAnimationFrame(tick);
      }
    };
    tick();
  }, [hash]);

  return null;
}
