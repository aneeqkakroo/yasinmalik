import { useEffect, useMemo, useRef, useState } from "react";

// simple formatter with thousands separators
const formatInt = (n) => new Intl.NumberFormat().format(Math.round(n));

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

/** Count up when `active` becomes true */
function CountUp({ to = 0, duration = 1600, active, prefix = "", suffix = "", className = "" }) {
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    if (!active) return;
    cancelAnimationFrame(rafRef.current);

    if (reduced || duration <= 0) {
      setVal(to);
      return;
    }

    const start = performance.now();
    const from = 0;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (to - from) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [to, duration, active, reduced]);

  return (
    <div className={className} aria-label={`${prefix}${formatInt(val)}${suffix}`}>
      {prefix}{formatInt(val)}{suffix}
    </div>
  );
}

/**
 * NumbersBanner
 * Props:
 * - bg: background image URL
 * - targets: { petitions, daysInJail, fabricatedCases }
 * - title: section title
 */
export default function NumbersBanner({
  bg = "/hero.jpg",
  title = "SUCCESS IN NUMBERS",
  targets = { petitions: 4000, daysInJail: 820, fabricatedCases: 7 },
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  // Observe once: start anim when ~30% visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const items = useMemo(
    () => [
      { label: "Petition signs for demanding Justice", value: targets.petitions, suffix: "+" },
      { label: "Days of illgal incarceration", value: targets.daysInJail },
      { label: "Fabricated politicaly motivated cases", value: targets.fabricatedCases },
    ],
    [targets]
  );

  return (
    <section
      ref={ref}
      className="relative w-full text-white"
      aria-label={title}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/85" aria-hidden="true" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-center text-xl sm:text-2xl font-extrabold tracking-wide mb-8 sm:mb-10">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {items.map((it) => (
            <div key={it.label} className="text-center">
              <CountUp
                to={it.value}
                duration={3200}
                active={inView}
                suffix={it.suffix || ""}
                className="text-5xl sm:text-6xl font-extrabold leading-none drop-shadow-md"
              />
              <p className="mt-3 text-base sm:text-lg text-white/90">{it.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
