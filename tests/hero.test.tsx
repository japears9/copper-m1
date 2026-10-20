import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/copper/hero";
import { getProducts } from "@/lib/copper/catalog";

describe("Hero", () => {
  it("is the #top section with a short h1 and the exact tagline", () => {
    const { container } = render(<Hero />);
    const hero = container.querySelector('[data-testid="hero"]');
    expect(hero?.id).toBe("top");
    const heading = screen.getByRole("heading", { level: 1 });
    const words = (heading.textContent ?? "").trim().split(/\s+/);
    expect(words.length).toBeLessThanOrEqual(10);
    expect(
      screen.getByText("From raw ideas to refined answers."),
    ).toBeInTheDocument();
  });

  it("links See products to #products with the Copper button", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: "See products" });
    expect(link).toHaveAttribute("href", "#products");
    expect(link.className).toMatch(/(^|\s)bg-primary(\s|$)/);
  });

  it("shows each product's cutout from the catalog with descriptive alt text", () => {
    const { container } = render(<Hero />);
    const hero = within(container.querySelector<HTMLElement>("#top")!);
    for (const product of getProducts()) {
      const img = hero.getByAltText(new RegExp(`^${product.name} `));
      expect(decodeURIComponent(img.getAttribute("src") ?? "")).toContain(
        product.cutout,
      );
      expect(img).toHaveAttribute("data-nimg");
    }
  });
});
