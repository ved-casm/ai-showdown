"use client";
import { useEffect, useRef } from "react";

export default function VideoShowcase() {
  const vid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = vid.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.35) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: [0, 0.35, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="video">
      <div className="wrap">
        <p className="section-label">
          ( bonus round )<span className="pen-note">moving pictures</span>
        </p>
        <h2 className="slot-title">
          The video{" "}
          <span className="hl">
            test.
            <svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden>
              <path d="M6 30 C 80 16, 190 18, 294 24 L 292 54 C 190 48, 90 50, 8 60 Z" fill="#FFE45C" />
            </svg>
          </span>
        </h2>
        <div className="video-grid" style={{ marginTop: 44 }}>
          <div className="video-card">
            <span className="tape a" aria-hidden />
            <span className="tape b" aria-hidden />
            <video ref={vid} src="/video/kling-emma-honey.mp4" muted loop playsInline preload="metadata" />
            <span className="play-pill">
              <span className="dot" aria-hidden /> rec
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: "clamp(2rem,3.4vw,3.1rem)", letterSpacing: "-0.04em" }}>
              Personal Agent <mark>actually moves.</mark>
            </h3>
            <p style={{ marginTop: 16, color: "var(--muted)", maxWidth: "52ch" }}>
              Same locked Emma, same honey ribbon - animated image-to-video. The drip stays thick, the face stays hers,
              and nobody's skin turned to plastic. Gemini and ChatGPT columns for this round are waiting on their clips too.
            </p>
            <ul className="tags">
              <li>5 seconds</li>
              <li>image-to-video</li>
              <li>thick ribbon intact</li>
              <li>no face drift</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
