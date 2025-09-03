import { Badge, Button, Container } from "./ui.jsx";

export default function Hero() {
  return (
    <section className="pt-28 sm:pt-32 pb-16 bg-gradient-to-b from-black via-zinc-950 to-black">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left side: text */}
          <div>
            <div className="inline-flex flex-wrap items-center gap-2 mb-4">
              <Badge>Campaign Hub</Badge>
              <Badge>Verified Sources</Badge>
              <Badge>Peace & Due Process</Badge>
            </div>

            <h1 className="text-[clamp(28px,6vw,56px)] font-extrabold leading-tight text-white">
              Evidence-led campaign for <span className="text-rose-500">Yasin Malik</span>
            </h1>

            <p className="mt-4 text-white/80 text-lg max-w-xl">
              A modern archive of his life, diplomatic engagements, media
              coverage, and resources—paired with actions you can take today.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/get-involved">Get Involved</Button>
              <a
                href="/resources"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
              >
                Browse Resources
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-white/70 text-sm">
              <span>Updated regularly</span>
              <span>Fact-checked citations</span>
            </div>
          </div>

          {/* Right side: image */}
          <div className="relative lg:justify-self-end">
            <div className="mx-auto lg:mx-0 w-full max-w-[560px] aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
                alt="Portrait"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
