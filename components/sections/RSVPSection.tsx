"use client";
import { site } from "@/content/site";
import RSVPForm from "@/components/RSVPForm";
import { Eyebrow, Script, SerifCaps, BodyText, BodyItalic, Hairline, Fact } from "@/components/atoms";

export default function RSVPSection() {
  return (
    <div id="rsvp">
      {/* Section header */}
      <section className="section section--cream2" style={{ textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <div style={{ height: 18 }} />
          <Script size="clamp(3.4rem, 8vw, 4.8rem)" color="var(--ink)">RSVP</Script>
          <div style={{ height: 18 }} />
          <Hairline color="var(--gold)" width={44} />
          <div style={{ height: 22 }} />
          <Eyebrow color="var(--olive)">Kindly reply by</Eyebrow>
          <div style={{ height: 8 }} />
          <Fact size="1.4rem" style={{ justifyContent: "center", fontVariantNumeric: "lining-nums tabular-nums" }}>21 JUNE 2026</Fact>
        </div>
      </section>

      {/* Form */}
      <section className="section section--cream">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <BodyText>Your reply means the world to us. Please share a few details below so we may prepare a place for you at the table.</BodyText>
          </div>

          <RSVPForm />

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Hairline color="var(--gold)" width={50} />
            <div style={{ height: 22 }} />
            <BodyText style={{ textAlign: "center" }}>
              Should you prefer the gentler way of a phone call,<br />
              please reach {site.contactName} at{" "}
              <a href={`tel:${site.contactPhone.replace(/\s/g, "")}`} style={{ fontWeight: 600, borderBottom: "1px solid var(--olive)", color: "var(--olive)" }}>{site.contactPhone}</a>
            </BodyText>
          </div>
        </div>
      </section>

      {/* Wishes */}
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
              <BodyItalic size="1.05rem">{w.note}</BodyItalic>
              <div style={{ height: 14 }} />
              <SerifCaps size="0.8rem" tracking="0.22em" color="var(--olive)">— {w.name}</SerifCaps>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
