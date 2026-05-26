import { site } from "@/content/site";
import { Eyebrow, Script, SerifCaps, Hairline } from "@/components/atoms";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = {
  title: "Gallery — Cinta & Sigit",
  description: "A collection of our favourite moments together.",
};

export default function GalleryPage() {
  return (
    <main style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* Header */}
      <section className="section section--dark" style={{ textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <Eyebrow color="var(--gold)">Our Moments</Eyebrow>
          <div style={{ height: 18 }} />
          <Script size="clamp(3.4rem, 8vw, 4.8rem)" color="var(--cream)">Gallery</Script>
          <div style={{ height: 18 }} />
          <Hairline color="var(--gold)" width={44} />
          <div style={{ height: 22 }} />
          <SerifCaps size="0.85rem" tracking="0.35em" color="var(--gold)">
            {site.bride} &amp; {site.groom}
          </SerifCaps>
        </div>
      </section>

      {/* Interactive photo grid + lightbox */}
      <GalleryGrid photos={site.images.gallery} />

    </main>
  );
}
