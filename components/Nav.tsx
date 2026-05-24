"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Script } from "@/components/atoms";

const links = [
  { href: "/", label: "HOME" },
  { href: "/venue", label: "VENUE" },
  { href: "/details", label: "DETAILS" },
  { href: "/rsvp", label: "RSVP" },
];

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-ui)",
  fontWeight: 300,
  fontSize: "0.65rem",
  letterSpacing: "0.32em",
  color: "var(--cream)",
};

export default function Nav() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer when navigating
  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  // Close drawer when viewport widens back to desktop
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
        position: "absolute",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: "24px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Link href="/" aria-label="Home">
          <Script size="1.7rem" color="var(--cream)">S &amp; C</Script>
        </Link>

        {/* Desktop links — hidden on mobile via CSS */}
        <div className="nav-links-desktop">
          {links.map(l => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} style={{
                ...linkStyle,
                opacity: active ? 1 : 0.7,
                paddingBottom: 4,
                borderBottom: active ? "1px solid var(--gold)" : "1px solid transparent",
              }}>{l.label}</Link>
            );
          })}
        </div>

        {/* Hamburger button — shown on mobile only via CSS */}
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
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-drawer__link${active ? " nav-drawer__link--active" : ""}`}
              onClick={() => setDrawerOpen(false)}
            >{l.label}</Link>
          );
        })}
      </div>
    </>
  );
}
