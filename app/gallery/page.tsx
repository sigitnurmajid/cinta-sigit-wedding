import { site } from "@/content/site";
import { Eyebrow, Script, SerifCaps, Hairline } from "@/components/atoms";

export const metadata = {
  title: "Gallery — Sigit & Cinta",
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
            {site.groom} &amp; {site.bride}
          </SerifCaps>
        </div>
      </section>

      {/* Photo grid */}
      <section className="section section--cream">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {site.images.gallery.map((photo, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  boxShadow: "0 10px 28px rgba(20,15,8,0.16)",
                }}
                className="gallery-item"
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${photo.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "saturate(0.88) sepia(0.08)",
                    transition: "transform 0.4s ease, filter 0.4s ease",
                  }}
                  className="gallery-item__img"
                />
                {photo.caption && (
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "28px 20px 16px",
                    background: "linear-gradient(to top, rgba(44,40,23,0.72) 0%, transparent 100%)",
                    fontFamily: "var(--font-body)",
                    fontStyle: "italic",
                    fontSize: "0.9rem",
                    color: "var(--cream)",
                    letterSpacing: "0.04em",
                  }}>
                    {photo.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="section section--cream" style={{ paddingTop: 0, textAlign: "center" }}>
        <a
          href="/"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.75rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--olive)",
            textDecoration: "none",
            borderBottom: "1px solid var(--gold)",
            paddingBottom: 3,
          }}
        >
          ← Back to Home
        </a>
      </section>

    </main>
  );
}
