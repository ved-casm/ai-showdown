"use client";
import { useEffect, useRef } from "react";
import { TICKER } from "@/data/products";

function Set({ big }: { big?: boolean }) {
  return (
    <span className="set" aria-hidden={!big}>
      {TICKER.map((t, i) => (
        <span key={i} className="item">
          {big ? t : t.toLowerCase()}
          <span className="sep">✱</span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  const front = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const f = front.current!, b = back.current!, w = wrap.current!;
    let paused = false;
    let boost = 0;
    let lastY = window.scrollY;
    let xF = 0, xB = 0; let xB0 = 0;

    // repeat sets until each band is at least 1.3x viewport
    const fill = (el: HTMLDivElement) => {
      const set = el.querySelector(".set") as HTMLElement;
      const setW = set.offsetWidth;
      while (el.scrollWidth < window.innerWidth * 1.3 + setW) {
        el.appendChild(set.cloneNode(true));
      }
      return setW;
    };
    const setWF = fill(f);
    const setWB = fill(b);
    xB0 = -setWB; xB = xB0; // start mid-loop so the right-moving back track never exposes a gap

    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      boost = Math.min(boost + dy * 0.02, 6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    w.addEventListener("mouseenter", () => (paused = true));
    w.addEventListener("mouseleave", () => (paused = false));

    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const deltaMS = t - last;
      last = t;
      if (paused) { raf = requestAnimationFrame(loop); return; }
      boost *= 0.94;
      const speed = (60 + boost * 60) * (deltaMS / 1000);
      xF -= speed; // front moves left
      xB += speed; // back moves right
      if (xF <= -setWF) xF += setWF;
      if (xB >= 0) xB -= setWB;
      f.style.transform = `translateX(${xF}px)`;
      b.style.transform = `translateX(${xB}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="skills" ref={wrap} aria-label="Gemini, ChatGPT, Personal Agent">
      <div className="band back"><div className="track" ref={back}><Set /></div></div>
      <div className="band front"><div className="track" ref={front}><Set big /></div></div>
    </div>
  );
}
