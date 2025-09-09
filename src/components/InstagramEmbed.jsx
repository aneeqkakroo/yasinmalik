// src/components/InstagramIFrameEmbed.jsx
import { useEffect, useMemo, useRef, useState } from "react";

/** Return a clean embed URL for posts/reels */
function buildEmbedSrc(rawUrl, { captioned = true } = {}) {
  try {
    const u = new URL(rawUrl);
    // normalize path: /p/<id>/ or /reel/<id>/ etc.
    const [, type, code] = u.pathname.split("/"); // ["", "p", "<code>", ""]
    if (!type || !code) return null;
    const base = `https://www.instagram.com/${type}/${code}/embed`;
    return captioned ? `${base}/captioned/` : `${base}/`;
  } catch {
    return null;
  }
}

export default function InstagramEmbed({
  url,
  captioned = true,
  maxWidth = 658,     // IG renders best up to ~658px
  className = "",
}) {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(0);

  const src = useMemo(() => buildEmbedSrc(url, { captioned }), [url, captioned]);

  useEffect(() => {
    if (!src) return;

    const handler = (event) => {
      // only accept messages from Instagram
      if (!event.origin || !event.origin.includes("instagram.com")) return;

      // IG sends various messages; the ones we want include a numeric 'height'
      const data = event.data;
      if (!data) return;

      // handle both stringified and object messages
      let payload = data;
      if (typeof data === "string") {
        try { payload = JSON.parse(data); } catch { /* ignore */ }
      }

      const maybeHeight =
        (payload && (payload.height || payload?.details?.height || payload?.message?.height)) || 0;

      if (Number.isFinite(maybeHeight) && maybeHeight > 0) {
        setHeight(Math.ceil(maybeHeight));
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [src]);

  if (!src) return null;

  return (
    <div
      className={`mx-auto w-full ${className}`}
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title="Instagram post"
        // width stretches; height comes from postMessage
        style={{ width: "100%", height: height ? `${height}px` : "0px", border: 0, overflow: "hidden" }}
        allowTransparency
        scrolling="no"
        frameBorder="0"
      />
    </div>
  );
}
