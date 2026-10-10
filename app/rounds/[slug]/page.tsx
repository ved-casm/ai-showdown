import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ShotTrio } from "@/components/ProductRound";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  return { title: p ? `${p.brand} - ${p.title} | the showdown` : "round" };
}

export default async function RoundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((x) => x.slug === slug);
  if (!product) notFound();
  const idx = PRODUCTS.findIndex((x) => x.slug === product.slug);
  const prev = PRODUCTS[idx - 1], next = PRODUCTS[idx + 1];

  return (
    <main>
      <Nav />
      <section className="round-page">
        <div className="wrap">
          <p className="section-label">
            ( round {product.round} )<span className="pen-note">every frame + the exact prompt</span>
          </p>
          <h2 className="slot-title">
            {product.brand} -{" "}
            <span className="hl">
              {product.title}
              <svg viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden>
                <path d="M6 30 C 80 16, 190 18, 294 24 L 292 54 C 190 48, 90 50, 8 60 Z" fill="#FFE45C" />
              </svg>
            </span>
          </h2>
          <p className="verdict" style={{ marginTop: 18 }}>{product.verdict.replace(/\*/g, "")}</p>

          {product.kind === "ugc" ? (
            (["emma", "jake"] as const).map((who) => (
              <div className={`avatar-group ${who}`} key={who}>
                <p className="avatar-tag"><span className="lbl">{who === "emma" ? "emma's prompts" : "jake's prompts"}</span></p>
                {product[who].map((s, i) => (
                  <div className="scenario" key={i}>
                    <p className="the-prompt"><span className="lbl">the prompt</span>{s.prompt}</p>
                    <ShotTrio shots={s.shots} swapBase={`${product.slug}-${who}-${i + 1}`} />
                  </div>
                ))}
              </div>
            ))
          ) : (
            product.solo && (
              <div className="scenario" style={{ marginTop: 40 }}>
                <ShotTrio shots={product.solo} swapBase={`${product.slug}-1`} />
              </div>
            )
          )}

          <div className="round-pager">
            {prev ? <Link href={`/rounds/${prev.slug}`}>← {prev.brand.toLowerCase()}</Link> : <span />}
            <Link href="/#showdown">all rounds</Link>
            {next ? <Link href={`/rounds/${next.slug}`}>{next.brand.toLowerCase()} →</Link> : <span />}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
