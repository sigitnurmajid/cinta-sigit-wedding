"use client";
import { useEffect, useState } from "react";
import { Script } from "@/components/atoms";

const links = [
  { id: "home",    label: "HOME" },
  { id: "venue",   label: "VENUE" },
  { id: "details", label: "DETAILS" },
  { id: "rsvp",   label: "RSVP" },
];

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-ui)",
  fontWeight: 300,
  fontSize: "0.65rem",
  letterSpacing: "0.32em",
  color: "var(--cream)",
  textDecoration: "none",
};

export default function Nav() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Track scroll position for nav background
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer — highlight whichever section is in the "middle band"
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Close drawer when resizing to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setDrawerOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: "24px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(44,40,23,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}>
        <a href="#home" aria-label="Home" style={{ textDecoration: "none" }}>
          <Script size="1.7rem" color="var(--cream)">S &amp; C</Script>
        </a>

        {/* Desktop links */}
        <div className="nav-links-desktop">
          {links.map(l => {
            const active = activeSection === l.id;
            return (
              <a key={l.id} href={`#${l.id}`} style={{
                ...linkStyle,
                opacity: active ? 1 : 0.7,
                paddingBottom: 4,
                borderBottom: active ? "1px solid var(--gold)" : "1px solid transparent",
              }}>{l.label}</a>
            );
          })}
        </div>

        {/* Hamburger button */}
        <button
          className="nav-hamburger"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block",
              width: 22,
              height: 1.5,
              background: "var(--cream)",
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile fullscreen drawer */}
      <div
        className={`nav-drawer${drawerOpen ? " nav-drawer--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          className="nav-drawer__close"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close navigation menu"
        >×</button>

        <Script size="1.4rem" color="var(--gold)" style={{ opacity: 0.5 }}>S &amp; C</Script>

        {links.map(l => {
          const active = activeSection === l.id;
          return (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav-drawer__link${active ? " nav-drawer__link--active" : ""}`}
              onClick={() => setDrawerOpen(false)}
            >{l.label}</a>
          );
        })}
      </div>
    </>
  );
}
