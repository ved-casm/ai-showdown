import StatNote from "./StatNote";
import Reveal from "./Reveal";

export default function HowMade() {
  return (
    <section id="how">
      <div className="wrap">
        <p className="section-label">
          ( how it was made )<span className="pen-note">the people behind the pixels</span>
        </p>
        <div className="about-grid">
          <div>
            <Reveal>
              <div className="about-photos">
                <figure className="about-photo">
                  <span className="tape a" aria-hidden />
                  <span className="tape b" aria-hidden />
                  <img src="/images/avatar-emma.avif" srcSet="/images/avatar-emma-640.avif 640w, /images/avatar-emma.avif 1200w" sizes="(max-width:860px) 44vw, 240px" alt="The locked Emma avatar used across every Personal Agent image" loading="lazy" />
                  <figcaption>emma. one face, every frame.</figcaption>
                </figure>
                <figure className="about-photo jake">
                  <span className="tape a" aria-hidden />
                  <span className="tape b" aria-hidden />
                  <img src="/images/avatar-jake.avif" srcSet="/images/avatar-jake-640.avif 640w, /images/avatar-jake.avif 1200w" sizes="(max-width:860px) 44vw, 240px" alt="The locked Jake avatar used across the Personal Agent images" loading="lazy" />
                  <figcaption>jake. same rule, other face.</figcaption>
                </figure>
              </div>
            </Reveal>
            <div className="stat-row">
              <StatNote value={30} label="images shot" />
              <StatNote value={5} label="products" color="b" />
              <StatNote value={1} label="video" />
              <StatNote value={0} label="studio used" color="b" />
            </div>
          </div>
          <Reveal delay={0.1}>
            <h2 className="about-title">
              Same{" "}
              <span className="circ">
                two faces
                <svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden>
                  <path d="M30 12 C 90 0, 190 6, 192 40 C 194 72, 70 80, 18 62 C 4 56, 6 34, 30 12" stroke="#2B59F0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              , five products, and a stubborn{" "}
              <span className="hl">
                realism checklist.
                <svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden>
                  <path d="M6 30 C 80 16, 190 18, 294 24 L 292 54 C 190 48, 90 50, 8 60 Z" fill="#FFE45C" />
                </svg>
              </span>
            </h2>
            <p style={{ marginTop: 22, fontSize: "1.125rem", color: "var(--muted)", maxWidth: "56ch" }}>
              Gemini and ChatGPT spin up a new person every time. We didn&apos;t: every Personal Agent frame starts from the same two reference faces - Jake and Emma - plus one rule:
              it has to look like a friend took it on a phone. Candid light, film grain, skin with pores,
              rumpled sheets, honey that drips thick. If a frame looked like an ad, it got deleted and re-shot.
            </p>
            <div className="timeline">
              <div className="row">
                <span className="when">step 01</span>
                <span className="what">locked the two avatars - every image references them</span>
                <span className="now-badge" style={{ marginLeft: "auto" }}>done</span>
              </div>
              <div className="row">
                <span className="when">step 02</span>
                <span className="what">fixed the brand marks like real SKUs (AURIX on the headband, CLOUDREST tag, WILDFLOWER label)</span>
              </div>
              <div className="row">
                <span className="when">step 03</span>
                <span className="what">shot 5 scenarios x 2 people x 3 scenes, verified at zoom - faces, fingers, label spelling</span>
              </div>
              <div className="row">
                <span className="when">step 04</span>
                <span className="what">animated the honey drizzle into a 5s phone video</span>
              </div>
              <div className="row">
                <span className="when">step 05</span>
                <span className="what">watch + perfume batches land at midnight, straight into the reel</span>
              </div>
            </div>
            <a className="cta" style={{ marginTop: 26 }} href="#showdown">back to the rounds ↑</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
