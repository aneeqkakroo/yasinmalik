import { Card } from "./ui.jsx";
import GettyEmbed from "./GettyEmbed.jsx";

export default function EngagementCard({ item }) {
  const hasGetty = !!item.getty;

  return (
    <Card className="overflow-hidden">
      <div className="grid sm:grid-cols-2">
        <div className="relative">
          {hasGetty ? (
            <GettyEmbed
              id={item.getty.id}
              items={item.getty.items}
              sig={item.getty.sig}               // REQUIRED
              width="100%"                        // responsive
              height="360px"                      // adjust as you like
              caption={true}
              tld="com"
              fallbackSrc={item.img || ""}       // optional
              className="p-2"
            />
          ) : (
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-56 sm:h-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        <div className="p-6">
          <div className="mb-2 flex items-center gap-2 text-xs text-white/60">
            <span>{item.year}</span>
            <span className="mx-2">•</span>
            <span>{item.location}</span>
          </div>
          <h4 className="text-lg font-semibold">{item.title}</h4>
          <p className="mt-2 text-sm text-white/80">{item.blurb}</p>
          <div className="mt-4 text-sm text-white/70">
            <strong>With:</strong> {item.who}
          </div>
        </div>
      </div>
    </Card>
  );
}
