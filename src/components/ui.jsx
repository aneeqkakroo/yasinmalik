// src/components/ui.js

export function Container({ children, className = "" }) {
  return <div className={`app-container ${className}`}>{children}</div>;
}
export function Section({ id, title, kicker, children }) {
  return (
    <section id={id} className="py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-6 sm:mb-8">
          {kicker && <p className="uppercase tracking-widest text-xs sm:text-sm text-rose-500 font-semibold">{kicker}</p>}
          {title && (
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-balance">
              {title}
            </h2>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}


export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

export function Button({ href = "#", children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-rose-600/90 hover:bg-rose-500 text-white transition"
    >
      {children}
    </a>
  );
}
