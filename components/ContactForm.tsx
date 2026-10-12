"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";
import "./ContactForm.css";

const ENDPOINT = "https://ved-portfolio-nine.vercel.app/api/contact-relay";
const BOOKING_URL = "https://cal.com/vedankgaur/quick";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: "showdown",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || "Couldn't send right now.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send right now.");
      setStatus("error");
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <Reveal>
          <p className="section-label">
            ( say hello )<span className="pen-note">replies within 24 hours</span>
          </p>
          <h2 className="slot-title">
            Got a brief?{" "}
            <span className="hl">
              Let&apos;s talk.
              <svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden>
                <path d="M6 30 C 80 16, 190 18, 294 24 L 292 54 C 190 48, 90 50, 8 60 Z" fill="#FFE45C" />
              </svg>
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="cf-grid">
            <div className="cf-paper">
              <span className="tape a" aria-hidden />
              <span className="tape b" aria-hidden />
              {status === "sent" ? (
                <div className="cf-done" role="status">
                  <p className="cf-done-title">Sent! ✓</p>
                  <p>
                    Thanks for the note. A copy of what you wrote is on its way to your inbox, and I will reply
                    within 24 hours.
                  </p>
                  <button type="button" className="cta" onClick={() => setStatus("idle")}>
                    send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="cf-form">
                  <label className="cf-field">
                    <span>name</span>
                    <input name="name" type="text" required maxLength={120} autoComplete="name" placeholder="your name" />
                  </label>
                  <label className="cf-field">
                    <span>email</span>
                    <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@company.com" />
                  </label>
                  <label className="cf-field">
                    <span>message</span>
                    <textarea name="message" required maxLength={4000} rows={5} placeholder="what should we make?" />
                  </label>
                  <input className="cf-hp" name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  {status === "error" && (
                    <p className="cf-error" role="alert">
                      {error}
                    </p>
                  )}
                  <button type="submit" className="cta primary cf-submit" disabled={status === "sending"}>
                    {status === "sending" ? "sending..." : "send message ↗"}
                  </button>
                </form>
              )}
            </div>

            <aside className="cf-sticky">
              <span className="tape a" aria-hidden />
              <p className="cf-sticky-label">( prefer to talk? )</p>
              <p className="cf-sticky-title">Book a call</p>
              <p className="cf-sticky-copy">30 minutes, no prep. Pick a slot that works for you.</p>
              <a className="cta" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                book a call ↗
              </a>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
