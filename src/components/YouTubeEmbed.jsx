// src/components/YouTubeEmbed.jsx
import { useEffect, useRef, useState } from "react";

/** Extract a YouTube video ID from common URL formats, or return the input if it's already an ID */
function getYouTubeId(input = "") {
  if (!input) return "";
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  try {
    const url = new URL(input);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      if (/^[A-Za-z0-9_-]{11}$/.test(id)) return id;
    }
    const embed = url.pathname.match(/\/embed\/([A-Za-z0-9_-]{11})/);
    if (embed) return embed[1];
    const shorts = url.pathname.match(/\/shorts\/([A-Za-z0-9_-]{11})/);
    if (shorts) return shorts[1];
    const v = url.searchParams.get("v");
    if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v;
  } catch { /* ignore */ }
  return "";
}

export default function YouTubeEmbed({
  id,
  url,
  title = "YouTube video player",
  start = 0,
  autoplay = false,
  controls = 1,
  className = "",
  /** When true, crops the video to COVER the container (no letterboxing) */
  cover = false,
  /** When not covering, use a Tailwind aspect (e.g., "aspect-video", "aspect-square") */
  ratio = "aspect-video",
  rounded = true,
  border = true,
}) {
  const videoId = getYouTubeId(id || url);
  if (!videoId) return null;

  const params = new URLSearchParams({
    start: String(start || 0),
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    controls: String(controls ? 1 : 0),
    autoplay: autoplay ? "1" : "0",
    mute: autoplay ? "1" : "0",
  });
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

  const wrapperRef = useRef(null);
  const [size, setSize] = useState({ width: "100%", height: "100%" });

  // 16:9 = 1.7777777778
  const VIDEO_AR = 16 / 9;

  useEffect(() => {
    if (!cover) return;

    const el = wrapperRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect;
      const w = cr.width;
      const h = cr.height;
      const containerAR = w / h;

      if (containerAR >= VIDEO_AR) {
        // Container is wider than 16:9 → fill by height (crop left/right)
        const iframeW = h * VIDEO_AR;
        setSize({ width: `${iframeW}px`, height: `${h}px` });
      } else {
        // Container is taller/narrower → fill by width (crop top/bottom)
        const iframeH = w / VIDEO_AR;
        setSize({ width: `${w}px`, height: `${iframeH}px` });
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [cover]);

  const base = "relative w-full overflow-hidden bg-black/50";
  const shape = `${rounded ? "rounded-2xl" : ""} ${border ? "border border-white/10" : ""}`;
  const sizing = cover ? "h-full" : ratio; // with cover, height is driven by parent
  const wrapperClass = [base, shape, sizing, className].filter(Boolean).join(" ");

  return (
    <div ref={wrapperRef} className={wrapperClass}>
      <iframe
        src={src}
        title={title}
        // Center the iframe and size it according to the container to achieve "cover"
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block ${cover ? "" : "inset-0 w-full h-full"}`}
        style={cover ? size : undefined}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
