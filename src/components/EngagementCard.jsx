import { Card } from "./ui.jsx";
import GettyEmbed from "./GettyEmbed.jsx";

export default function EngagementCard({ item }) {
  return (
    <Card className="overflow-hidden">
      <div className="grid sm:grid-cols-2">
        <div className="relative">
          {item.getty ? (
            <GettyEmbed
              id={item.getty.id}
              items={item.getty.items}
              width={item.getty.width}
              height={item.getty.height}
              caption={item.getty.caption}
              tld={item.getty.tld}
              is360={item.getty.is360}
            />
          ) : (
            <img
              src={item.img}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="p-6">
          <div className="mb-2 flex items-center gap-2 text-xs text-white/60">
            <span>{item.year}</span>
            <span className="mx-2">•</span>
            <span>{item.location}</span>
          </div>

          <h4 className="text-lg font-semibold text-white">{item.title}</h4>
          <p className="mt-2 text-sm text-white/80">{item.blurb}</p>

          <div className="mt-4 text-sm text-white/70">
            <strong>With:</strong> {item.who}
          </div>
        </div>
      </div>
    </Card>
  );
}
