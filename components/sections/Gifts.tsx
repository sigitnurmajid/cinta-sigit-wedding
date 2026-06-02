"use client";
import { useState } from "react";
import { site } from "@/content/site";
import { Eyebrow, Script, SerifCaps, BodyText, Hairline, Botanical, Fact } from "@/components/atoms";

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
        <BodyText color="var(--on-dark)">
          Your love and presence are blessing enough. For those who wish to give beyond their hearts, we humbly leave the following details — with deepest thanks.
        </BodyText>
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
                <div style={{ fontFamily: "var(--font-ui)", fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.22em", color: "var(--on-dark-soft)", textTransform: "uppercase" }}>{a.bank}</div>
                <div style={{ height: 8 }} />
                <Fact size="1.4rem" color="var(--on-dark)" style={{ letterSpacing: "0.04em" }}>{a.number}</Fact>
                <div style={{ height: 4 }} />
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.95rem", color: "var(--on-dark-soft)" }}>{a.name}</div>
              </div>
              <button onClick={() => copy(a.number)} style={{
                background: "transparent",
                border: "1px solid var(--gold)",
                color: "var(--on-dark)",
                padding: "12px 16px",
                minHeight: 44,
                fontFamily: "var(--font-ui)",
                fontSize: "0.72rem",
                letterSpacing: "0.22em",
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
        <Eyebrow color="var(--on-dark-soft)">Or send a gift to our home</Eyebrow>
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
            <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1.1rem", color: "var(--on-dark)" }}>
              {site.giftAddress.name}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1rem", lineHeight: 1.5, color: "var(--on-dark-soft)", marginTop: 6 }}>
              {site.giftAddress.street}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1rem", lineHeight: 1.5, color: "var(--on-dark-soft)" }}>
              {site.giftAddress.city}, {site.giftAddress.province} {site.giftAddress.postalCode}
            </div>
          </div>
          <button
            onClick={() => copy(`${site.giftAddress.name}, ${site.giftAddress.street}, ${site.giftAddress.city}, ${site.giftAddress.province} ${site.giftAddress.postalCode}`)}
            style={{
              background: "transparent",
              border: "1px solid var(--gold)",
              color: "var(--on-dark)",
              padding: "12px 16px",
              minHeight: 44,
              fontFamily: "var(--font-ui)",
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
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
