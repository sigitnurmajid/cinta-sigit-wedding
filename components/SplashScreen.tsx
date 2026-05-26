"use client";
import { useState, useEffect } from "react";
import { site } from "@/content/site";
import { formatLongDate } from "@/lib/format";
import { Eyebrow, Script, SerifCaps, BodyItalic, Hairline, HeartMonogram } from "@/components/atoms";

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [recipient, setRecipient] = useState<string | null>(null);
  const dateLong = formatLongDate(site.weddingDate);

  // Read recipient name from ?to= URL param
  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get("to");
    if (name) setRecipient(decodeURIComponent(name));
  }, []);

  // Lock scroll + hide nav while splash is on screen
  useEffect(() => {
    document.body.classList.add("splash-open");
    return () => document.body.classList.remove("splash-open");
  }, []);

  function handleEnter() {
    document.body.classList.remove("splash-open"); // restore nav + scroll immediately
    setFading(true);  // trigger opacity → 0 transition
    onEnter();        // notify parent (starts video)
    setTimeout(() => setVisible(false), 950); // remove from DOM after fade
  }

  if (!visible) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label="Wedding invitation entry"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "var(--ink)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 28px",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.9s ease",
        color: "var(--cream)",
      }}
    >
      <HeartMonogram color="var(--gold)" size={72} />
      <div style={{ height: 32 }} />
      <Eyebrow color="var(--gold)">The Wedding of</Eyebrow>
      <div style={{ height: 22 }} />
      <Script size="clamp(3.2rem, 9vw, 5.4rem)" color="var(--cream)">
        {site.bride} &amp; {site.groom}
      </Script>
      <div style={{ height: 18 }} />
      <Hairline color="var(--gold)" width={44} />
      <div style={{ height: 22 }} />
      <SerifCaps size="0.8rem" tracking="0.35em" color="var(--gold)">
        21 June 2026 · Bandung Barat
      </SerifCaps>
      <div style={{ height: recipient ? 32 : 56 }} />
      {recipient && (
        <>
          <BodyItalic size="0.92rem" color="var(--gold)" style={{ opacity: 0.75 }}>
            Kepada Yth.
          </BodyItalic>
          <div style={{ height: 6 }} />
          <SerifCaps size="1rem" tracking="0.22em" color="var(--cream)">
            {recipient}
          </SerifCaps>
          <div style={{ height: 28 }} />
        </>
      )}
      <button
        onClick={handleEnter}
        style={{
          background: "transparent",
          border: "1px solid var(--gold)",
          color: "var(--cream)",
          padding: "16px 48px",
          fontFamily: "var(--font-ui)",
          fontWeight: 300,
          fontSize: "0.68rem",
          letterSpacing: "0.4em",
          cursor: "pointer",
        }}
      >
        OPEN INVITATION
      </button>
      <div style={{ height: 32 }} />
      <BodyItalic size="0.9rem" color="var(--gold)" style={{ opacity: 0.55 }}>
        {dateLong}
      </BodyItalic>
    </div>
  );
}
