import { Badge, Button, Container } from "./ui.jsx";
import { Link } from "react-router-dom";


export default function Hero() {
  return (
    <section className="pt-8 sm:pt-16 pb-8 bg-gradient-to-b from-black via-zinc-950 to-black">
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
              International campaign Justice for <span className="text-rose-500">Yasin Malik</span>
            </h1>

            <p className="mt-4 text-white/80 text-lg max-w-xl">
              A modern archive of his life, diplomatic engagements, media
              coverage, and resources—paired with actions you can take today.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/get-involved">Get Involved</Button>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
              >
                Browse Resources
              </Link>
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
                src="https://media.gettyimages.com/id/468911758/photo/srinagar-india-kashmiri-separatist-leader-and-jklf-chairman-yasin-malik-addressing-press.jpg?s=612x612&w=0&k=20&c=MyAy1F1psy6OER0ToMOGzgJWWim56qLuCvbGHQa_Qwg="
                alt="Portrait"
                loading="lazy"
                className="h-full w-full object-cover object-left"
                style={{ objectPosition: "left 50%" }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
