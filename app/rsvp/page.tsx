import PageHeader from "@/components/PageHeader";
import { site } from "@/content/site";
import RSVPForm from "@/components/RSVPForm";
import { Eyebrow, Script, BodyItalic, Hairline, SerifCaps } from "@/components/atoms";

export const metadata = { title: "RSVP — Sigit & Cinta" };

export default function RSVPPage() {
  return (
    <main>
      <PageHeader image={site.images.rsvp} eyebrow="Kindly respond" title="RSVP" subtitle={`By the 21st of May, 2026`} />

      <section className="section section--cream">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <BodyItalic size="1.15rem">Your reply means the world to us. Please share a few details below so we may prepare a place for you at the table.</BodyItalic>
          </div>

          <RSVPForm />

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Hairline color="var(--gold)" width={50} />
            <div style={{ height: 22 }} />
            <BodyItalic size="1.05rem">
              Should you prefer the gentler way of a phone call,<br />
              please reach {site.contactName} at <span style={{ fontStyle: "normal", borderBottom: "1px solid var(--olive)", color: "var(--olive)" }}>{site.contactPhone}</span>
            </BodyItalic>
          </div>
        </div>
      </section>

      <section className="section section--cream2">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Eyebrow color="var(--olive)">From those before you</Eyebrow>
          <div style={{ height: 14 }} />
          <Script size="clamp(2.6rem, 7vw, 3.4rem)" color="var(--ink)">Wishes &amp; Prayers</Script>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, maxWidth: 880, margin: "0 auto" }}>
          {site.wishes.map((w, i) => (
            <div key={i} style={{ padding: "28px", background: "var(--off)", border: "1px solid rgba(107,122,74,0.2)" }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "1.6rem", color: "var(--gold)", lineHeight: 0.5, marginBottom: 4 }}>&ldquo;</div>
              <BodyItalic size="1rem">{w.note}</BodyItalic>
              <div style={{ height: 14 }} />
              <SerifCaps size="0.65rem" tracking="0.3em" color="var(--olive)">— {w.name}</SerifCaps>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
