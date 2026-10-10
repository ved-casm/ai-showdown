import { render, screen, within } from "@testing-library/react";
import ProductRound from "@/components/ProductRound";
import { PRODUCTS } from "@/data/products";

const watch = PRODUCTS.find((p) => p.slug === "watch")!;
const pillow = PRODUCTS.find((p) => p.slug === "pillow")!;
const perfume = PRODUCTS.find((p) => p.slug === "perfume")!;

describe("ProductRound", () => {
  it("renders emma's group before jake's, each scenario with its prompt and 3 frames", () => {
    render(<ProductRound product={watch} />);
    const round = screen.getByTestId("round-watch");
    const groups = within(round).getAllByTestId(/^avatar-group-/);
    expect(groups.map((g) => g.getAttribute("data-testid"))).toEqual(["avatar-group-emma", "avatar-group-jake"]);
    // 6 scenarios x 3 contenders = 18 images
    const imgs = within(round).getAllByRole("img").map((i) => i.getAttribute("src"));
    expect(imgs).toHaveLength(18);
    expect(imgs).toContain("/images/watch-emma-1-gym.avif");
    expect(imgs).toContain("/uploads/gemini/watch-jake-3.avif");
    // every scenario prompt is on the page
    for (const s of [...watch.emma, ...watch.jake]) {
      expect(within(round).getByText(s.prompt)).toBeInTheDocument();
    }
  });

  it("pillow now hangs all 18 frames including his gemini set", () => {
    render(<ProductRound product={pillow} />);
    const round = screen.getByTestId("round-pillow");
    expect(within(round).queryByTestId("placeholder-gemini")).not.toBeInTheDocument();
    const imgs = within(round).getAllByRole("img");
    expect(imgs).toHaveLength(18);
  });

  it("renders perfume as a product-only trio, all three frames live", () => {
    render(<ProductRound product={perfume} />);
    const round = screen.getByTestId("round-perfume");
    expect(within(round).queryByTestId("avatar-group-emma")).not.toBeInTheDocument();
    const imgs = within(round).getAllByRole("img").map((i) => i.getAttribute("src"));
    expect(imgs).toEqual(["/uploads/gemini/perfume-1.avif", "/uploads/chatgpt/perfume-1.avif", "/images/perfume-emma-1-spray.avif"]);
  });

  it("renders brand and verdict", () => {
    render(<ProductRound product={watch} />);
    expect(screen.getAllByText(new RegExp(watch.brand)).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/personal agent takes the round/i)).toBeInTheDocument();
  });
});
