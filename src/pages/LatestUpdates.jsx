// src/pages/LatestUpdates.jsx
import { Section } from "../components/ui.jsx";
import UpdateCard from "../components/UpdateCard.jsx";
import updates from "../data/latestUpdates.js";

export default function LatestUpdates() {
  return (
    <Section title="Latest Updates" kicker="Media">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {updates.map((item) => (
          <UpdateCard key={item.id} item={item} />
        ))}
      </div>
    </Section>
  );
}
