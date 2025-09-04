import { Section, Card, Button } from "../components/ui.jsx";
import TimelineList from "../components/TimelineList.jsx";
import timeline from "../data/timeline.js";
import Slideshow from "../components/Slideshow.jsx";
import mediaPics from "../data/aboutmediapics.js";
import YouTubeEmbed from "../components/YoutubeEmbed.jsx";


export default function About() {
  return (
    <Section title="About Yasin Malik" kicker="Biography">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
          <h3 className="text-xl font-semibold">Textual Biography</h3>
          <p className="mt-2 text-white/80">
            Mohammad Yasin Malik (born 1966, Srinagar) moved from teenage student
            activism to leading roles in the JKLF, endured injury and long
            imprisonments, and underwent open-heart surgery in custody. In 1994 he
            renounced armed struggle to pursue non-violent politics, humanitarian
            work, and international outreach amid repeated detentions. Since 2019 he
            has been in Tihar Jail; in 2022 he received a life sentence, and the NIA
            has appealed to seek the death penalty.
          </p>
          <div className="mt-4">
            <Button to="/biography">Read more</Button>
          </div>
        </Card>
        </div>
        

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Quick Facts</h3>
          <ul className="mt-3 space-y-2 text-white/80 text-sm">
            <li>• Advocating non-violent resolution since 1994</li>
            <li>• Meetings with Indian leaders & foreign envoys</li>
            <li>• Ongoing legal case with rights concerns</li>
          </ul>
        </Card>
      </div>
{/* Next Row */}
      <div className="mt-8 grid md:grid-cols-2 gap-8">
  {/* First column: Timeline */}
  <div id="timeline" className="scroll-mt-28">
    <TimelineList items={timeline}/>
  </div>
  {/* Second column: stack cards */}
  <div className="flex flex-col gap-8">
    <Card className="p-6">
      <h4 className="text-lg font-semibold text-white mb-4">Featured Documents</h4>
      <div className="space-y-3 text-white/80 text-sm">
        <a href="#" className="block hover:underline">
          1994 Statement on Non-Violence (PDF)
        </a>
        <a href="#" className="block hover:underline">
          Major Interviews & Profiles (1999–2012)
        </a>
      </div>
    </Card>

    <Card className="p-6">
  <h4 className="text-lg font-semibold text-white mb-4">Media Coverage</h4>
  <Slideshow
    aspect="aspect-[4/3]" // or "aspect-video" / "aspect-[3/2]"
    images={mediaPics}
  />
  <p className="mt-3 text-white/70 text-sm">
    A rotating selection of press photos and program stills.
  </p>
</Card>

   <Card className="!p-0 overflow-hidden">
  <div className="grid grid-rows-[auto_1fr] h-[380px]">
    <h4 className="px-4 pt-4 pb-2 text-lg font-semibold text-white">
      Who is Yasin Malik?
    </h4>
    <YouTubeEmbed
      url="https://youtu.be/VjrhbxqHUBY"
      title="Aik Din Geo Ke Sath"
      cover
      className="!rounded-none !border-0"
    />
  </div>
</Card>




    <Card className="p-6">
      <h4 className="text-lg font-semibold text-white mb-4">Related Links</h4>
      <ul className="list-disc ml-4 text-white/80 text-sm space-y-1">
        <li><a href="#" className="hover:underline">BBC Hard Talk Interview</a></li>
        <li><a href="#" className="hover:underline">Oxford University Lecture</a></li>
      </ul>
    </Card>
  </div>
</div>

    </Section>
  );
}
