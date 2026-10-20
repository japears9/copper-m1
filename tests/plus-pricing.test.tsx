import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
} from "@/lib/copper/catalog";

// Imports the section fresh, so a catalog mock applies.
async function renderPricing() {
  vi.resetModules();
  const { PlusPricing } = await import("@/components/copper/plus-pricing");
  return render(<PlusPricing />);
}

afterEach(() => {
  cleanup();
  vi.doUnmock("@/lib/copper/catalog");
});

describe("PlusPricing", () => {
  it("is the #plus section with one card per catalog plan", async () => {
    const { container } = await renderPricing();
    expect(container.querySelector('[data-testid="plus-pricing"]')?.id).toBe(
      "plus",
    );
    const cards = container.querySelectorAll('[data-testid="plan-card"]');
    expect([...cards].map((card) => card.getAttribute("data-plan"))).toEqual(
      getPlans().map((plan) => plan.id),
    );
  });

  it("shows each plan's prices, memory, recording hours and Refined answers", async () => {
    const { container } = await renderPricing();
    for (const plan of getPlans()) {
      const card = container.querySelector<HTMLElement>(
        `[data-plan="${plan.id}"]`,
      )!;
      expect(card).toHaveTextContent(plan.name);
      expect(card).toHaveTextContent(formatUsd(plan.monthlyUsd));
      if (plan.annualUsd > 0) {
        expect(card).toHaveTextContent(`${formatUsd(plan.annualUsd)}/year`);
      }
      expect(card).toHaveTextContent(formatMemory(plan.memoryDays));
      expect(card).toHaveTextContent(formatNotesHours(plan.notesHoursPerMonth));
      expect(card).toHaveTextContent(
        plan.refinedAnswers ? "Included" : "Not included",
      );
    }
  });

  it("follows the catalog when Copper Plus prices change", async () => {
    vi.doMock("@/lib/copper/catalog", async (importOriginal) => {
      const actual =
        await importOriginal<typeof import("@/lib/copper/catalog")>();
      return {
        ...actual,
        getPlans: () =>
          actual
            .getPlans()
            .map((p) =>
              p.id === "copper-plus"
                ? { ...p, monthlyUsd: 9.49, annualUsd: 95 }
                : p,
            ),
      };
    });
    const text = (await renderPricing()).container.textContent ?? "";
    expect(text).toContain("$9.49");
    expect(text).toContain("$95/year");
    expect(text).toContain("save $18.88");
    expect(text).not.toContain("$7.99");
  });
});
