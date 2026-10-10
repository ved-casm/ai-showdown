import { PRODUCTS, REEL, AVATARS } from "@/data/products";

describe("content config", () => {
  it("has all five product rounds, UGC first and perfume last", () => {
    expect(PRODUCTS.map((p) => p.slug)).toEqual([
      "watch",
      "headphones",
      "honey",
      "pillow",
      "perfume",
    ]);
    expect(PRODUCTS.slice(0, 4).every((p) => p.kind === "ugc")).toBe(true);
    expect(PRODUCTS[4].kind).toBe("product");
  });

  it("the cast has emma first, then jake, each with a prompt and 3 avatar shots", () => {
    expect(AVATARS.map((a) => a.key)).toEqual(["emma", "jake"]);
    for (const a of AVATARS) {
      expect(a.prompt.length).toBeGreaterThan(100);
      for (const src of [a.shots.gemini, a.shots.chatgpt, a.shots.ours]) {
        expect(src).toMatch(/^\/(uploads|images)\/.+\.avif$/);
      }
    }
  });

  it("every UGC round has 3 emma + 3 jake scenarios, each with an exact prompt", () => {
    for (const p of PRODUCTS.filter((x) => x.kind === "ugc")) {
      expect(p.emma).toHaveLength(3);
      expect(p.jake).toHaveLength(3);
      for (const s of [...p.emma, ...p.jake]) {
        expect(s.prompt.length).toBeGreaterThan(80);
        expect(s.shots.ours).toMatch(/^\/images\/.+\.avif$/);
        for (const src of [s.shots.gemini, s.shots.chatgpt]) {
          if (src) expect(src).toMatch(/^\/uploads\/(gemini|chatgpt)\/.+\.avif$/);
        }
      }
      expect(p.verdict).toMatch(/personal agent/i);
    }
  });

  it("pillow is fully wired now that his gemini set arrived", () => {
    const pillow = PRODUCTS.find((p) => p.slug === "pillow")!;
    for (const s of [...pillow.emma, ...pillow.jake]) {
      expect(s.shots.gemini).toMatch(/^\/uploads\/gemini\/pillow-.+\.avif$/);
    }
  });

  it("perfume is a product-only round with all three shots live", () => {
    const perfume = PRODUCTS.find((p) => p.slug === "perfume")!;
    expect(perfume.solo?.gemini).toMatch(/^\/uploads\/gemini\/.+\.avif$/);
    expect(perfume.solo?.chatgpt).toMatch(/^\/uploads\/chatgpt\/.+\.avif$/);
    expect(perfume.solo?.ours).toMatch(/^\/images\/perfume-.+\.avif$/);
  });

  it("reel entries are all local AVIF images", () => {
    expect(REEL.length).toBeGreaterThanOrEqual(12);
    for (const r of REEL) expect(r.src).toMatch(/^\/images\/.+\.avif$/);
  });

  it("never uses the word instinct anywhere", () => {
    expect(JSON.stringify({ PRODUCTS, REEL, AVATARS })).not.toMatch(/instinct/i);
  });
});
