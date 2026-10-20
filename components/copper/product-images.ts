import type { Product, ProductId } from "@/lib/copper/catalog";

// Both cutouts are 1254×1254 with transparent backgrounds.
export const CUTOUT_SIZE = 1254;

// What each cutout shows, after the product name from the catalog.
const CUTOUT_DETAILS: Record<ProductId, string> = {
  "copper-home": "smart speaker in woven copper fabric with a round clock display",
  "copper-notes": "clip-on recorder in brushed copper with a glowing button",
};

export function cutoutAlt(product: Product): string {
  return `${product.name} ${CUTOUT_DETAILS[product.id]}`;
}
