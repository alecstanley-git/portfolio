const TONES = {
  ok: { fg: "var(--state-ok)", bg: "var(--state-ok-tint)" },
  warn: { fg: "var(--state-warn)", bg: "var(--state-warn-tint)" },
  fail: { fg: "var(--state-fail)", bg: "var(--state-fail-tint)" },
  idle: { fg: "var(--text-faint)", bg: "var(--hull-800)" },
  accent: { fg: "var(--ignition-500)", bg: "var(--ignition-tint)" },
};

/** Uppercase status marker with an optional signal dot. */
export function Badge({ children, tone = "idle", dot = true, style, ...rest }) {
  const t = TONES[tone] || TONES.idle;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 22,
        padding: "0 8px",
        borderRadius: "var(--radius-pill)",
        background: t.bg,
        color: t.fg,
        font: "var(--type-label)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-caps)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {dot ? (
        <span
          style={{ width: 6, height: 6, borderRadius: "50%", background: t.fg, boxShadow: `0 0 8px ${t.fg}` }}
        />
      ) : null}
      {children}
    </span>
  );
}
