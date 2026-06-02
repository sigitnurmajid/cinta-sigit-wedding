"use client";
import { useEffect, useState } from "react";
import { Eyebrow, Script, BodyItalic, SerifCaps } from "@/components/atoms";

interface Wish {
  name: string;
  wish: string;
  attending: "yes" | "no";
}

const navBtn = (disabled: boolean): React.CSSProperties => ({
  minHeight: 44,
  padding: "0 22px",
  background: "transparent",
  border: "1px solid var(--olive)",
  color: "var(--olive)",
  fontFamily: "var(--font-ui)",
  fontWeight: 500,
  fontSize: "0.72rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.35 : 1,
});

export default function Wishes() {
  const [page, setPage] = useState(1);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/rsvp/wishes?page=${page}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setWishes(data.wishes ?? []);
        setTotalPages(data.totalPages ?? 1);
        setTotal(data.total ?? 0);
      })
      .catch(() => {
        if (!cancelled) setWishes([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page]);

  return (
    <section className="section section--cream2">
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <Eyebrow color="var(--olive)">From those who replied</Eyebrow>
        <div style={{ height: 14 }} />
        <Script size="clamp(2.6rem, 7vw, 3.4rem)" color="var(--ink)">Wishes &amp; Prayers</Script>
      </div>

      {total === 0 && !loading ? (
        <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
          <BodyItalic size="1.05rem">Be the first to leave a wish — your kind words will appear here once shared.</BodyItalic>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, maxWidth: 880, margin: "0 auto", minHeight: 120 }}>
            {wishes.map((w, i) => (
              <div key={`${page}-${i}`} style={{ padding: "28px", background: "var(--off)", border: "1px solid rgba(107,122,74,0.2)" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "1.6rem", color: "var(--gold)", lineHeight: 0.5, marginBottom: 4 }}>&ldquo;</div>
                <BodyItalic size="1.05rem">{w.wish}</BodyItalic>
                <div style={{ height: 14 }} />
                <SerifCaps size="0.8rem" tracking="0.22em" color="var(--olive)" style={{ fontWeight: 600 }}>— {w.name}</SerifCaps>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", fontWeight:600, justifyContent: "center", gap: 20, marginTop: 36 }}>
              <button
                style={navBtn(page <= 1)}
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ‹ Prev
              </button>
              <SerifCaps size="0.8rem" tracking="0.22em" color="var(--ink-soft)">
                {page} / {totalPages}
              </SerifCaps>
              <button
                style={navBtn(page >= totalPages)}
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next ›
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
