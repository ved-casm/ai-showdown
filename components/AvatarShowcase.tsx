import { AVATARS } from "@/data/products";
import Reveal from "./Reveal";
import { ShotTrio } from "./ProductRound";

export default function AvatarShowcase() {
  return (
    <section id="cast">
      <div className="wrap">
        <Reveal>
          <p className="section-label">
            ( the cast )<span className="pen-note">one prompt, three faces</span>
          </p>
          <h2 className="slot-title">
            Meet{" "}
            <span className="hl">
              Emma &amp; Jake.
              <svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden>
                <path d="M6 30 C 80 16, 190 18, 294 24 L 292 54 C 190 48, 90 50, 8 60 Z" fill="#FFE45C" />
              </svg>
            </span>
          </h2>
          <p style={{ marginTop: 22, maxWidth: "58ch", fontSize: "1.125rem", color: "var(--muted)" }}>
            Every model got the same avatar prompt. Personal Agent locked its two - so in every product
            photo below, the face stays exactly the same. The others cast someone new each time.
          </p>
        </Reveal>
        {AVATARS.map((a) => (
          <Reveal key={a.key} delay={0.05}>
            <div className="avatar-block" data-testid={`avatar-block-${a.key}`}>
              <p className="avatar-tag">
                <span className="lbl">{a.name === "emma" ? "first - the female avatar" : "then - the male avatar"}</span>
              </p>
              <p className="the-prompt">
                <span className="lbl">the avatar prompt</span>
                {a.prompt}
              </p>
              <ShotTrio shots={a.shots} swapBase={`avatar-${a.key}`} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
