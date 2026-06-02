import { site } from "@/content/site";
import { Eyebrow, Script, BodyText, Hairline } from "@/components/atoms";
import { formatLongDate } from "@/lib/format";

export default function Footer() {
  const dateLong = formatLongDate(site.weddingDate);
  return (
    <section className="footer-section">
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${site.images.footer})`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.52) saturate(0.9) sepia(0.15)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(28,24,18,0.55), rgba(28,24,18,0.72))" }} />
      <div style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 28px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "var(--gold)", lineHeight: 1, margin: "50px 0 40px" }}>
          <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2.6rem, 7vw, 3.6rem)" }}>C</span>
          <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "clamp(1rem, 2.4vw, 1.4rem)" }}>&amp;</span>
          <span style={{ fontFamily: "var(--font-script)", fontSize: "clamp(2.6rem, 7vw, 3.6rem)" }}>S</span>
        </div>
        <Eyebrow color="var(--on-dark-soft)">With all our love</Eyebrow>
        <div style={{ height: 18 }} />
        <Script size="clamp(3.2rem, 8vw, 4.4rem)" color="var(--cream)">Thank You</Script>
        <div style={{ height: 24 }} />
        <BodyText color="var(--on-dark)" style={{ maxWidth: 460, textAlign: "center" }}>
          For sharing in our joy, for the love you have already given, and for the love still to come — we are forever grateful.
        </BodyText>
        <div style={{ height: 36 }} />
        <Hairline color="var(--gold)" width={40} />
        <div style={{ height: 26 }} />
        <Script size="clamp(2.4rem, 6vw, 3.2rem)" color="var(--cream)">{site.bride} &amp; {site.groom}</Script>
        <div style={{ height: 8 }} />
      </div>
    </section>
  );
}
