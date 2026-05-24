import Link from "next/link";
import { Eyebrow, Script, BodyItalic } from "@/components/atoms";

export default function RSVPPreview() {
  return (
    <section className="section section--cream2" style={{ textAlign: "center" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Eyebrow color="var(--olive)">Awaiting your reply</Eyebrow>
        <div style={{ height: 22 }} />
        <Script size="clamp(3.4rem, 8vw, 4.6rem)" color="var(--ink)">Kindly Respond</Script>
        <div style={{ height: 22 }} />
        <BodyItalic size="1.05rem">Your presence is the truest gift we could ask for. Please let us know if you can join us beneath the candlelight on our cherished day.</BodyItalic>
        <div style={{ height: 32 }} />
        <Link href="/rsvp" style={{
          display: "inline-block",
          border: "1px solid var(--ink)",
          color: "var(--ink)",
          padding: "14px 36px",
          fontFamily: "var(--font-ui)",
          fontWeight: 300,
          fontSize: "0.65rem",
          letterSpacing: "0.4em",
        }}>RSVP NOW →</Link>
      </div>
    </section>
  );
}
