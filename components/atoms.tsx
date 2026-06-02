import { CSSProperties, ReactNode } from "react";

export function Eyebrow({ children, color = "var(--ink)" }: { children: ReactNode; color?: string }) {
  return (
    <div style={{
      fontFamily: "var(--font-ui)",
      fontWeight: 400,
      fontSize: "var(--fs-label)",
      letterSpacing: "0.26em",
      textTransform: "uppercase",
      color,
    }}>{children}</div>
  );
}

export function Script({ children, size = "3rem", color = "currentColor", style = {} }: { children: ReactNode; size?: string; color?: string; style?: CSSProperties }) {
  return (
    <span style={{
      fontFamily: "var(--font-script)",
      fontSize: size,
      color,
      lineHeight: 1.05,
      display: "inline-block",
      ...style,
    }}>{children}</span>
  );
}

export function SerifCaps({ children, size = "1.6rem", tracking = "0.08em", color = "currentColor", style = {} }: { children: ReactNode; size?: string; tracking?: string; color?: string; style?: CSSProperties }) {
  return (
    <span style={{
      fontFamily: "var(--font-display)",
      fontSize: size,
      letterSpacing: tracking,
      textTransform: "uppercase",
      color,
      lineHeight: 1.2,
      display: "inline-block",
      ...style,
    }}>{children}</span>
  );
}

/**
 * Primary reading text: upright Cormorant 500 at the readable body size.
 * Use this for all prose, instructions, and any text longer than a few words.
 */
export function BodyText({ children, size = "var(--fs-body)", color = "var(--ink-soft)", style = {} }: { children: ReactNode; size?: string; color?: string; style?: CSSProperties }) {
  return (
    <p style={{
      fontFamily: "var(--font-body)",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: size,
      color,
      lineHeight: "var(--lh-body)",
      maxWidth: "var(--measure)",
      margin: "0 auto",
      textWrap: "pretty" as any,
      ...style,
    }}>{children}</p>
  );
}

/**
 * Emotional accent prose only — reserved for short quotes / single lines.
 * Now weight 500 (was 300/400) so the italic stays legible.
 */
export function BodyItalic({ children, size = "var(--fs-secondary)", color = "var(--ink-soft)", style = {} }: { children: ReactNode; size?: string; color?: string; style?: CSSProperties }) {
  return (
    <p style={{
      fontFamily: "var(--font-body)",
      fontStyle: "italic",
      fontWeight: 500,
      fontSize: size,
      color,
      lineHeight: 1.65,
      margin: 0,
      textWrap: "pretty" as any,
      ...style,
    }}>{children}</p>
  );
}

/**
 * Critical fact value (date, time, venue, account number) — upright Cormorant 600,
 * high contrast, tabular numerals. The most scannable text on the page.
 */
export function Fact({ children, size = "var(--fs-fact)", color = "var(--ink)", style = {} }: { children: ReactNode; size?: string; color?: string; style?: CSSProperties }) {
  return (
    <div style={{
      fontFamily: "var(--font-body)",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: size,
      lineHeight: "var(--lh-heading)",
      color,
      fontVariantNumeric: "tabular-nums",
      ...style,
    }}>{children}</div>
  );
}

export function Hairline({ color = "currentColor", width = 50 }: { color?: string; width?: number }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color, opacity: 0.6 }} aria-hidden>
      <span style={{ display: "block", width, height: 1, background: "currentColor" }} />
      <span style={{ width: 4, height: 4, background: "currentColor", transform: "rotate(45deg)", display: "block" }} />
      <span style={{ display: "block", width, height: 1, background: "currentColor" }} />
    </div>
  );
}

export function Botanical({ color = "currentColor", width = 80, opacity = 0.45 }: { color?: string; width?: number; opacity?: number }) {
  return (
    <svg viewBox="0 0 100 200" width={width} style={{ opacity }} aria-hidden>
      <g fill="none" stroke={color} strokeWidth="0.7" strokeLinecap="round">
        <path d="M50 10 Q50 100 50 190" />
        {[30, 60, 90, 120, 150].map((y, i) => (
          <g key={i}>
            <path d={`M50 ${y} Q35 ${y - 8} 22 ${y - 4} Q35 ${y + 2} 50 ${y}`} fill={color} fillOpacity="0.35" />
            <path d={`M50 ${y + 8} Q65 ${y} 78 ${y + 4} Q65 ${y + 10} 50 ${y + 8}`} fill={color} fillOpacity="0.35" />
          </g>
        ))}
        <circle cx="50" cy="10" r="3" fill={color} fillOpacity="0.5" />
      </g>
    </svg>
  );
}

export function HeartMonogram({ color = "currentColor", size = 120 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 200 180" width={size} style={{ display: "block", margin: "0 auto", maxWidth: "100%", height: "auto" }} aria-hidden>
      <path
        d="M100 160 C 100 160, 20 110, 20 60 C 20 30, 45 15, 65 25 C 80 32, 95 48, 100 60 C 105 48, 120 32, 135 25 C 155 15, 180 30, 180 60 C 180 110, 100 160, 100 160 Z"
        fill="none" stroke={color} strokeWidth="1" opacity="0.85"
      />
      <text x="100" y="88" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: "var(--font-script)", fontSize: 60, fill: color }}>
        C<tspan style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 26 }}> &amp; </tspan>S
      </text>
    </svg>
  );
}
