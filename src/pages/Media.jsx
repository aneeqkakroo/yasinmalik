import { Section, Card } from "../components/ui.jsx";
import  InstagramEmbed from "../components/InstagramEmbed.jsx";
import media from "../data/media.js";

export default function Media() {
  return (
    <>
    <Section title="Media Archives" kicker="Archive">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((m) => (
          <a
            key={m.id}
            href={m.src}
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-2xl border border-white/10"
          >
            <img
              src={m.src}
              alt={m.alt}
              className="h-44 w-full object-cover transition group-hover:scale-105"
            />
            <div className="p-2 text-xs text-white/70">{m.alt}</div>
          </a>
        ))}
      </div>

    </Section>

    <Section title="Instagram Highlight" kicker="Social Media">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <InstagramEmbed
      url="https://www.instagram.com/p/DN6PJo_DVTx/"
      captioned={false}
    />
    <InstagramEmbed
      url="https://www.instagram.com/reel/DNbBbSGIX3r/"  // replace with another post
      captioned={false}
    />
    <InstagramEmbed
      url="https://www.instagram.com/p/DNPMyH2IMWf/"  // replace with another post
      captioned={false}
    />
  </div>
    </Section>
    </>
  );
}
