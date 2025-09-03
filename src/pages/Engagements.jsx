import { Section } from "../components/ui.jsx";
import EngagementCard from "../components/EngagementCard.jsx";
import engagements from "../data/engagements.js";

export default function Engagements() {
  return (
    <Section title="Political Engagements" kicker="Diplomacy">
      <div className="grid gap-6">
        {engagements.map((e) => (
          <EngagementCard key={e.id} item={e} />
        ))}
      </div>
    </Section>
  );
}
