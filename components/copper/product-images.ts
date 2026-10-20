import type { Product, ProductId } from "@/lib/copper/catalog";

// Both cutouts are 1254×1254 with transparent backgrounds.
export const CUTOUT_SIZE = 1254;

// What each cutout shows, after the product name from the catalog.
const CUTOUT_DETAILS: Record<ProductId, string> = {
  "copper-home":
    "smart speaker in woven copper fabric with a round clock display",
  "copper-notes": "clip-on recorder in brushed copper with a glowing button",
};

export function cutoutAlt(product: Product): string {
  return `${product.name} ${CUTOUT_DETAILS[product.id]}`;
}

export type LifestylePhoto = {
  width: number;
  height: number;
  alt: string;
  caption: string;
};

// What each lifestyle photo in the catalog shows. A photo not listed here isn't shown.
const LIFESTYLE_PHOTOS: Record<string, LifestylePhoto> = {
  "/assets/lifestyle/copper-home-desert-light.png": {
    width: 1672,
    height: 941,
    alt: "Copper Home smart speaker on a stone kitchen counter, with a desert sunset and saguaros through the window",
    caption:
      "Checks the time and the weather from your kitchen counter, sunset included.",
  },
  "/assets/lifestyle/copper-notes-stone-desk.png": {
    width: 1672,
    height: 941,
    alt: "Copper Notes recorder standing on a stone counter next to its round copper charging puck",
    caption: "Charges on its own copper puck, ready for the next meeting.",
  },
  "/assets/lifestyle/copper-notes-golden-hour.png": {
    width: 1536,
    height: 1024,
    alt: "Copper Notes clipped to a shirt pocket with its amber ring lit, while its wearer writes in a notebook at a café",
    caption:
      "Clips to a pocket at your favorite café. The amber ring shows everyone when it's recording.",
  },
};

export function lifestylePhoto(src: string): LifestylePhoto | undefined {
  return LIFESTYLE_PHOTOS[src];
}
