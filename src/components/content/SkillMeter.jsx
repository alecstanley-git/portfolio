/** Segmented proficiency readout — deliberately coarse (5 segments), never a percentage. */
export function SkillMeter({ label, level = 3, max = 5, note, style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-4)" }}>
        <span style={{ font: "var(--weight-medium) var(--text-sm) / 1.2 var(--font-body)", color: "var(--text-primary)" }}>
          {label}
        </span>
        {note ? <span style={{ font: "var(--type-mono)", color: "var(--text-faint)" }}>{note}</span> : null}
      </div>
      <div style={{ display: "flex", gap: 3 }} role="img" aria-label={`${label}: ${level} of ${max}`}>
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: "var(--radius-xs)",
              background: i < level ? "var(--ignition-500)" : "var(--hull-700)",
              boxShadow: i < level ? "0 0 10px var(--ignition-tint-strong)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
