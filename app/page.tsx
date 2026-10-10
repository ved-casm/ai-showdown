import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import TunerNav from "@/components/TunerNav";
import ProductRound from "@/components/ProductRound";
import AvatarShowcase from "@/components/AvatarShowcase";
import VideoShowcase from "@/components/VideoShowcase";
import HowMade from "@/components/HowMade";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Clothesline from "@/components/Clothesline";
import Polaroid from "@/components/Polaroid";
import { PRODUCTS, REEL } from "@/data/products";

const REEL_TILTS = ["-4deg", "2deg", "-1.5deg", "3.5deg", "-2.2deg", "1.4deg"];

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />

      <AvatarShowcase />
      <TunerNav />

      <section id="showdown">
        <div className="wrap">
          <Reveal>
            <p className="section-label">
              ( the showdown )<span className="pen-note">five rounds, three contenders</span>
            </p>
            <h2 className="slot-title">
              Same brief.{" "}
              <span className="hl">
                Three AIs.
                <svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden>
                  <path d="M6 30 C 80 16, 190 18, 294 24 L 292 54 C 190 48, 90 50, 8 60 Z" fill="#FFE45C" />
                </svg>
              </span>
            </h2>
            <p style={{ marginTop: 22, maxWidth: "58ch", fontSize: "1.125rem", color: "var(--muted)" }}>
              Emma's prompts first, then Jake's - every prompt hangs above the three frames it produced.
              Missing competitor shots keep their placeholder stickies.
            </p>
          </Reveal>
          {PRODUCTS.map((p) => (
            <ProductRound key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <VideoShowcase />

      <section id="reel">
        <div className="wrap">
          <Reveal>
            <p className="section-label">
              ( the reel )<span className="pen-note">every personal agent frame, on one line</span>
            </p>
            <h2 className="slot-title">
              The full{" "}
              <span className="hl">
                reel.
                <svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden>
                  <path d="M6 30 C 80 16, 190 18, 294 24 L 292 54 C 190 48, 90 50, 8 60 Z" fill="#FFE45C" />
                </svg>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Clothesline>
              {REEL.map((r, i) => (
                <Polaroid
                  key={r.src}
                  src={r.src}
                  caption={r.caption}
                  badge="ours"
                  rotate={REEL_TILTS[i % REEL_TILTS.length]}
                  delay={`${(i % 4) * 0.4}s`}
                />
              ))}
            </Clothesline>
          </Reveal>
        </div>
      </section>

      <HowMade />
      <Footer />
    </main>
  );
}
