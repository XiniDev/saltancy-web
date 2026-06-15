export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 opacity-[0.05] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-overlay"
      style={{ backgroundImage: "var(--texture-grain)", backgroundSize: "180px 180px" }}
    />
  );
}
