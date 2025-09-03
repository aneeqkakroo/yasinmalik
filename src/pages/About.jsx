import { Section, Card } from "../components/ui.jsx";
import TimelineList from "../components/TimelineList.jsx";
import timeline from "../data/timeline.js";

export default function About() {
  return (
    <Section title="About Yasin Malik" kicker="Biography">
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-xl font-semibold text-white">Textual Biography</h3>
          <p className="mt-3 text-white/80 leading-relaxed">
            Replace this with a detailed, well-sourced narrative: early years,
            student activism, arrests/detentions, the public renunciation of
            armed struggle in 1994, diplomatic outreach, and recent legal
            proceedings. Keep dates accurate and cite primary sources.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Quick Facts</h3>
          <ul className="mt-3 space-y-2 text-white/80 text-sm">
            <li>• Advocating non-violent resolution since 1994</li>
            <li>• Meetings with Indian leaders & foreign envoys</li>
            <li>• Ongoing legal case with rights concerns</li>
          </ul>
        </Card>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <TimelineList items={timeline} />
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Featured Documents</h4>
          <div className="space-y-3 text-white/80 text-sm">
            <a href="#" className="block hover:underline">1994 Statement on Non-Violence (PDF)</a>
            <a href="#" className="block hover:underline">Major Interviews & Profiles (1999–2012)</a>
          </div>
        </Card>
      </div>
    </Section>
  );
}
