import { Eyebrow, Script, BodyItalic } from "@/components/atoms";

export default function PageHeader({ image, eyebrow, title, subtitle }: {
  image: string; eyebrow: string; title: string; subtitle?: string;
}) {
  return (
    <header className="page-header">
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.65) saturate(0.85)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,18,12,0.5), rgba(20,18,12,0.3) 50%, rgba(20,18,12,0.6))" }} />
      <div style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", color: "var(--cream)", padding: "clamp(48px, 8vw, 80px) 28px 0",
      }}>
        <Eyebrow color="var(--gold)">{eyebrow}</Eyebrow>
        <div style={{ height: 18 }} />
        <Script size="clamp(3.6rem, 8vw, 5.4rem)" color="var(--cream)">{title}</Script>
        {subtitle && (<>
          <div style={{ height: 12 }} />
          <BodyItalic size="1.05rem" color="var(--gold)" style={{ opacity: 0.9 }}>{subtitle}</BodyItalic>
        </>)}
      </div>
    </header>
  );
}
