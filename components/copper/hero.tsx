import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getProducts, type ProductId } from "@/lib/copper/catalog";

// Both cutouts are 1254×1254 with transparent backgrounds.
const CUTOUT_SIZE = 1254;

// What each cutout shows, after the product name from the catalog.
const CUTOUT_DETAILS: Record<ProductId, string> = {
  "copper-home": "smart speaker in woven copper fabric with a round clock display",
  "copper-notes": "clip-on recorder in brushed copper with a glowing button",
};

export function Hero() {
  const products = getProducts();
  const home = products.find((p) => p.id === "copper-home");
  const notes = products.find((p) => p.id === "copper-notes");

  return (
    <section id="top" data-testid="hero" className="bg-secondary">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col items-start gap-6">
          <h1 className="font-heading text-4xl leading-tight font-bold text-balance sm:text-5xl">
            Practical AI for Arizona homes, desks and classrooms.
          </h1>
          <p className="text-muted-foreground text-xl">
            From raw ideas to refined answers.
          </p>
          <Button asChild size="lg" className="h-11 px-6 text-base">
            <a href="#products">See products</a>
          </Button>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          {home && (
            <Image
              src={home.cutout}
              alt={`${home.name} ${CUTOUT_DETAILS[home.id]}`}
              width={CUTOUT_SIZE}
              height={CUTOUT_SIZE}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 28rem, 90vw"
              className="h-auto w-[85%]"
            />
          )}
          {notes && (
            <Image
              src={notes.cutout}
              alt={`${notes.name} ${CUTOUT_DETAILS[notes.id]}`}
              width={CUTOUT_SIZE}
              height={CUTOUT_SIZE}
              loading="eager"
              sizes="(min-width: 768px) 12rem, 40vw"
              className="absolute right-0 bottom-0 h-auto w-[45%] drop-shadow-xl"
            />
          )}
        </div>
      </div>
    </section>
  );
}
