"use client";
import { useEffect, useState } from "react";
import { PRODUCTS } from "@/data/products";

// ---------------------------------------------------------------------------
// Vertical radio-tuner nav - a scale of tick lines: 5 big numbered lines
// carry the categories, smaller ticks sit between them. Hover widens and
// recolors a line; the live station stays lit while scrolling.
// ---------------------------------------------------------------------------

const NAMES = ["watch", "headphones", "honey", "pillow", "perfume"];

export default function TunerNav() {
  const [active, setActive] = useState(PRODUCTS[0].slug);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById("showdown");
    if (!section) return;
    const showObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "-8% 0px -8% 0px" });
    showObs.observe(section);
    const articles = Array.from(section.querySelectorAll("article.round"));
    const actObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id.replace("round-", "")); }),
      { rootMargin: "-38% 0px -50% 0px" }
    );
    articles.forEach((a) => actObs.observe(a));
    return () => { showObs.disconnect(); actObs.disconnect(); };
  }, []);

  return (
    <nav className={`tuner ${visible ? "on" : ""}`} aria-label="rounds tuner" data-testid="tuner-nav">
      <span className="tuner-current" aria-hidden>{NAMES[PRODUCTS.findIndex((p) => p.slug === active)]}</span>
      <div className="tuner-strip">
      {PRODUCTS.map((p, i) => (
        <div className="tick-group" key={p.slug}>
          <a
            href={`#round-${p.slug}`}
            className={`tick big ${p.slug === active ? "live" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(`round-${p.slug}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <span className="line" aria-hidden />
            <span className="num">{i + 1}</span>
            <span className="st-name">{NAMES[i] || p.title.replace("the ", "")}</span>
          </a>
          {i < PRODUCTS.length - 1 && (
            <span className="minis" aria-hidden>
              <span className="tick mini"><span className="line" /></span><span className="tick mini"><span className="line" /></span><span className="tick mini"><span className="line" /></span><span className="tick mini"><span className="line" /></span>
            </span>
          )}
        </div>
      ))}
      </div>
      <span className="tuner-label" aria-hidden>tune in</span>
    </nav>
  );
}
