import { Eyebrow, Script, BodyText, Hairline, Botanical } from "@/components/atoms";

export default function Welcome() {
  return (
    <section className="section section--cream" style={{ position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div className="botanical-left">
        <Botanical color="var(--olive)" width={100} />
      </div>
      <div className="botanical-right">
        <Botanical color="var(--olive)" width={100} />
      </div>
      <div style={{ maxWidth: 620, margin: "0 auto", position: "relative" }}>
        <Eyebrow color="var(--olive)">A warm welcome</Eyebrow>
        <div style={{ height: 28 }} />
        <Script size="clamp(3.2rem, 8vw, 3.8rem)" color="var(--ink)">You Are Invited</Script>
        <div style={{ height: 22 }} />
        <Hairline color="var(--gold)" width={50} />
        <div style={{ height: 32 }} />
        <BodyText size="1rem">With hearts full of joy and gratitude to the One above, we invite you to share in the most sacred chapter of our story — the day two souls become one.</BodyText>
        <div style={{ height: 22 }} />
        <BodyText size="1rem">A countryside afternoon, candlelight, and the quiet promise of forever. Among the people we love most, we cannot imagine this moment without you beside us.</BodyText>
      </div>
    </section>
  );
}
