import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Showcase } from "@/components/copper/showcase";
import { getProducts } from "@/lib/copper/catalog";

describe("Showcase", () => {
  it("is the #showcase section", () => {
    const { container } = render(<Showcase />);
    expect(container.querySelector('[data-testid="showcase"]')?.id).toBe(
      "showcase",
    );
  });

  it("shows a captioned lifestyle photo of each product from the catalog", () => {
    const { container } = render(<Showcase />);
    for (const product of getProducts()) {
      const figures = container.querySelectorAll(
        `figure[data-product="${product.id}"]`,
      );
      expect(figures.length, product.id).toBeGreaterThan(0);
      for (const figure of figures) {
        const img = figure.querySelector("img")!;
        const src = decodeURIComponent(img.getAttribute("src") ?? "");
        expect(product.lifestyle.some((path) => src.includes(path))).toBe(true);
        expect(img.getAttribute("alt")).toMatch(new RegExp(`^${product.name} `));
        expect(img.getAttribute("alt")).not.toMatch(/\.png$/);
        const caption = figure.querySelector("figcaption")?.textContent ?? "";
        expect(caption.length).toBeGreaterThan(product.name.length);
      }
    }
  });
});
