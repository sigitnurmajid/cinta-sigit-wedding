"use client";
import { site } from "@/content/site";
import { Eyebrow, Script, Hairline } from "@/components/atoms";

const photos = site.images.gallery;

function MarqueeStrip({ reverse = false }: { reverse?: boolean }) {
  // Triple so the loop is seamless
  const strip = [...photos, ...photos, ...photos];

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        overflow: "hidden",
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div className={reverse ? "gallery-marquee gallery-marquee--reverse" : "gallery-marquee"}>
        {strip.map((photo, i) => (
          <div key={i} className="gallery-marquee__item">
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${photo.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(0.88) sepia(0.06)",
                transition: "filter 0.4s ease, transform 0.4s ease",
              }}
              className="gallery-marquee__img"
            />
            {photo.caption && (
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "32px 16px 12px",
                background: "linear-gradient(to top, rgba(44,40,23,0.65) 0%, transparent 100%)",
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "0.88rem",
                color: "var(--cream)",
                letterSpacing: "0.03em",
                textAlign: "center",
              }}>
                {photo.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="section section--cream2 gallery-section" style={{ overflow: "hidden", paddingLeft: 0, paddingRight: 0 }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 44, paddingLeft: 28, paddingRight: 28 }}>
        <Eyebrow color="var(--olive)">A glimpse</Eyebrow>
        <div style={{ height: 14 }} />
        <Script size="clamp(2.6rem, 7vw, 3.6rem)" color="var(--ink)">Gallery</Script>
        <div style={{ height: 18 }} />
        <Hairline color="var(--gold)" width={44} />
      </div>

      {/* Row 1 — scrolls left */}
      <MarqueeStrip />

      <div style={{ height: 16 }} />

      {/* Row 2 — scrolls right */}
      <MarqueeStrip reverse />

    </section>
  );
}
