import { site } from "@/content/site";
import { Eyebrow, Script, SerifCaps, BodyItalic, Hairline } from "@/components/atoms";

const ceremonies = [
  { kicker: "Ceremony", name: "Akad Nikah", time: "08:00 — 10:00 WIB", place: "The Garden Hall" },
  { kicker: "Reception", name: "Resepsi", time: "11:00 — 14:00 WIB", place: "The Lantern Courtyard" },
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

      {/* Map */}
      <section className="section section--cream" style={{ paddingTop: 48, paddingBottom: 72, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Eyebrow color="var(--olive)">Find Us</Eyebrow>
            <div style={{ height: 14 }} />
            <Script size="clamp(2.6rem, 7vw, 3.4rem)" color="var(--ink)">Location</Script>
          </div>
          <div style={{ width: "100%", height: "clamp(320px, 45vw, 500px)", borderRadius: 2, overflow: "hidden", boxShadow: "0 14px 30px rgba(20,15,8,0.14)" }}>
            <iframe
              src="https://maps.google.com/maps?q=Gedung+Heroes+Bandung+Barat&output=embed&z=15"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue location — Gedung Heroes, Bandung Barat"
            />
          </div>
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <a
              href={site.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", letterSpacing: "0.25em", color: "var(--olive)", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid var(--gold)", paddingBottom: 2 }}
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
