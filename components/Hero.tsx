import DotField from "./DotField";

export default function Hero() {
  const r = (d: number) => ({ style: { animationDelay: `${d}s` } });
  return (
    <section id="home" style={{ paddingTop: 0, position: "relative" }}>
      <DotField />
      <div className="wrap hero">
        <div>
          <p className="eyebrow rise" {...r(0)}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" stroke="#161616" strokeWidth="2" fill="none" strokeLinejoin="round" />
            </svg>
            ( the photorealism showdown )
          </p>
          <h1>
            <span className="line rise" {...r(0)}>One prompt.</span>
            <span className="line rise" {...r(0.12)}>
              <span className="hl">
                Three AIs.
                <svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden>
                  <path d="M6 30 C 80 16, 190 18, 294 24 L 292 54 C 190 48, 90 50, 8 60 Z" fill="#FFE45C" />
                </svg>
              </span>
            </span>
          </h1>
          <p className="role rise" {...r(0.3)}>gemini vs chatgpt vs personal agent - zero studio.</p>
          <p className="lede rise" {...r(0.42)}>
            Gemini and ChatGPT invent a new face every prompt. Personal Agent doesn&apos;t - every frame is the same Emma (that&apos;s her, right there), run through a stubborn realism checklist: candid light, film grain, real skin. Judge for yourself.
          </p>
          <div className="hero-ctas rise" {...r(0.52)}>
            <a className="cta primary" href="#showdown">see the showdown →</a>
            <a className="cta" href="#video">watch the video</a>
          </div>
        </div>
        <figure className="about-photo" style={{ rotate: "1.6deg" }}>
          <span className="tape a" aria-hidden />
          <span className="tape b" aria-hidden />
          <img src="/images/avatar-emma.avif" srcSet="/images/avatar-emma-640.avif 640w, /images/avatar-emma.avif 1200w" sizes="(max-width:860px) 60vw, 420px" alt="Emma - the locked avatar behind every Personal Agent image" fetchPriority="high" />
          <figcaption>emma. one face, every frame.</figcaption>
        </figure>
      </div>
      <div className="scroll-hint" aria-hidden>
        scroll
        <svg width="14" height="18" viewBox="0 0 14 18"><path d="M7 1 V15 M2 10 L7 16 L12 10" stroke="#161616" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </section>
  );
}
