import { site } from "@/content/site";
import { Eyebrow, Script, SerifCaps, Hairline, Fact } from "@/components/atoms";

const ceremonies = [
  { kicker: "Ceremony", name: "Akad Nikah", time: "08:00 — 10:00 WIB"},
  { kicker: "Reception", name: "Resepsi", time: "11:00 — 14:00 WIB"},
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
          <div style={{ height: 24 }} />
          <Fact color="var(--on-dark)" style={{ textAlign: "center"}} >{site.venue.name}</Fact>
          <div style={{ height: 8 }} />
          <SerifCaps size="0.85rem" tracking="0.3em" color="var(--on-dark-soft)" style={{ fontWeight: 700 }}>{site.venue.city}</SerifCaps>
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
              <Fact size="1.25rem" style={{ textAlign: "center" }}>{c.time}</Fact>
              <div style={{ height: 8 }} />
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
              src="https://maps.google.com/maps?q=GEDUNG%20HEROE.S&t=m&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Venue location — ${site.venue.name}, ${site.venue.city}`}
            />
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <a
              href={site.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                minHeight: 48,
                padding: "0 28px",
                background: "var(--olive)",
                color: "var(--off)",
                fontFamily: "var(--font-ui)",
                fontWeight: 500,
                fontSize: "var(--fs-button)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
