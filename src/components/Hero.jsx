import { Badge, Button, Container } from "./ui.jsx";

export default function Hero() {
  return (
    <section className="pt-28 sm:pt-32 pb-16 bg-gradient-to-b from-black via-zinc-950 to-black">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left side: text */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <Badge>Campaign Hub</Badge>
              <Badge>Verified Sources</Badge>
              <Badge>Peace & Due Process</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Evidence-led campaign for{" "}
              <span className="text-rose-500">Yasin Malik</span>
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
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              {/* Replace this with an authorized image */}
              <img
                src="/ymhero.jpg"
                alt="Portrait"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
