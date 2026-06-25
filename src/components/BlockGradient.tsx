export function BlockGradient() {
  return (
    <div
      className="block-gradient-animate flex h-2 w-full max-w-md overflow-hidden rounded-[var(--radius-soft)]"
      aria-hidden
    >
      <div className="h-full flex-1 bg-gpt-green" />
      <div className="h-full flex-1 bg-ink" />
      <div className="h-full flex-1 bg-gpt-green-muted" />
      <div className="h-full flex-1 bg-gpt-green-dark" />
      <div className="h-full flex-1 bg-ink" />
      <div className="h-full flex-1 bg-gpt-green" />
    </div>
  );
}
