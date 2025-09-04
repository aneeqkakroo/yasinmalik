import React, { useEffect, useMemo, useState } from "react";

/**
 * Minimal, dependency-free slideshow.
 * - Auto-plays (pause on hover)
 * - Next/Prev controls
 * - Dots indicator
 * - Optional links per slide
 */
export default function Slideshow({
  images = [],               // [{ src, alt, href }]
  interval = 4000,           // ms between slides
  className = "",
  aspect = "aspect-[16/9]",  // override with "aspect-[4/3]" or "aspect-video"
}) {
  const validImages = useMemo(
    () => images.filter((i) => i && i.src),
    [images]
  );
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!validImages.length || paused) return;
    const id = setInterval(() => {
      setIdx((n) => (n + 1) % validImages.length);
    }, interval);
    return () => clearInterval(id);
  }, [validImages.length, interval, paused]);

  if (!validImages.length) return null;

  const go = (n) => setIdx((n + validImages.length) % validImages.length);
  const current = validImages[idx];

  const ImageTag = current.href ? "a" : "div";
  const imageProps = current.href
    ? { href: current.href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div
      className={`relative ${aspect} overflow-hidden rounded-xl ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Media coverage slideshow"
    >
      {/* Slides (stacked for crossfade) */}
      <div className="absolute inset-0">
        {validImages.map((img, i) => (
          <ImageTag
            key={i}
            {...(img.href ? { ...imageProps } : {})}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img.src}
              alt={img.alt || `Slide ${i + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </ImageTag>
        ))}
      </div>

      {/* Controls */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(idx - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(idx + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
        {validImages.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-2 w-2 rounded-full ${
              i === idx ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
