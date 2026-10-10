import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("../components/Nav", () => () => <nav data-testid="nav" />);
jest.mock("../components/Hero", () => () => <header data-testid="hero" />);
jest.mock("../components/Marquee", () => () => <div>Gemini ✱ ChatGPT ✱ Personal Agent</div>);

describe("Home page", () => {
  it("renders the cast section (emma then jake) and every product round", () => {
    render(<Home />);
    expect(screen.getByTestId("avatar-block-emma")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-block-jake")).toBeInTheDocument();
    for (const slug of ["watch", "headphones", "honey", "pillow", "perfume"]) {
      expect(screen.getByTestId(`round-${slug}`)).toBeInTheDocument();
    }
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });

  it("shows the ticker and never says instinct", () => {
    const { container } = render(<Home />);
    expect(screen.getAllByText(/Gemini ✱ ChatGPT ✱ Personal Agent/).length).toBeGreaterThanOrEqual(1);
    expect(container.innerHTML).not.toMatch(/instinct/i);
  });

  it("no placeholders remain anywhere - every contender delivered", () => {
    render(<Home />);
    expect(screen.queryAllByTestId("placeholder-gemini")).toHaveLength(0);
    expect(screen.queryAllByTestId("placeholder-chatgpt")).toHaveLength(0);
    expect(screen.queryAllByTestId("placeholder-personal agent")).toHaveLength(0);
  });
});
