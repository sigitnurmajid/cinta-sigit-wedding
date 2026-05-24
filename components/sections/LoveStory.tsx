import { site } from "@/content/site";
import { Eyebrow, Script, BodyItalic, Hairline } from "@/components/atoms";

export default function LoveStory() {
  return (
    <section className="section section--cream" style={{ textAlign: "center" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Eyebrow color="var(--olive)">Our story</Eyebrow>
        <div style={{ height: 22 }} />
        <Script size="clamp(3.4rem, 8vw, 4.6rem)" color="var(--ink)">How We Fell</Script>
        <div style={{ height: 22 }} />
        <Hairline color="var(--gold)" width={50} />
        <div style={{ height: 36 }} />
        <BodyItalic size="1.1rem">It began with an ordinary afternoon and an unguarded smile across a crowded courtyard — the kind of meeting one does not realize is the beginning of everything.</BodyItalic>
        <div style={{ height: 22 }} />
        <BodyItalic size="1.1rem">What began as friendship grew quietly, like wildflowers between cobblestones — through long letters, longer conversations, and the slow discovery that the other felt like home.</BodyItalic>
        <div style={{ height: 22 }} />
        <BodyItalic size="1.1rem">And so, beneath a golden sky and with trembling hands, a question was asked, and an answer given — yes, and yes again, for always.</BodyItalic>
        <div style={{ height: 44 }} />
        <Script size="clamp(3rem, 7vw, 4rem)" color="var(--olive)">{site.groom} &amp; {site.bride}</Script>
      </div>
    </section>
  );
}
