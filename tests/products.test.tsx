import { render, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Products } from "@/components/copper/products";
import { formatUsd, getProducts } from "@/lib/copper/catalog";

describe("Products", () => {
  it("is the #products section with one card per catalog product", () => {
    const { container } = render(<Products />);
    const section = container.querySelector('[data-testid="products"]');
    expect(section?.id).toBe("products");
    const cards = container.querySelectorAll('[data-testid="product-card"]');
    expect([...cards].map((card) => card.getAttribute("data-product"))).toEqual(
      getProducts().map((product) => product.id),
    );
  });

  it("shows each product's cutout, name, catalog price and three features", () => {
    const { container } = render(<Products />);
    for (const product of getProducts()) {
      const card = container.querySelector<HTMLElement>(
        `[data-product="${product.id}"]`,
      )!;
      const img = within(card).getByRole("img");
      expect(decodeURIComponent(img.getAttribute("src") ?? "")).toContain(
        product.cutout,
      );
      expect(img.getAttribute("alt")).toMatch(new RegExp(`^${product.name} `));
      expect(card).toHaveTextContent(product.name);
      expect(card).toHaveTextContent(formatUsd(product.priceUsd));
      expect(product.features).toHaveLength(3);
      for (const feature of product.features) {
        expect(card).toHaveTextContent(feature.name);
      }
    }
  });
});
