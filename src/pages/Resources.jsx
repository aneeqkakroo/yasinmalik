import { Section, Card } from "../components/ui.jsx";
import resources from "../data/resources.js";
import PostcodeToMP from "../components/PostcodeToMP";

export default function Resources() {
  return (
    <>
    <Section title="Resources" kicker="Library">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r) => (
          <Card key={r.id} className="p-5 transition hover:bg-white/10">
            <div className="text-xs text-white/60">
              {r.type} • {r.meta}
            </div>
            <a href={r.href} className="mt-1 block font-semibold text-white hover:underline" target="_blank">
              {r.title}
            </a>
          </Card>
        ))}
      </div>
    </Section>
    {/*MP Finder*/}
    <Section title="MP Finder" kicker="Campaign">
      <div className=" bg-black-200">
      <PostcodeToMP />
    </div>
    </Section>
    </>
  );
}
