/** Big display figure with a label — years, counts, measurements. */
export function StatBlock({ value, label, unit, tone = "default", style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }} {...rest}>
      <span
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: 4,
          font: "var(--weight-bold) var(--text-3xl) / 1 var(--font-display)",
          color: tone === "accent" ? "var(--ignition-500)" : "var(--text-primary)",
          letterSpacing: "var(--tracking-tight)",
        }}
      >
        {value}
        {unit ? (
          <span style={{ font: "var(--weight-medium) var(--text-md) / 1 var(--font-mono)", color: "var(--text-faint)" }}>
            {unit}
          </span>
        ) : null}
      </span>
      <span
        style={{
          font: "var(--type-label)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-caps)",
          color: "var(--text-faint)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
