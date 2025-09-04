import { Card, Button} from "./ui.jsx";

export default function TimelineList({ items = [] }) {
  return (
    <Card className="p-6">
      <h4 className="text-lg font-semibold text-white mb-4">Life Timeline</h4>

      <ol className="relative border-l border-white/10 ml-2">
        {items.map((t, i) => (
          <li key={i} className="mb-6 ml-4">
            {/* Dot on the line */}
            <div className="absolute w-3 h-3 bg-rose-600 rounded-full -left-[6.5px] mt-1.5" />

            {/* Date */}
            <time className="text-xs text-white/60">{t.date}</time>

            {/* Title */}
            <h5 className="text-white font-semibold">{t.title}</h5>

            {/* Body */}
            <p className="text-white/75 text-sm">{t.body}</p>
          </li>
        ))}
      </ol>
      <Button href="/about">Complete Timeline</Button>
    </Card>
  );
}
