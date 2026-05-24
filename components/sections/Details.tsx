import { site } from "@/content/site";
import { Eyebrow, Script, SerifCaps, BodyItalic, Hairline } from "@/components/atoms";

const swatches = [
  { hex: "#EDE8DF", name: "Cream" },
  { hex: "#D4B896", name: "Sand" },
  { hex: "#A8A878", name: "Sage" },
  { hex: "#C99284", name: "Rose" },
  { hex: "#B8956A", name: "Oat" },
  { hex: "#A0613D", name: "Terracotta" },
];

const cards = [
  { kicker: "Health & safety", title: "With Care", body: "Hand-care stations are placed throughout the venue. Please stay home if you are unwell — we will dearly miss you and find a way to share the day." },
  { kicker: "Children", title: "Little Ones", body: "Children are warmly welcomed. A quiet corner with toys, books, and a nanny on hand will be set aside near the courtyard." },
  { kicker: "Photography", title: "Be Present", body: "We've asked our dear photographers to capture the day. We kindly invite you to leave the lens behind during the ceremony." },
];

export default function Details() {
  return (
    <div id="details">
      {/* Section header */}
      <section className="section section--cream2" style={{ textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Eyebrow color="var(--olive)">The Day</Eyebrow>
          <div style={{ height: 16 }} />
          <Script size="clamp(3.4rem, 8vw, 4.8rem)" color="var(--ink)">Wedding Details</Script>
          <div style={{ height: 18 }} />
          <Hairline color="var(--gold)" width={50} />
          <div style={{ height: 24 }} />
          <BodyItalic size="1.1rem">One long, slow day — built for stillness, for laughter, and for the small joys of being together. Below is the rhythm of our celebration.</BodyItalic>
        </div>
      </section>

      {/* Date */}
      <section className="section section--cream" style={{ textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Eyebrow color="var(--olive)">Saturday</Eyebrow>
          <div style={{ height: 16 }} />
          <Script size="clamp(3.6rem, 9vw, 5rem)" color="var(--ink)">21 June 2026</Script>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
          <div className="timeline-line" aria-hidden />
          {site.schedule.map(item => (
            <div key={item.time} className="timeline-row">
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-dot" aria-hidden />
              <div style={{ flex: 1 }}>
                <SerifCaps size="1.05rem" tracking="0.2em" color="var(--ink)">{item.title}</SerifCaps>
                <div style={{ height: 6 }} />
                <BodyItalic size="0.95rem">{item.desc}</BodyItalic>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dress code */}
      <section className="section section--dark" style={{ textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Eyebrow color="var(--gold)">A note on attire</Eyebrow>
          <div style={{ height: 18 }} />
          <Script size="clamp(3rem, 8vw, 4rem)" color="var(--cream)">Dress Code</Script>
          <div style={{ height: 22 }} />
          <Hairline color="var(--gold)" width={50} />
          <div style={{ height: 28 }} />
          <BodyItalic color="var(--gold)" size="1.1rem" style={{ opacity: 0.9 }}>Formal countryside elegance. Earth tones, soft pastels, and warm neutrals — cream, sand, sage, dusty rose, oat, terracotta.</BodyItalic>
          <div style={{ height: 36 }} />
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            {swatches.map(s => (
              <div key={s.name} style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 80, background: s.hex, border: "1px solid rgba(197,185,154,0.4)" }} />
                <div style={{ height: 8 }} />
                <div style={{ fontFamily: "var(--font-display)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)" }}>{s.name.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 32 }} />
          <BodyItalic color="var(--gold)" size="0.92rem" style={{ opacity: 0.7 }}>Please refrain from pure white and stark black. Heels not recommended on the lawn — flats welcomed.</BodyItalic>
        </div>
      </section>

      {/* Notes cards */}
      <section className="section section--cream">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, maxWidth: 980, margin: "0 auto" }}>
          {cards.map(c => (
            <div key={c.title} style={{ padding: "32px 28px", background: "var(--off)", border: "1px solid rgba(107,122,74,0.2)", textAlign: "center" }}>
              <Eyebrow color="var(--olive)">{c.kicker}</Eyebrow>
              <div style={{ height: 14 }} />
              <Script size="2.6rem" color="var(--ink)">{c.title}</Script>
              <div style={{ height: 14 }} />
              <Hairline color="var(--gold)" width={26} />
              <div style={{ height: 14 }} />
              <BodyItalic size="0.92rem">{c.body}</BodyItalic>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
