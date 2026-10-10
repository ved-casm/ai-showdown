"use client";
import { useEffect, useRef, useState } from "react";

export default function StatNote({
  value,
  suffix = "",
  label,
  color = "y",
}: {
  value: number;
  suffix?: string;
  label: string;
  color?: "y" | "b";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio < 0.6) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 900;
        const step = (t: number) => {
          const k = Math.min((t - t0) / dur, 1);
          setN(Math.round((1 - Math.pow(1 - k, 3)) * value));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: [0.6] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div className={`sticky ${color}`} ref={ref} data-testid={`stat-${label}`}>
      <span className="tape sm" style={{ left: "38%", top: -12, transform: "rotate(-4deg)" }} aria-hidden />
      <div className="num">
        {n}
        {suffix}
      </div>
      <div className="lbl">{label}</div>
    </div>
  );
}
