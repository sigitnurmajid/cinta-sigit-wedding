import Image from "next/image";
import { site } from "@/content/site";
import { Eyebrow, Script, SerifCaps } from "@/components/atoms";

const rotations = [-2.2, 1.6, -1.4, 2.2];

export default function MemoryLane() {
  return (
    <section className="section section--cream2">
      <div style={{ textAlign: "center" }}>
        <Eyebrow color="var(--olive)">Through the years</Eyebrow>
        <div style={{ height: 22 }} />
        <Script size="clamp(3.4rem, 8vw, 4.6rem)" color="var(--ink)">Memory Lane</Script>
      </div>
      <div style={{ height: 80 }} />
      <div style={{ position: "relative", maxWidth: 880, margin: "0 auto" }}>
        <div className="memory-center-line" aria-hidden />
        {site.memories.map((m, i) => {
          const isLeft = m.side === "left";
          return (
            <div key={i} className="memory-row" style={{
              flexDirection: isLeft ? "row" : "row-reverse",
            }}>
              <div className="memory-photo-side" style={{
                justifyContent: isLeft ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  transform: `rotate(${rotations[i % 4]}deg)`,
                  background: "var(--off)",
                  padding: "10px 10px 36px 10px",
                  boxShadow: "0 18px 40px rgba(44,40,23,0.18)",
                  width: "min(240px, 80vw)",
                }}>
                  <div style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1 / 1",
                    overflow: "hidden",
                  }}>
                    <Image
                      src={m.img}
                      alt={m.caption}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center", filter: "saturate(0.8) sepia(0.05)" }}
                      sizes="(max-width: 479px) 80vw, 240px"
                      loading="lazy"
                    />
                  </div>
                  <div style={{ textAlign: "center", marginTop: 10 }}>
                    <Script size="1.4rem" color="var(--ink)">{m.caption}</Script>
                  </div>
                </div>
              </div>
              <div className="memory-dot" aria-hidden />
              <div className="memory-text-side" style={{ textAlign: isLeft ? "left" : "right", padding: isLeft ? "0 0 0 20px" : "0 20px 0 0" }}>
                <Eyebrow color="var(--olive)">{m.date}</Eyebrow>
                <div style={{ height: 8 }} />
                <SerifCaps size="1.05rem" tracking="0.18em" color="var(--ink)" style={{ fontWeight: 700 }}>{m.title}</SerifCaps>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
