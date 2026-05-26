"use client";
import { useCountdown } from "@/hooks/useCountdown";
import { site } from "@/content/site";
import { Eyebrow, Script, BodyItalic } from "@/components/atoms";

function Cell({ n, label }: { n: number; label: string }) {
  return (
    <div style={{ textAlign: "center", flex: 1 }}>
      <div
        suppressHydrationWarning
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.5rem, 5.5vw, 3.6rem)",
          color: "var(--cream)",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >{String(n).padStart(2, "0")}</div>
      <div style={{ marginTop: 12 }}><Eyebrow color="var(--gold)">{label}</Eyebrow></div>
    </div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(site.weddingDate);
  return (
    <section className="section section--dark" style={{ textAlign: "center" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Eyebrow color="var(--gold)">Counting Down</Eyebrow>
        <div style={{ height: 22 }} />
        <Script size="clamp(3.4rem, 8vw, 4.6rem)" color="var(--cream)">{done ? "The Day Has Come" : "Until Forever"}</Script>
        <div style={{ height: 14 }} />
        <BodyItalic color="var(--gold)" style={{ opacity: 0.85 }}>The hours that remain before our two paths become one.</BodyItalic>
        <div style={{ height: 50 }} />
        <div style={{
          display: "flex",
          gap: "clamp(4px, 1.5vw, 14px)",
          justifyContent: "center",
          padding: "clamp(16px, 3vw, 36px) clamp(6px, 1.5vw, 28px)",
          border: "1px solid rgba(197,185,154,0.35)",
        }}>
          <Cell n={days}    label="Days"  />
          <div style={{ width: 1, background: "rgba(197,185,154,0.2)" }} />
          <Cell n={hours}   label="Hours" />
          <div style={{ width: 1, background: "rgba(197,185,154,0.2)" }} />
          <Cell n={minutes} label="Mins"  />
          <div style={{ width: 1, background: "rgba(197,185,154,0.2)" }} />
          <Cell n={seconds} label="Secs"  />
        </div>
      </div>
    </section>
  );
}
