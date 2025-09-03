import Hero from "../components/Hero.jsx";
import { Section, Card } from "../components/ui.jsx";
import TimelineList from "../components/TimelineList.jsx";
import timeline from "../data/timeline.js";

export default function Home() {
  return (
    <>
      <Hero />

      <Section title="At a Glance">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bio preview */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-white">Textual Biography</h3>
            <p className="mt-3 text-white/80 leading-relaxed">
              Replace this with a balanced, well-sourced narrative of Yasin
              Malik’s life — early activism, detention, renunciation of armed
              struggle (1994), and later diplomatic engagements.
            </p>
          </Card>

          {/* Timeline preview */}
          <TimelineList items={timeline} />
        </div>
      </Section>
    </>
  );
}
