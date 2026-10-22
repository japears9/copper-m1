import { Logo } from "@/components/copper/logo";

// Always Night Sky: the `dark` class gives the footer the dark-mode colors,
// so the Logo shows its Desert Sand wordmark in both themes.
export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="dark bg-background text-foreground border-t"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" aria-label="Back to top">
          <Logo className="w-40" />
        </a>
        <p className="text-muted-foreground text-sm">
          Fictional — for educational use.
        </p>
      </div>
    </footer>
  );
}
