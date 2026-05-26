"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Photo = { src: string; caption?: string };

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setActiveIndex(i => i === null ? null : (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setActiveIndex(i => i === null ? null : (i + 1) % photos.length);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (activeIndex === null) return;
      if (e.key === "Escape")      close();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeIndex]);

  const active = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      {/* ── Photo grid ── */}
      <section className="section section--cream">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {photos.map((photo, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${photo.caption ?? i + 1}`}
                onKeyDown={e => e.key === "Enter" && setActiveIndex(i)}
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  boxShadow: "0 10px 28px rgba(20,15,8,0.16)",
                  cursor: "zoom-in",
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
                    bottom: 0, left: 0, right: 0,
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

      {/* ── Back link ── */}
      <section className="section section--cream" style={{ paddingTop: 0, textAlign: "center" }}>
        <a href="/" style={{
          fontFamily: "var(--font-ui)",
          fontSize: "0.75rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--olive)",
          textDecoration: "none",
          borderBottom: "1px solid var(--gold)",
          paddingBottom: 3,
        }}>
          ← Back to Home
        </a>
      </section>

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
                position: "fixed",
                inset: 0,
                zIndex: 200,
                background: "rgba(44,40,23,0.94)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            />

            {/* Photo container */}
            <motion.div
              key="lightbox"
              initial={{ scale: 0.72, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.72, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 201,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "52px 12px 20px",
                pointerEvents: "none",
              }}
            >
              {/* Photo */}
              <div style={{
                maxWidth: "min(96vw, 1200px)",
                maxHeight: "88vh",
                width: "100%",
                position: "relative",
                pointerEvents: "auto",
                boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
              }}>
                <img
                  src={active.src}
                  alt={active.caption ?? "Gallery photo"}
                  style={{
                    width: "100%",
                    maxHeight: "88vh",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* Caption */}
              {active.caption && (
                <div style={{
                  marginTop: 16,
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "var(--gold)",
                  letterSpacing: "0.06em",
                  opacity: 0.9,
                  pointerEvents: "auto",
                }}>
                  {active.caption}
                </div>
              )}

              {/* Photo counter */}
              <div style={{
                marginTop: 10,
                fontFamily: "var(--font-ui)",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "var(--gold)",
                opacity: 0.5,
                pointerEvents: "auto",
              }}>
                {(activeIndex! + 1)} / {photos.length}
              </div>
            </motion.div>

            {/* ✕ Close button */}
            <button
              onClick={close}
              aria-label="Close"
              style={{
                position: "fixed",
                top: 20, right: 24,
                zIndex: 202,
                background: "transparent",
                border: "1px solid rgba(197,185,154,0.4)",
                color: "var(--gold)",
                width: 40, height: 40,
                fontSize: "1.2rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >✕</button>

            {/* ← Prev */}
            {photos.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); prev(); }}
                aria-label="Previous photo"
                style={{
                  position: "fixed",
                  left: "clamp(8px, 3vw, 28px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 202,
                  background: "transparent",
                  border: "1px solid rgba(197,185,154,0.35)",
                  color: "var(--gold)",
                  width: 44, height: 44,
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >‹</button>
            )}

            {/* → Next */}
            {photos.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); next(); }}
                aria-label="Next photo"
                style={{
                  position: "fixed",
                  right: "clamp(8px, 3vw, 28px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 202,
                  background: "transparent",
                  border: "1px solid rgba(197,185,154,0.35)",
                  color: "var(--gold)",
                  width: 44, height: 44,
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >›</button>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
