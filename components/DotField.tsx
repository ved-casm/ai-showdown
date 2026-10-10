"use client";
import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Hero dot field - the dotted paper grid is drawn on canvas, and near the
// cursor the dots themselves morph into real AI monograms (vibha-style).
// ---------------------------------------------------------------------------

type Glyph = { color: string; draw: (ctx: CanvasRenderingContext2D, s: number) => void };

function star4(ctx: CanvasRenderingContext2D, s: number) {
  // Gemini sparkle - 4-point star
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.quadraticCurveTo(0.09 * s, -0.09 * s, s, 0);
  ctx.quadraticCurveTo(0.09 * s, 0.09 * s, 0, s);
  ctx.quadraticCurveTo(-0.09 * s, 0.09 * s, -s, 0);
  ctx.quadraticCurveTo(-0.09 * s, -0.09 * s, 0, -s);
  ctx.fill();
}

function knot(ctx: CanvasRenderingContext2D, s: number) {
  // ChatGPT rosette knot - 6 interlocking arcs
  ctx.lineWidth = s * 0.22;
  ctx.lineCap = "round";
  for (let k = 0; k < 6; k++) {
    const a = (k * Math.PI) / 3;
    const cx = Math.cos(a) * s * 0.42, cy = Math.sin(a) * s * 0.42;
    ctx.beginPath();
    ctx.arc(cx, cy, s * 0.5, a + Math.PI * 0.72, a + Math.PI * 1.62);
    ctx.stroke();
  }
}

function spark(ctx: CanvasRenderingContext2D, s: number) {
  // Claude starburst - 12 rays
  ctx.lineWidth = s * 0.16;
  ctx.lineCap = "round";
  for (let k = 0; k < 12; k++) {
    const a = (k * Math.PI) / 6;
    const r1 = s * 0.22, r2 = s * (k % 2 ? 0.95 : 0.72);
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
    ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
    ctx.stroke();
  }
}

function loop(ctx: CanvasRenderingContext2D, s: number) {
  // Meta infinity loop
  ctx.lineWidth = s * 0.3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.ellipse(-s * 0.42, 0, s * 0.42, s * 0.3, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(s * 0.42, 0, s * 0.42, s * 0.3, 0, 0, Math.PI * 2);
  ctx.stroke();
}

function gx(ctx: CanvasRenderingContext2D, s: number) {
  // xAI / Grok - slashed X
  ctx.lineWidth = s * 0.3;
  ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(-s * 0.7, -s * 0.8); ctx.lineTo(s * 0.7, s * 0.8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(s * 0.7, -s * 0.8); ctx.lineTo(-s * 0.15, s * 0.1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-s * 0.7, s * 0.35); ctx.lineTo(-s * 0.35, s * 0.8); ctx.stroke();
}

function boat(ctx: CanvasRenderingContext2D, s: number) {
  // Midjourney sailboat
  ctx.beginPath();
  ctx.moveTo(-s * 0.1, -s * 0.95); ctx.lineTo(-s * 0.1, s * 0.1); ctx.lineTo(-s * 0.75, s * 0.1); ctx.closePath(); ctx.fill(); // main sail
  ctx.beginPath();
  ctx.moveTo(s * 0.05, -s * 0.55); ctx.lineTo(s * 0.05, s * 0.1); ctx.lineTo(s * 0.6, s * 0.1); ctx.closePath(); ctx.fill(); // jib
  ctx.beginPath();
  ctx.moveTo(-s * 0.9, s * 0.3); ctx.lineTo(s * 0.9, s * 0.3); ctx.lineTo(s * 0.55, s * 0.75); ctx.lineTo(-s * 0.55, s * 0.75); ctx.closePath(); ctx.fill(); // hull
}

function bars(ctx: CanvasRenderingContext2D, s: number) {
  // Mistral stripes
  const hs = [0.55, 0.8, 1.0, 0.8, 0.55];
  hs.forEach((h, i) => {
    const w = s * 0.26;
    ctx.fillRect((i - 2) * (w + s * 0.12) - w / 2, -s * h * 0.5, w, s * h);
  });
}

function whale(ctx: CanvasRenderingContext2D, s: number) {
  // DeepSeek whale
  ctx.beginPath();
  ctx.ellipse(0, s * 0.12, s * 0.78, s * 0.5, -0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath(); // tail fluke
  ctx.moveTo(s * 0.62, -s * 0.12);
  ctx.quadraticCurveTo(s * 1.05, -s * 0.7, s * 0.9, -s * 0.78);
  ctx.quadraticCurveTo(s * 0.72, -s * 0.5, s * 0.5, -s * 0.32);
  ctx.closePath(); ctx.fill();
  ctx.beginPath(); // blow spout dots
  ctx.arc(-s * 0.35, -s * 0.62, s * 0.07, 0, Math.PI * 2);
  ctx.arc(-s * 0.15, -s * 0.78, s * 0.06, 0, Math.PI * 2);
  ctx.fill();
}

function pointer(ctx: CanvasRenderingContext2D, s: number) {
  // Perplexity mark - open diamond pointer
  ctx.lineWidth = s * 0.22;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.9); ctx.lineTo(s * 0.7, 0); ctx.lineTo(0, s * 0.9); ctx.lineTo(-s * 0.7, 0); ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.9); ctx.lineTo(0, s * 0.9);
  ctx.stroke();
}

function papill(ctx: CanvasRenderingContext2D, s: number) {
  // Personal Agent - black PA pill
  ctx.beginPath();
  ctx.roundRect(-s * 1.05, -s * 0.62, s * 2.1, s * 1.24, s * 0.62);
  ctx.fill();
  ctx.save();
  ctx.fillStyle = "#F4F4F2";
  ctx.font = `700 ${s * 0.78}px ui-monospace, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PA", 0, s * 0.04);
  ctx.restore();
}

const GLYPHS: Glyph[] = [
  { color: "#4795EB", draw: star4 },     // Gemini
  { color: "#161616", draw: knot },      // ChatGPT
  { color: "#D97757", draw: spark },     // Claude
  { color: "#0082FB", draw: loop },      // Meta
  { color: "#161616", draw: gx },        // Grok / xAI
  { color: "#161616", draw: boat },      // Midjourney
  { color: "#FF7000", draw: bars },      // Mistral
  { color: "#4D6BFE", draw: whale },     // DeepSeek
  { color: "#20B8CD", draw: pointer },   // Perplexity
  { color: "#161616", draw: papill },    // Personal Agent
];

const SPACING = 24;
const RADIUS = 190;
const DOT_R = 1.3;

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const section = canvas.closest("section")!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, dpr = 1;
    let radius = RADIUS;
    let cells: { x: number; y: number; g: number; vis: number }[] = [];

    const rebuild = () => {
      const r = section.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.ceil(r.width); H = Math.ceil(r.height);
      radius = Math.min(RADIUS, Math.max(100, W * 0.32)); // smaller morph zone on narrow screens
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      cells = [];
      const ox = (W % SPACING) / 2, oy = (H % SPACING) / 2;
      for (let y = oy; y < H; y += SPACING)
        for (let x = ox; x < W; x += SPACING) {
          const h = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
          cells.push({ x, y, g: Math.floor(h * GLYPHS.length), vis: 0 });
        }
    };
    rebuild();
    const ro = new ResizeObserver(rebuild);
    ro.observe(section);

    let target: { x: number; y: number } | null = null;
    let raf = 0;
    let running = false;

    const paint = () => {
      raf = 0;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      let anyActive = false;
      for (const c of cells) {
        let goal = 0;
        if (target) {
          const d = Math.hypot(c.x - target.x, c.y - target.y);
          goal = Math.max(0, 1 - d / radius);
        }
        c.vis += (goal - c.vis) * 0.22;
        if (c.vis < 0.004) c.vis = 0;
        if (c.vis > 0) anyActive = true;
        // base dot (fades out as the glyph takes over)
        const da = 0.3 * (1 - c.vis);
        if (da > 0.01) {
          ctx.fillStyle = `rgba(22,22,22,${da})`;
          ctx.beginPath();
          ctx.arc(c.x, c.y, DOT_R, 0, Math.PI * 2);
          ctx.fill();
        }
        if (c.vis > 0.01) {
          const g = GLYPHS[c.g];
          ctx.save();
          ctx.translate(c.x, c.y);
          const s = 9.5 * (0.35 + 0.65 * c.vis);
          ctx.globalAlpha = Math.min(1, c.vis * 1.15);
          ctx.fillStyle = g.color;
          ctx.strokeStyle = g.color;
          g.draw(ctx, s);
          ctx.restore();
        }
      }
      if (anyActive || target) schedule();
      else running = false;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const kick = () => { if (!running) { running = true; schedule(); } else schedule(); };

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      target = { x: e.clientX - r.left, y: e.clientY - r.top };
      kick();
    };
    const onLeave = () => { target = null; kick(); };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);

    // touch / no-hover: slow lissajous auto-cursor
    let iv: ReturnType<typeof setInterval> | undefined;
    if (window.matchMedia("(hover: none)").matches) {
      let t = 0;
      iv = setInterval(() => {
        t += 0.016;
        target = {
          x: W * (0.5 + 0.44 * Math.sin(t * 0.7)),
          y: H * (0.5 + 0.4 * Math.sin(t * 1.1 + 1.3)),
        };
        kick();
      }, 33);
    }

    paint();
    return () => {
      ro.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (iv) clearInterval(iv);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="dotfield" aria-hidden />;
}
