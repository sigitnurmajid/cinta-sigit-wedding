"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eyebrow, Script, BodyItalic } from "@/components/atoms";

const schema = z.object({
  name: z.string().min(2, "Please share your name"),
  contact: z.string().min(5, "An email or phone number please"),
  attending: z.enum(["yes", "no"], { required_error: "Please choose one" }),
  guests: z.coerce.number().min(1).max(4).optional(),
  session: z.enum(["akad", "resepsi", "both"]).optional(),
  dietary: z.string().max(200).optional(),
  wish: z.string().max(500).optional(),
});

type FormData = z.infer<typeof schema>;

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-ui)",
  fontWeight: 300,
  fontSize: "0.72rem",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: "var(--olive)",
  marginBottom: 8,
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "var(--cream)",
  border: "1px solid rgba(107,122,74,0.3)",
  borderRadius: 0,
  fontFamily: "var(--font-body)",
  fontStyle: "italic",
  fontSize: "1rem",
  color: "var(--ink)",
  outline: "none",
};

export default function RSVPForm() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { attending: undefined } });

  const attending = watch("attending");

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setDone(true);
    } catch {
      alert("Sorry — something went wrong. Please try again or reach us by phone.");
    }
  }

  if (done) {
    return (
      <div className="rsvp-form-wrap" style={{ textAlign: "center" }}>
        <Eyebrow color="var(--olive)">Reply received</Eyebrow>
        <div style={{ height: 18 }} />
        <Script size="3rem" color="var(--ink)">Thank You</Script>
        <div style={{ height: 22 }} />
        <BodyItalic size="1.05rem">
          Your reply is safely with us. We will hold a place for you with care — and look forward to seeing you in June.
        </BodyItalic>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rsvp-form-wrap">
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", letterSpacing: "0.4em", color: "var(--olive)" }}>YOUR REPLY</span>
      </div>

      <div style={{ marginBottom: 22 }}>
        <label style={labelStyle}>Your Name</label>
        <input {...register("name")} placeholder="As we know you" style={inputStyle} />
        {errors.name && <span style={{ color: "#9b3e2a", fontSize: 13 }}>{errors.name.message}</span>}
      </div>

      <div style={{ marginBottom: 22 }}>
        <label style={labelStyle}>Email or WhatsApp</label>
        <input {...register("contact")} placeholder="So we may reach you" style={inputStyle} />
        {errors.contact && <span style={{ color: "#9b3e2a", fontSize: 12 }}>{errors.contact.message}</span>}
      </div>

      <label style={labelStyle}>Will you be joining us?</label>
      <div className="rsvp-attend-grid">
        {[
          { v: "yes", label: "Joyfully Attending", sub: "With great delight" },
          { v: "no", label: "Regretfully Decline", sub: "With our hearts in spirit" },
        ].map(opt => {
          const selected = attending === opt.v;
          return (
            <button type="button" key={opt.v} onClick={() => setValue("attending", opt.v as any, { shouldValidate: true })} style={{
              padding: "16px 18px",
              background: selected ? "var(--ink)" : "var(--cream)",
              color: selected ? "var(--cream)" : "var(--ink)",
              border: `1px solid ${selected ? "var(--ink)" : "rgba(107,122,74,0.3)"}`,
              cursor: "pointer",
              textAlign: "center",
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", letterSpacing: "0.18em" }}>{opt.label.toUpperCase()}</div>
              <div style={{ height: 4 }} />
              <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.88rem", opacity: 0.75 }}>{opt.sub}</div>
            </button>
          );
        })}
      </div>
      {errors.attending && <div style={{ color: "#9b3e2a", fontSize: 13, marginBottom: 16 }}>{errors.attending.message}</div>}

      {attending === "yes" && (
        <>
          <div className="rsvp-guests-grid">
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>Number of Guests</label>
              <input type="number" min={1} max={4} {...register("guests")} placeholder="1 — 4" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={labelStyle}>Which Session?</label>
              <select {...register("session")} style={inputStyle as any}>
                <option value="">Select…</option>
                <option value="akad">Akad</option>
                <option value="resepsi">Resepsi</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 22 }}>
            <label style={labelStyle}>Dietary Notes</label>
            <input {...register("dietary")} placeholder="Allergies, preferences (optional)" style={inputStyle} />
          </div>
        </>
      )}

      <label style={labelStyle}>A Wish for the Couple</label>
      <textarea {...register("wish")} placeholder="A blessing, a memory, a quiet hope…" style={{
        ...inputStyle, minHeight: 100, resize: "none", marginBottom: 28,
      }} />

      <button type="submit" disabled={isSubmitting} style={{
        width: "100%",
        background: "var(--ink)", color: "var(--cream)",
        border: "none", padding: "18px",
        fontFamily: "var(--font-ui)",
        fontSize: "0.75rem", letterSpacing: "0.5em",
        cursor: isSubmitting ? "wait" : "pointer",
        opacity: isSubmitting ? 0.6 : 1,
      }}>
        {isSubmitting ? "SENDING…" : "SEND OUR REPLY →"}
      </button>
    </form>
  );
}
