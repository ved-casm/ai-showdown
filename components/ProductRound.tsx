import { Product, Scenario, Shot } from "@/data/products";
import Polaroid from "./Polaroid";
import Clothesline from "./Clothesline";
import Reveal from "./Reveal";

function Verdict({ text }: { text: string }) {
  // *highlight* markers -> <mark>
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <p className="verdict">
      {parts.map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : p))}
    </p>
  );
}

const TILTS: [string, string][] = [["-2.4deg", "0s"], ["1.8deg", ".4s"], ["-1.2deg", ".8s"]];

function ContenderPolaroid({ contender, src, swap, oursPlaceholder, href }: {
  contender: "Gemini" | "ChatGPT" | "Personal Agent";
  src: string;
  swap: string;
  oursPlaceholder?: string; // custom caption for our own pending shot
  href?: string;
}) {
  const i = contender === "Gemini" ? 0 : contender === "ChatGPT" ? 1 : 2;
  const caption = contender === "Personal Agent" ? (oursPlaceholder || "personal agent") : contender.toLowerCase();
  if (src) {
    return (
      <Polaroid
        src={src}
        caption={caption}
        badge={contender === "Personal Agent" ? "ours" : undefined}
        rotate={TILTS[i][0]}
        delay={TILTS[i][1]}
        href={href}
      />
    );
  }
  return (
    <Polaroid
      caption={caption}
      placeholderFor={contender}
      swapPath={swap}
      rotate={TILTS[i][0]}
      delay={TILTS[i][1]}
      href={href}
    />
  );
}

export function ShotTrio({ shots, swapBase, oursPlaceholder, href }: { shots: Shot; swapBase: string; oursPlaceholder?: string; href?: string }) {
  return (
    <Clothesline>
      <ContenderPolaroid contender="Gemini" src={shots.gemini} swap={`/uploads/gemini/${swapBase}.avif`} href={href} />
      <ContenderPolaroid contender="ChatGPT" src={shots.chatgpt} swap={`/uploads/chatgpt/${swapBase}.avif`} href={href} />
      <ContenderPolaroid contender="Personal Agent" src={shots.ours} swap={`/images/${swapBase}.avif`} oursPlaceholder={oursPlaceholder} href={href} />
    </Clothesline>
  );
}

function AvatarGroup({ who, scenarios, slug }: { who: "emma" | "jake"; scenarios: Scenario[]; slug: string }) {
  return (
    <div className={`avatar-group ${who}`} data-testid={`avatar-group-${who}`}>
      <p className="avatar-tag">
        <span className="lbl">{who === "emma" ? "emma's prompts" : "jake's prompts"}</span>
      </p>
      {scenarios.map((s, i) => (
        <div className="scenario" key={i}>
          <p className="the-prompt">
            <span className="lbl">the prompt</span>
            {s.prompt}
          </p>
          <ShotTrio shots={s.shots} swapBase={`${slug}-${who}-${i + 1}`} href={`/rounds/${slug}`} />
        </div>
      ))}
    </div>
  );
}

function RoundHead({ product }: { product: Product }) {
  return (
    <Reveal>
      <div className="round-head">
        <span className="round-index">
          <svg viewBox="0 0 52 42" aria-hidden>
            <path d="M26 2 C 10 2, 2 10, 3 21 C 4 34, 18 40, 30 39 C 44 38, 51 28, 48 16 C 45 6, 34 1, 22 4" stroke="#2B59F0" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          {product.round}
        </span>
        <h3>
          {product.brand} - <span style={{ letterSpacing: "-0.04em" }}>{product.title}</span>
        </h3>
      </div>
      <Verdict text={product.verdict} />
      <ul className="tags">
        {product.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function ProductRound({ product }: { product: Product }) {
  return (
    <article className="round" id={`round-${product.slug}`} data-testid={`round-${product.slug}`}>
      <RoundHead product={product} />
      {product.kind === "ugc" ? (
        <>
          <AvatarGroup who="emma" scenarios={product.emma} slug={product.slug} />
          <AvatarGroup who="jake" scenarios={product.jake} slug={product.slug} />
        </>
      ) : (
        product.solo && (
          <Reveal delay={0.1}>
            <ShotTrio
              shots={product.solo}
              swapBase={`${product.slug}-1`}
              oursPlaceholder={product.status === "midnight" ? "developing at midnight" : undefined}
              href={`/rounds/${product.slug}`}
            />
          </Reveal>
        )
      )}
    </article>
  );
}
