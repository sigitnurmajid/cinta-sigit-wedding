"use client";
import { site } from "@/content/site";
import RSVPForm from "@/components/RSVPForm";
import Wishes from "@/components/sections/Wishes";
import { Eyebrow, Script, BodyText, Hairline, Fact } from "@/components/atoms";

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

      {/* Wishes — live, moderated, paginated */}
      <Wishes />
    </div>
  );
}
