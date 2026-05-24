import { site } from "@/content/site";
import { Eyebrow, Script, SerifCaps, BodyItalic, Hairline } from "@/components/atoms";

const ceremonies = [
  { kicker: "Ceremony", name: "Akad Nikah", time: "09:00 — 11:00 WIB", place: "The Garden Hall" },
  { kicker: "Reception", name: "Resepsi", time: "18:00 — 22:00 WIB", place: "The Lantern Courtyard" },
];

const travel = [
  { n: "01", t: "By Car", d: "Approximately 90 minutes from central Bandung via Tol Pasteur. Onsite parking is plentiful and complimentary." },
  { n: "02", t: "By Shuttle", d: "Courtesy shuttles depart from Hotel Aryaduta at 13:00 and 16:00 — please indicate on your RSVP." },
  { n: "03", t: "Lodging", d: "A small block of rooms has been held at Padma Hotel and Sanggabuana Resort. Mention 'Sigit & Cinta'." },
];

export default function Venue() {
  return (
    <div id="venue">
      {/* Section header */}
      <section className="section section--dark" style={{ textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <Eyebrow color="var(--gold)">The Place</Eyebrow>
          <div style={{ height: 18 }} />
          <Script size="clamp(3.4rem, 8vw, 4.8rem)" color="var(--cream)">Our Venue</Script>
          <div style={{ height: 18 }} />
          <Hairline color="var(--gold)" width={44} />
          <div style={{ height: 22 }} />
          <SerifCaps size="0.85rem" tracking="0.35em" color="var(--gold)">{site.venue.name} · {site.venue.city}</SerifCaps>
        </div>
      </section>

      {/* Intro */}
      <section className="section section--cream" style={{ textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <Eyebrow color="var(--olive)">A countryside sanctuary</Eyebrow>
          <div style={{ height: 18 }} />
          <SerifCaps size="1.9rem" tracking="0.18em" color="var(--ink)">{site.venue.name}</SerifCaps>
          <div style={{ height: 18 }} />
          <Hairline color="var(--gold)" width={44} />
          <div style={{ height: 26 }} />
          <BodyItalic size="1.1rem">A restored colonial estate set among rolling tea fields, where lanterns line the verandahs and the evening air carries the scent of jasmine and pine. We have chosen this place for the stillness it gives — and the company it invites.</BodyItalic>
        </div>
      </section>

      {/* Ceremonies */}
      <section className="venue-ceremonies">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, maxWidth: 980, margin: "0 auto" }}>
          {ceremonies.map(c => (
            <div key={c.kicker} style={{ border: "1px solid rgba(107,122,74,0.3)", padding: "44px 36px", textAlign: "center", background: "var(--off)" }}>
              <Eyebrow color="var(--olive)">{c.kicker}</Eyebrow>
              <div style={{ height: 14 }} />
              <Script size="3rem" color="var(--ink)">{c.name}</Script>
              <div style={{ height: 16 }} />
              <Hairline color="var(--gold)" width={28} />
              <div style={{ height: 18 }} />
              <SerifCaps size="0.78rem" tracking="0.32em" color="var(--ink-soft)">{c.time}</SerifCaps>
              <div style={{ height: 8 }} />
              <BodyItalic size="0.95rem">{c.place}</BodyItalic>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="section section--cream2">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Eyebrow color="var(--olive)">A glimpse</Eyebrow>
          <div style={{ height: 14 }} />
          <Script size="clamp(2.6rem, 7vw, 3.4rem)" color="var(--ink)">Around the Estate</Script>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, maxWidth: 980, margin: "0 auto" }}>
          {site.images.venueGallery.map((src, i) => (
            <div key={i} style={{ aspectRatio: "4/5", backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", filter: "saturate(0.85) sepia(0.05)", boxShadow: "0 14px 30px rgba(20,15,8,0.18)" }} />
          ))}
        </div>
      </section>

      {/* Getting there */}
      <section className="section section--cream">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <Eyebrow color="var(--olive)">Practical notes</Eyebrow>
            <div style={{ height: 14 }} />
            <Script size="clamp(2.6rem, 7vw, 3.4rem)" color="var(--ink)">Getting There</Script>
          </div>
          {travel.map(item => (
            <div key={item.n} style={{ display: "flex", gap: 28, padding: "22px 0", borderBottom: "1px solid rgba(107,122,74,0.2)" }}>
              <div style={{ fontFamily: "var(--font-ui)", fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--olive)", paddingTop: 4, flexShrink: 0 }}>{item.n}</div>
              <div>
                <SerifCaps size="1.05rem" tracking="0.18em" color="var(--ink)">{item.t}</SerifCaps>
                <div style={{ height: 6 }} />
                <BodyItalic size="0.98rem">{item.d}</BodyItalic>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
