import { useEffect, useRef, useState } from "react";

/**
 * Robust Getty embed:
 * - Injects widgets.js if missing
 * - Waits for onload OR retries up to 10s
 * - Calls gie.widgets.load with your exact id/items/sig
 * - Falls back to <img> with a helpful console message
 */
export default function GettyEmbed({
  id,            // e.g. "9clmgfwdQ2Z5D1PP00JtaA"
  items,         // e.g. "56869743"
  sig,           // e.g. "dmLdMRg1O68KbH2uno_Rh56r9nDdx5DHbHz6gaXyjic="
  width = "100%",
  height = "360px",
  caption = true,
  tld = "com",
  is360 = false,
  fallbackSrc = "",
  className = "",
}) {
  const [failed, setFailed] = useState(false);
  const triedRef = useRef(false);

  useEffect(() => {
    if (triedRef.current) return;
    triedRef.current = true;

    const SCRIPT_ID = "getty-widgets-js";
    let cancelled = false;
    let retries = 0;
    const maxRetries = 80; // 80 * 125ms ≈ 10s

    function ensureScript() {
      return new Promise((resolve, reject) => {
        let s = document.getElementById(SCRIPT_ID);
        if (s) {
          // already present: if it has loaded, resolve immediately; otherwise wait for load
          if (s.getAttribute("data-loaded") === "true") return resolve();
          s.addEventListener("load", () => resolve(), { once: true });
          s.addEventListener("error", () => reject(new Error("widgets.js load error")), { once: true });
          return;
        }
        // inject
        s = document.createElement("script");
        s.id = SCRIPT_ID;
        s.src = "https://embed-cdn.gettyimages.com/widgets.js";
        s.async = true;
        s.onload = () => {
          s.setAttribute("data-loaded", "true");
          resolve();
        };
        s.onerror = () => reject(new Error("widgets.js load error"));
        document.body.appendChild(s);
      });
    }

    function queueInit() {
      window.gie =
        window.gie ||
        function (c) {
          (window.gie.q = window.gie.q || []).push(c);
        };

      const tick = () => {
        if (cancelled) return;
        const ready = !!(window.gie && window.gie.widgets && window.gie.widgets.load);
        if (ready) {
          window.gie(function () {
            try {
              window.gie.widgets.load({
                id,
                sig,
                w: width,
                h: height,
                items,
                caption,
                tld,
                is360,
              });
              // success – don’t set failed
            } catch (e) {
              console.warn("[GettyEmbed] gie.widgets.load threw:", e);
              setFailed(true);
            }
          });
          return;
        }
        retries++;
        if (retries > maxRetries) {
          console.warn(
            "[GettyEmbed] Timed out waiting for gie.widgets.load. " +
              "This is often caused by ad/script blockers. " +
              "Check Network tab for embed-cdn.gettyimages.com/widgets.js"
          );
          setFailed(true);
          return;
        }
        setTimeout(tick, 125);
      };

      tick();
    }

    (async () => {
      try {
        await ensureScript();
        if (!cancelled) queueInit();
      } catch (err) {
        console.warn("[GettyEmbed] Failed to load widgets.js:", err);
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, items, sig, width, height, caption, tld, is360]);

  // Fallback image if the widget cannot load (blocked, offline, etc.)
  if (failed && fallbackSrc) {
    return (
      <div className={className}>
        <img
          src={fallbackSrc}
          alt="Getty image"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Anchor that Getty transforms
  return (
    <div className={className}>
      <a
        id={id}
        className="gie-single"
        href={`https://www.gettyimages.${tld}/detail/${items}`}
        target="_blank"
        rel="noreferrer"
        style={{
          color: "#a7a7a7",
          textDecoration: "none",
          fontWeight: "normal",
          border: "none",
          display: "inline-block",
        }}
      >
        Embed from Getty Images
      </a>
    </div>
  );
}
