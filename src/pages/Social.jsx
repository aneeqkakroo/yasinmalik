import { Section } from "../components/ui.jsx";
import EngagementCard from "../components/EngagementCard.jsx";
import engagements from "../data/social.js";

export default function Social() {
  return (
    <Section title="Social Engagements" kicker="Engagements">
      <div className="grid gap-6">
        {engagements.map((e) => (
          <EngagementCard key={e.id} item={e} />
        ))}
      </div>
    </Section>
  );
}
