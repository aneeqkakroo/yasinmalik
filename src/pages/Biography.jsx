import { Section } from "../components/ui.jsx";

/**
 * Biography Page: Mohammad Yasin Malik
 *
 * - Self‑contained React component with semantic sections and anchors
 * - Minimal styling so it fits into varied design systems (Tailwind/Bootstrap/plain CSS)
 * - Uses CSS utility classes if available (bg-neutral, text-muted, etc.),
 *   but will gracefully degrade with default browser styles.
 */

export default function Bio() {
  return (
    <Section title="Muhammad Yasin Malik" kicker="Biography">
      {/* Page Header */}
      <header className="mb-10">
        <p className="mt-2 text-base opacity-80">
          Born: <strong>3 April 1966</strong>, Maisuma Bazar (near Budshah Chowk), Srinagar, Jammu & Kashmir.
        </p>
        <div className="mt-4 text-sm opacity-70">
          <span className="inline-block mr-4">Residence: Maisuma, Srinagar</span>
          <span className="inline-block mr-4">Parents: Ghulam Qadir Malik (late)</span>
          <span className="inline-block">Age: 59</span>
        </div>
      </header>

      {/* Quick Navigation */}
      <nav aria-label="Section navigation" className="mb-8 border-l-4 pl-4">
        <ul className="list-disc ml-4 space-y-1">
          <li><a href="#early-life">Early Life & Family</a></li>
          <li><a href="#catalyst-1980">Catalyst Event (1980)</a></li>
          <li><a href="#student-activism">Student Activism & First Arrests (1984–1987)</a></li>
          <li><a href="#hajy-jklf">HAJY Group & JKLF (Late 1980s–1994)</a></li>
          <li><a href="#ceasefire-1994">Ceasefire & Shift to Non‑Violence (1994)</a></li>
          <li><a href="#detentions-post94">Detentions & Attempts on Life (Post‑1994)</a></li>
          <li><a href="#intl-engagements">International Engagements & Lectures</a></li>
          <li><a href="#arrests-1999-2002">Arrests 1999–2002</a></li>
          <li><a href="#campaigns-2003-2008">Signature Campaign & Safr‑e‑Azadi (2003–2008)</a></li>
          <li><a href="#humanitarian">Humanitarian & Social Work</a></li>
          <li><a href="#dialogue-meetings">Dialogue & Meetings with Leaders</a></li>
          <li><a href="#personal-life">Personal Life</a></li>
          <li><a href="#jrl">Joint Resistance Leadership (2015)</a></li>
          <li><a href="#custody-2014-2019">Custody (2014–2019)</a></li>
          <li><a href="#arrest-2019">Arrest, NIA Cases & Conviction (2019–2022)</a></li>
          <li><a href="#appeal">Current Status & Appeals</a></li>
        </ul>
      </nav>

      {/* Content Sections */}
      <section id="early-life" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Early Life & Family</h2>
        <p>
          Born in a modest Kashmiri household in <strong>Maisuma Bazar</strong> near Budshah Chowk, Srinagar, Yasin
          Malik is the only brother to three sisters. He continues to live in the same family house with his mother and
          elder sister; his father <strong>Ghulam Qadir Malik</strong> passed away in <strong>2011</strong>.
        </p>
      </section>

      <section id="catalyst-1980" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Catalyst Event (26 July 1980)</h2>
        <p>
          As a school student, he witnessed a violent incident in <strong>Lal Chowk</strong> where men in plain clothes
          associated with the army damaged vehicles and public property while attempting to free a detained driver. The
          ensuing mayhem reportedly led to the deaths of six civilians. Malik narrowly escaped harm by hiding under the
          reception counter at the nearby KMD bus stand. This event profoundly shaped his political consciousness.
        </p>
      </section>

      <section id="student-activism" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Student Activism & First Arrests (1984–1987)</h2>
        <h3 className="text-xl font-semibold mb-1">Agitation after Maqbool Bhat’s Execution (1984)</h3>
        <p>
          Following the <strong>11 February 1984</strong> execution of <strong>Muhammad Maqbool Bhat</strong> in Tihar Jail,
          Malik and peers protested. He was detained and beaten, an experience that reinforced his resolve.
        </p>
        <h3 className="text-xl font-semibold mb-1">Organising & Literature (1986)</h3>
        <p>
          By <strong>1986</strong>, he was a founding member and <strong>General Secretary</strong> of a student
          organisation advocating debate on Jammu & Kashmir’s political status. He organised marches and distributed
          literature, leading to a <strong>20‑day imprisonment</strong> on charges of handling pro‑freedom material.
        </p>
        <h3 className="text-xl font-semibold mb-1">MUF & Detention under PSA (1987)</h3>
        <p>
          During the <strong>1987</strong> state elections, he supported the <strong>Muslim United Front (MUF)</strong> and was
          arrested, interrogated, and incarcerated for about a year under the <strong>Public Safety Act (PSA)</strong>.
        </p>
      </section>

      <section id="hajy-jklf" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">HAJY Group & JKLF (Late 1980s–1994)</h2>
        <p>
          Post‑release, he joined the <strong>Jammu Kashmir Liberation Front (JKLF)</strong>, later becoming its Chairman.
          Along with <strong>Hameed Sheikh</strong>, <strong>Ashfaq Majeed Wani</strong>, and <strong>Javid Ahmed Mir</strong>,
          he formed the <strong>HAJY</strong> group. Frustrated with political intransigence, the group embraced an armed
          insurgency aimed at internationalising the Kashmir issue. Hameed and Ashfaq were killed; Malik was arrested,
          tortured, and imprisoned until <strong>1994</strong>, undergoing open‑heart surgery during incarceration.
        </p>
      </section>

      <section id="ceasefire-1994" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Ceasefire & Shift to Non‑Violence (1994)</h2>
        <p>
          Influenced by global figures of non‑violence and urged by civil society and diplomatic missions, Malik
          announced a <strong>unilateral ceasefire</strong> in <strong>1994</strong>. Despite minimal governmental response, he
          and JKLF have continued to advocate non‑violent political struggle. Since then, over <strong>600</strong> JKLF
          members have reportedly been killed.
        </p>
      </section>

      <section id="detentions-post94" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Detentions & Attempts on Life (Post‑1994)</h2>
        <p>
          Malik’s post‑1994 years include repeated detentions, solitary confinement (including a two‑year stretch), and
          six assassination attempts—three allegedly by security forces and three by militants opposed to his ceasefire.
        </p>
      </section>

      <section id="intl-engagements" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">International Engagements & Lectures</h2>
        <p>
          During medical trips to the <strong>United States</strong>, he combined treatment with advocacy, meeting officials
          and speaking at policy forums. He has addressed conferences and lectured at universities including
          <em>Harvard</em>, <em>Yale</em>, <em>Oxford</em>, <em>JNU</em>, and <em>St. Stephen’s College</em>, and appeared on
          BBC’s <em>Hard Talk</em> with Tim Sebastian.
        </p>
      </section>

      <section id="arrests-1999-2002" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Arrests 1999–2002</h2>
        <p>
          In <strong>October 1999</strong>, after campaigning for an election boycott, he was detained under the PSA and
          lodged in <strong>Jodhpur Jail</strong>. He was later re‑arrested on <strong>26 March 2002</strong> under
          <strong>POTA</strong>, released after nearly a year of detention and alleged torture.
        </p>
      </section>

      <section id="campaigns-2003-2008" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Signature Campaign & Safr‑e‑Azadi (2003–2008)</h2>
        <p>
          JKLF launched an <strong>18‑month signature campaign</strong> in <strong>June 2003</strong> and a
          <strong>116‑day</strong> "<strong>Safr‑e‑Azadi</strong>" in <strong>2006</strong>, covering thousands of localities.
          About <strong>1.5 million</strong> signatures called for Kashmiri participation in the peace process. These
          peaceful mobilisations contributed to wider non‑violent protest waves in <strong>2008</strong>.
        </p>
      </section>

      <section id="humanitarian" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Humanitarian & Social Work</h2>
        <p>
          Malik and JKLF participated in relief efforts after disasters including the <strong>2005 earthquake</strong> and
          provided aid in Uri, Tangdar, and Kupwara, among other places. He also contributed to blood donation drives
          (e.g., post‑9/11 in New York) and engaged with the World Social Forum on themes of social justice and
          self‑determination.
        </p>
      </section>

      <section id="dialogue-meetings" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Dialogue & Meetings with Leaders</h2>
        <p>
          Throughout the 2000s, he met leaders across India and Pakistan—including prime ministers and senior political
          figures—during phases of dialogue.
        </p>
      </section>

      <section id="personal-life" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Personal Life</h2>
        <p>
          In <strong>January 2009</strong>, he married <strong>Mushaal Mullick</strong>, a Pakistani painter. They have a
          daughter, <strong>Raziya Sultana</strong>. His passport was confiscated in <strong>2013</strong>, restricting family
          reunions and cross‑border travel.
        </p>
      </section>

      <section id="jrl" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Joint Resistance Leadership (2015)</h2>
        <p>
          In <strong>2015</strong>, he helped form the <strong>Joint Resistance Leadership (JRL)</strong> with Syed Ali Shah
          Geelani and Mirwaiz Umar Farooq, coordinating protest strategies.
        </p>
      </section>

      <section id="custody-2014-2019" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Custody (2014–2019)</h2>
        <p>
          During the first Modi government (2014–2019), he was frequently detained and under custody for extended
          periods. Estimates suggest arrests or detentions numbering in the hundreds since 1994.
        </p>
      </section>

      <section id="arrest-2019" className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Arrest, NIA Cases & Conviction (2019–2022)</h2>
        <p>
          Arrested on <strong>22 February 2019</strong> and booked under the PSA on <strong>7 March</strong>, he was moved from
          Kot Bhalwal Jail to NIA custody in New Delhi in May 2019. After an <strong>indefinite hunger strike</strong>, he was
          shifted to <strong>Tihar Jail</strong>. In <strong>May 2022</strong>, he was convicted and sentenced to life
          imprisonment in NIA cases; additional older cases were reportedly re‑opened.
        </p>
      </section>

      <section id="appeal" className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Current Status & Appeals</h2>
        <p>
          He remains in <strong>solitary confinement</strong> at Tihar, with ongoing legal proceedings and appeals. Supporters
          urge international organisations and governments to engage on humanitarian and due‑process grounds.
        </p>
      </section>

      {/* Footer Note */}
      <footer className="pt-6 border-t text-sm opacity-70">
        <p>
          <em>Note:</em> This page summarises a narrative provided by the requester. For a publication or campaign site,
          consider adding references and third‑party citations (news reports, court documents, and human rights
          organisations) to corroborate specific claims and dates.
        </p>
      </footer>
    </Section>
  );
}
