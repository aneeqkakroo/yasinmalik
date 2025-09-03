import { Section, Card } from "../components/ui.jsx";
import resources from "../data/resources.js";

export default function Resources() {
  return (
    <Section title="Resources" kicker="Library">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r) => (
          <Card key={r.id} className="p-5 transition hover:bg-white/10">
            <div className="text-xs text-white/60">
              {r.type} • {r.meta}
            </div>
            <a href={r.href} className="mt-1 block font-semibold text-white hover:underline">
              {r.title}
            </a>
          </Card>
        ))}
      </div>
    </Section>
  );
}
