import { CSSProperties, ReactNode } from "react";

export function Eyebrow({ children, color = "var(--ink)" }: { children: ReactNode; color?: string }) {
  return (
    <div style={{
      fontFamily: "var(--font-ui)",
      fontWeight: 300,
      fontSize: "0.72rem",
      letterSpacing: "0.42em",
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

export function BodyItalic({ children, size = "1rem", color = "var(--ink-soft)", style = {} }: { children: ReactNode; size?: string; color?: string; style?: CSSProperties }) {
  return (
    <p style={{
      fontFamily: "var(--font-body)",
      fontStyle: "italic",
      fontSize: size,
      color,
      lineHeight: 1.65,
      margin: 0,
      textWrap: "pretty" as any,
      ...style,
    }}>{children}</p>
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
    <svg viewBox="0 0 200 180" width={size} aria-hidden>
      <path
        d="M100 160 C 100 160, 20 110, 20 60 C 20 30, 45 15, 65 25 C 80 32, 95 48, 100 60 C 105 48, 120 32, 135 25 C 155 15, 180 30, 180 60 C 180 110, 100 160, 100 160 Z"
        fill="none" stroke={color} strokeWidth="1" opacity="0.85"
      />
      <text x="100" y="100" textAnchor="middle" style={{ fontFamily: "var(--font-script)", fontSize: 60, fill: color }}>
        S<tspan dx="2" dy="0" style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 26 }}> &amp; </tspan>C
      </text>
    </svg>
  );
}
