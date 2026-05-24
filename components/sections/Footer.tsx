import { site } from "@/content/site";
import { Eyebrow, Script, BodyItalic, Hairline, HeartMonogram } from "@/components/atoms";
import { formatLongDate } from "@/lib/format";

export default function Footer() {
  const dateLong = formatLongDate(site.weddingDate);
  return (
    <section className="footer-section">
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${site.images.footer})`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.62) saturate(0.9) sepia(0.15)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(28,24,18,0.4), rgba(28,24,18,0.6))" }} />
      <div style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 28px",
      }}>
        <div style={{ width: "clamp(90px, 20vw, 170px)" }}>
          <HeartMonogram color="var(--gold)" size={170} />
        </div>
        <div style={{ height: 24 }} />
        <Eyebrow color="var(--gold)">With all our love</Eyebrow>
        <div style={{ height: 18 }} />
        <Script size="clamp(3.2rem, 8vw, 4.4rem)" color="var(--cream)">Thank You</Script>
        <div style={{ height: 24 }} />
        <BodyItalic color="var(--gold)" size="1.1rem" style={{ maxWidth: 460, opacity: 0.9 }}>
          For sharing in our joy, for the love you have already given, and for the love still to come — we are forever grateful.
        </BodyItalic>
        <div style={{ height: 36 }} />
        <Hairline color="var(--gold)" width={40} />
        <div style={{ height: 26 }} />
        <Script size="clamp(2.4rem, 6vw, 3.2rem)" color="var(--cream)">{site.groom} &amp; {site.bride}</Script>
        <div style={{ height: 8 }} />
        <Eyebrow color="var(--gold)">{dateLong}</Eyebrow>
      </div>
    </section>
  );
}
