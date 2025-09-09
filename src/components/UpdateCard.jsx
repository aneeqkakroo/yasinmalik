// src/components/UpdateCard.jsx
import YouTubeEmbed from "./YouTubeEmbed.jsx";
import { Card } from "./ui.jsx";

function MediaBlock({ media }) {
  if (!media) return null;

  if (media.type === "youtube") {
    return (
      <YouTubeEmbed
        url={media.url}
        title={media.title || "Update video"}
        className="!rounded-b-none"
        ratio="aspect-video"
      />
    );
  }

  if (media.type === "video") {
    return (
      <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl border-b border-white/10 bg-black/40">
        <video
          src={media.src}
          poster={media.poster}
          className="h-full w-full object-cover"
          controls
          playsInline
        />
      </div>
    );
  }

  // default: image/gif
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl border-b border-white/10 bg-black/40">
      <img
        src={media.src}
        alt={media.alt || "Update image"}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

export default function UpdateCard({ item }) {
  return (
    <Card className="overflow-hidden flex flex-col">
      {/* Media */}
      <MediaBlock media={item.media} />

      {/* Body */}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
          <time dateTime={item.date}>{new Date(item.date).toLocaleDateString()}</time>
          <span className="mx-1">•</span>
          <span>{item.location}</span>
        </div>

        <h3 className="mt-2 text-lg font-semibold text-white">
          {item.title}
        </h3>

        <p className="mt-2 text-sm text-white/80">
          {item.desc}
        </p>

        {item.link && (
          <div className="mt-4">
            {/* Use your Button from ui.jsx */}
            <a
              href={item.link}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
              target="_blank" rel="noopener noreferrer"
            >
              {item.button}
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
