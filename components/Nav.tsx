"use client";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#showdown", label: "Showdown" },
  { href: "#video", label: "Video" },
  { href: "#reel", label: "Reel" },
  { href: "#how", label: "How" },
];

function Uline() {
  return (
    <svg className="uline" viewBox="0 0 68 12" preserveAspectRatio="none" aria-hidden>
      <path d="M2 7 C 10 2, 16 11, 24 6 S 38 2, 46 6 S 58 11, 66 5" stroke="#2B59F0" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState("#home");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(`#${e.target.id}`)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header ref={ref} className={`site-nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav">
        <a className="logo" href="#home">
          <svg viewBox="0 0 58 46" aria-hidden>
            <path d="M34 4 C 14 2, 3 12, 4 24 C 5 38, 26 44, 42 40 C 56 36, 57 18, 46 9 C 38 3, 26 4, 20 7" stroke="#161616" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </svg>
          <span style={{ position: "relative" }}>VG</span>
        </a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={current === l.href ? "current" : ""}>
                {l.label}
                <Uline />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
