"use client";
import { useState } from "react";
import { site } from "@/content/site";
import { Eyebrow, Script, SerifCaps, BodyItalic, Hairline, Botanical } from "@/components/atoms";

export default function Gifts() {
  const [copied, setCopied] = useState<string | null>(null);
  async function copy(num: string) {
    try {
      await navigator.clipboard.writeText(num.replace(/\s/g, ""));
      setCopied(num);
      setTimeout(() => setCopied(null), 1800);
    } catch {}
  }
  return (
    <section className="section section--dark" style={{ position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", left: 40, top: 80, opacity: 0.35 }} aria-hidden>
        <Botanical color="var(--gold)" width={100} />
      </div>
      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
        <Eyebrow color="var(--gold)">With gratitude</Eyebrow>
        <div style={{ height: 22 }} />
        <Script size="clamp(2.4rem, 6vw, 3.2rem)" color="var(--cream)">A Note on</Script>
        <div style={{ height: 6 }} />
        <SerifCaps size="clamp(2rem, 5vw, 2.8rem)" tracking="0.32em" color="var(--cream)">GIFTS</SerifCaps>
        <div style={{ height: 24 }} />
        <Hairline color="var(--gold)" width={50} />
        <div style={{ height: 28 }} />
        <BodyItalic color="var(--gold)" size="1.1rem" style={{ opacity: 0.9 }}>
          Your love and presence are blessing enough. For those who wish to give beyond their hearts, we humbly leave the following details — with deepest thanks.
        </BodyItalic>
        <div style={{ height: 50 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480, margin: "0 auto" }}>
          {site.bankAccounts.map((a, i) => (
            <div key={i} style={{
              border: "1px solid rgba(197,185,154,0.35)",
              padding: "20px 26px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              textAlign: "left",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", letterSpacing: "0.3em", color: "var(--gold)" }}>{a.bank}</div>
                <div style={{ height: 6 }} />
                <div style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", color: "var(--cream)", fontVariantNumeric: "tabular-nums" }}>{a.number}</div>
                <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.85rem", color: "var(--gold)", opacity: 0.8 }}>{a.name}</div>
              </div>
              <button onClick={() => copy(a.number)} style={{
                background: "transparent",
                border: "1px solid var(--gold)",
                color: "var(--gold)",
                padding: "10px 14px",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}>{copied === a.number ? "COPIED" : "COPY"}</button>
            </div>
          ))}
        </div>

        {/* Delivery address */}
        <div style={{ height: 36 }} />
        <Hairline color="var(--gold)" width={28} />
        <div style={{ height: 20 }} />
        <BodyItalic color="var(--gold)" size="0.88rem" style={{ opacity: 0.7 }}>
          Or send a gift to our home
        </BodyItalic>
        <div style={{ height: 16 }} />
        <div style={{
          border: "1px solid rgba(197,185,154,0.35)",
          padding: "20px 26px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          textAlign: "left",
          maxWidth: 480,
          margin: "0 auto",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--cream)" }}>
              {site.giftAddress.name}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.88rem", color: "var(--gold)", opacity: 0.85, marginTop: 4 }}>
              {site.giftAddress.street}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.88rem", color: "var(--gold)", opacity: 0.85 }}>
              {site.giftAddress.city}, {site.giftAddress.province} {site.giftAddress.postalCode}
            </div>
          </div>
          <button
            onClick={() => copy(`${site.giftAddress.name}, ${site.giftAddress.street}, ${site.giftAddress.city}, ${site.giftAddress.province} ${site.giftAddress.postalCode}`)}
            style={{
              background: "transparent",
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              padding: "10px 14px",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {copied === `${site.giftAddress.name}, ${site.giftAddress.street}, ${site.giftAddress.city}, ${site.giftAddress.province} ${site.giftAddress.postalCode}` ? "COPIED" : "COPY"}
          </button>
        </div>

      </div>
    </section>
  );
}
