"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";
import { Eyebrow, Script, Hairline } from "@/components/atoms";

const photos = site.images.gallery;

export default function Gallery() {
  // Triple photos so the CSS loop is seamless
  const strip = [...photos, ...photos, ...photos];

  // ── Lightbox ─────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev  = useCallback(() => setActiveIndex(i => i === null ? null : (i - 1 + photos.length) % photos.length), []);
  const next  = useCallback(() => setActiveIndex(i => i === null ? null : (i + 1) % photos.length), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (activeIndex === null) return;
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeIndex]);

  const active = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <section
      id="gallery"
      className="section section--cream2 gallery-section"
      style={{ overflow: "hidden", paddingLeft: 0, paddingRight: 0 }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 44, paddingLeft: 28, paddingRight: 28 }}>
        <Eyebrow color="var(--olive)">A glimpse</Eyebrow>
        <div style={{ height: 14 }} />
        <Script size="clamp(2.6rem, 7vw, 3.6rem)" color="var(--ink)">Gallery</Script>
        <div style={{ height: 18 }} />
        <Hairline color="var(--gold)" width={44} />
      </div>

      {/* Auto-scrolling strip */}
      <div
        style={{
          display: "flex",
          width: "100%",
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="gallery-marquee">
          {strip.map((photo, i) => (
            <div
              key={i}
              className="gallery-marquee__item"
              onClick={() => setActiveIndex(i % photos.length)}
              style={{ cursor: "zoom-in" }}
            >
              <div
                className="gallery-marquee__img"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${photo.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "saturate(0.88) sepia(0.06)",
                  transition: "filter 0.4s ease, transform 0.4s ease",
                }}
              />
              {photo.caption && (
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  padding: "32px 16px 12px",
                  background: "linear-gradient(to top, rgba(44,40,23,0.65) 0%, transparent 100%)",
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: "0.88rem",
                  color: "var(--cream)",
                  letterSpacing: "0.03em",
                  textAlign: "center",
                  pointerEvents: "none",
                }}>
                  {photo.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {active && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={close}
              style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(44,40,23,0.94)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            />

            {/* Photo */}
            <motion.div
              key="lightbox"
              initial={{ scale: 0.72, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.72, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              style={{
                position: "fixed", inset: 0, zIndex: 201,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "52px 12px 20px",
                pointerEvents: "none",
              }}
            >
              <div style={{
                maxWidth: "min(96vw, 1200px)",
                maxHeight: "88vh",
                width: "100%",
                pointerEvents: "auto",
                boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
              }}>
                <img
                  src={active.src}
                  alt={active.caption ?? "Gallery photo"}
                  style={{ width: "100%", maxHeight: "88vh", objectFit: "contain", display: "block" }}
                />
              </div>
              {active.caption && (
                <div style={{
                  marginTop: 16,
                  fontFamily: "var(--font-body)", fontStyle: "italic",
                  fontSize: "1rem", color: "var(--gold)",
                  letterSpacing: "0.06em", opacity: 0.9,
                  pointerEvents: "auto",
                }}>
                  {active.caption}
                </div>
              )}
              <div style={{
                marginTop: 10,
                fontFamily: "var(--font-ui)", fontSize: "0.65rem",
                letterSpacing: "0.3em", color: "var(--gold)", opacity: 0.5,
                pointerEvents: "auto",
              }}>
                {activeIndex! + 1} / {photos.length}
              </div>
            </motion.div>

            {/* ✕ Close */}
            <button onClick={close} aria-label="Close" style={{
              position: "fixed", top: 20, right: 24, zIndex: 202,
              background: "transparent", border: "1px solid rgba(197,185,154,0.4)",
              color: "var(--gold)", width: 40, height: 40,
              fontSize: "1.2rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>

            {/* ‹ Prev */}
            {photos.length > 1 && (
              <button onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous" style={{
                position: "fixed", left: "clamp(8px, 3vw, 28px)", top: "50%",
                transform: "translateY(-50%)", zIndex: 202,
                background: "transparent", border: "1px solid rgba(197,185,154,0.35)",
                color: "var(--gold)", width: 44, height: 44,
                fontSize: "1.1rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>‹</button>
            )}

            {/* › Next */}
            {photos.length > 1 && (
              <button onClick={e => { e.stopPropagation(); next(); }} aria-label="Next" style={{
                position: "fixed", right: "clamp(8px, 3vw, 28px)", top: "50%",
                transform: "translateY(-50%)", zIndex: 202,
                background: "transparent", border: "1px solid rgba(197,185,154,0.35)",
                color: "var(--gold)", width: 44, height: 44,
                fontSize: "1.1rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>›</button>
            )}
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
