"use client";
import { useState, useRef, useEffect } from "react";
import { Eyebrow, Script, SerifCaps, BodyItalic } from "@/components/atoms";
import { site } from "@/content/site";
import { formatLongDate } from "@/lib/format";

function SpeakerOnIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export default function Hero({ shouldPlay = false }: { shouldPlay?: boolean }) {
  const dateLong = formatLongDate(site.weddingDate);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Start video (with sound attempt) once the splash is dismissed
  useEffect(() => {
    if (!shouldPlay) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.play()
      .then(() => setIsMuted(false))
      .catch(() => {
        video.muted = true;
        video.play().catch(() => {});
        setIsMuted(true);
      });
  }, [shouldPlay]);

  function toggleMute() {
    const next = !isMuted;
    setIsMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  }

  return (
    <section style={{
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      overflow: "hidden",
      background: "var(--ink)",
      color: "var(--cream)",
    }}>
      {/* Background video */}
      <video
        ref={videoRef}
        loop
        playsInline
        poster={site.images.hero}
        suppressHydrationWarning
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          filter: "brightness(0.78) saturate(0.85)",
        }}
      >
        <source src={site.images.heroVideo} type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(20,18,12,0.45) 0%, rgba(20,18,12,0.1) 35%, rgba(20,18,12,0.15) 65%, rgba(20,18,12,0.7) 100%)",
      }} />

      {/* Hero content */}
      <div style={{
        position: "relative", zIndex: 2,
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "120px 28px 80px",
      }}>
        <SerifCaps size="0.85rem" tracking="0.5em" color="var(--gold)">The Wedding of</SerifCaps>
        <div style={{ height: 26 }} />
        <Script size="clamp(4.6rem, 12vw, 7.2rem)" color="var(--cream)">{site.bride}</Script>
        <div style={{ margin: "10px 0", display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ display: "block", width: 50, height: 1, background: "var(--gold)", opacity: 0.7 }} />
          <SerifCaps size="0.85rem" tracking="0.4em" color="var(--gold)">and</SerifCaps>
          <span style={{ display: "block", width: 50, height: 1, background: "var(--gold)", opacity: 0.7 }} />
        </div>
        <Script size="clamp(4.6rem, 12vw, 7.2rem)" color="var(--cream)">{site.groom}</Script>
      </div>

      {/* Date + location labels */}
      <div className="hero-label-date" style={{ position: "absolute", bottom: 40, left: 28, zIndex: 3 }}>
        <Eyebrow color="var(--gold)">Save the Date</Eyebrow>
        <BodyItalic size="1rem" color="var(--cream)" style={{ marginTop: 4 }}>{dateLong}</BodyItalic>
      </div>
      <div className="hero-label-location" style={{ position: "absolute", bottom: 40, right: 28, zIndex: 3, textAlign: "right" }}>
        <Eyebrow color="var(--gold)">Location</Eyebrow>
        <BodyItalic size="1rem" color="var(--cream)" style={{ marginTop: 4 }}>{site.venue.city}</BodyItalic>
      </div>

      {/* Sound toggle — only shown after video starts */}
      {shouldPlay && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 50,
            background: "rgba(44, 40, 23, 0.72)",
            border: "1px solid rgba(197,185,154,0.35)",
            color: "var(--cream)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            cursor: "pointer",
            padding: "7px 13px",
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontFamily: "var(--font-ui)",
            fontWeight: 300,
            fontSize: "0.6rem",
            letterSpacing: "0.32em",
            opacity: 0.8,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
        >
          {isMuted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
          {isMuted ? "UNMUTE" : "MUTE"}
        </button>
      )}
    </section>
  );
}
