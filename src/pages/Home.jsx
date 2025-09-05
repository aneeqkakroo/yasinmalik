import Hero from "../components/Hero.jsx";
import { Section, Card, Button} from "../components/ui.jsx";
import TimelineList from "../components/TimelineList.jsx";
import timeline from "../data/timeline.js";
import NumbersBanner from "../components/NumbersBanner.jsx";
import { daysSince } from "../data/daysSince.js";

export default function Home() {
  return (
    <>
      <Hero />

      <Section title="At a Glance">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bio preview */}
          <Card className="p-6">
          <h3 className="text-xl font-semibold">Textual Biography</h3>
          <p className="mt-2 text-white/80">
            Mohammad Yasin Malik (born 1966, Srinagar) grew from a teenage student activist into a leading 
            figure of the JKLF, shaped by early protests, repeated arrests, and years of incarceration that 
            included injury and an open-heart surgery while in custody. Emerging from that period, he 
            publicly renounced armed struggle in 1994 and committed himself to non-violent political action,
             community organising, and humanitarian relief, while engaging widely with civil society, 
             universities, and policy forums to advocate a peaceful, rights-based resolution for Jammu & 
             Kashmir. Despite this shift, he faced ongoing detentions, solitary confinement, and multiple 
             legal cases that repeatedly disrupted his political and social work. Since 2019 he has been 
             held in Tihar Jail; in 2022 he received a life sentence in an NIA case, and the agency has 
             appealed to seek conversion of that sentence to the death penalty. His supporters emphasise 
             due process, medical needs, and international humanitarian concern.
          </p>
          <div className="mt-4">
            <Button to="/biography#bio">Read more</Button>
          </div>
        </Card>
           <TimelineList items={timeline.slice(0, 4)}  />

          {/* Timeline preview */}
        </div>
      </Section>

      <NumbersBanner
        bg="https://media.gettyimages.com/id/3018449/photo/indian-policemen-arrest-yasin-malik-the-chairman-of-jammu-and-kashmir-libration-front-and-some.jpg?s=612x612&w=0&k=20&c=KY6-tAxtR8wp26ugbOwdzcNFXT9RCoUq9I4lGyS6i7k=" // or any URL
        title=""
        targets={{
        petitions: 12500,                // Petition signs
        daysInJail: daysSince("2019-02-22"), // Auto-updating days in jail
        fabricatedCases: 5,              // Fabricated cases
      }}
      />
    </>
  );
}
