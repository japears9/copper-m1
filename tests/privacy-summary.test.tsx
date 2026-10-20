import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PrivacySummary } from "@/components/copper/privacy-summary";
import { getPrivacySummary } from "@/lib/copper/catalog";

describe("PrivacySummary", () => {
  it("is the #privacy section", () => {
    const { container } = render(<PrivacySummary />);
    expect(container.querySelector('[data-testid="privacy-summary"]')?.id).toBe(
      "privacy",
    );
  });

  it("shows the policy year and every point from the catalog", () => {
    const { container } = render(<PrivacySummary />);
    const privacy = getPrivacySummary();
    expect(container).toHaveTextContent(`${privacy.policy} privacy policy`);
    const items = [...container.querySelectorAll("li")].map(
      (li) => li.textContent,
    );
    expect(items).toEqual(privacy.points);
  });

  it('never says Copper "never records"', () => {
    const { container } = render(<PrivacySummary />);
    expect(container.textContent).not.toMatch(/never\s+record/i);
  });
});
