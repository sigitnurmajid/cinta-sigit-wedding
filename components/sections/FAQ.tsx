"use client";
import { useState } from "react";
import { site } from "@/content/site";
import { Eyebrow, Script, BodyItalic } from "@/components/atoms";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ display: "flex", minHeight: 680, background: "var(--cream)" }}>
      <div className="faq-sidebar">
        <div style={{
          transform: "rotate(-90deg)",
          fontFamily: "var(--font-display)",
          fontSize: "3.4rem",
          letterSpacing: "0.4em",
          color: "var(--cream)",
          whiteSpace: "nowrap",
        }}>FAQ</div>
      </div>
      <div className="faq-body">
        <Eyebrow color="var(--olive)">Things you may ask</Eyebrow>
        <div style={{ height: 18 }} />
        <Script size="clamp(2.6rem, 7vw, 3.6rem)" color="var(--ink)">Frequently Asked</Script>
        <div style={{ height: 56 }} />
        {site.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <button
              key={i}
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                display: "block",
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(107,122,74,0.25)",
                padding: "26px 0",
                textAlign: "left",
                cursor: "pointer",
              }}
              aria-expanded={isOpen}
            >
              <div style={{ display: "flex", gap: 28 }}>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--olive)", paddingTop: 4 }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.04em", color: "var(--ink)" }}>{item.q}</div>
                  {isOpen && (<>
                    <div style={{ height: 8 }} />
                    <BodyItalic size="0.95rem">{item.a}</BodyItalic>
                  </>)}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "1.4rem", color: "var(--olive)" }}>{isOpen ? "−" : "+"}</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
