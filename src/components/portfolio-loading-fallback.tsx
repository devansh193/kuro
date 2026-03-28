/** Minimal loading shell — no portfolio copy. */
export function PortfolioLoadingFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
    </div>
  );
}
