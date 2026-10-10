import { render, screen } from "@testing-library/react";
import Polaroid from "@/components/Polaroid";

describe("Polaroid", () => {
  it("renders the waiting-for-upload placeholder for a missing contender shot", () => {
    render(<Polaroid caption="gemini" placeholderFor="Gemini" swapPath="/uploads/gemini/watch.avif" />);
    expect(screen.getByTestId("placeholder-gemini")).toBeInTheDocument();
    expect(screen.getByText("waiting for upload")).toBeInTheDocument();
    expect(screen.getByText(/\/uploads\/gemini\/watch\.avif/)).toBeInTheDocument();
  });

  it("renders the image polaroid with badge when a src is given", () => {
    render(<Polaroid src="/images/honey-emma-1-toast.avif" caption="honey drizzle" badge="ours" />);
    const img = screen.getByRole("img", { name: "honey drizzle" });
    expect(img).toHaveAttribute("src", "/images/honey-emma-1-toast.avif");
    expect(screen.getByText("ours")).toBeInTheDocument();
    expect(screen.queryByText("waiting for upload")).not.toBeInTheDocument();
  });
});
