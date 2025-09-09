import { Section, Card } from "../components/ui.jsx";
import  InstagramEmbed from "../components/InstagramEmbed.jsx";

export default function SocialMedia() {
  return (
    <Section title="Instagram Highlight" kicker="Social Media">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InstagramEmbed
                url="https://www.instagram.com/p/DN6PJo_DVTx/"
                captioned={false}
                />
                <InstagramEmbed
                url="https://www.instagram.com/reel/DNbBbSGIX3r/"  // replace with another post
                captioned={false}
                />
                <InstagramEmbed
                url="https://www.instagram.com/p/DNPMyH2IMWf/"  // replace with another post
                captioned={false}
                />
        </div>
    </Section>
    );
}
