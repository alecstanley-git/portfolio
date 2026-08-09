import { Icon } from "../core/Icon.jsx";
import { IconButton } from "../core/IconButton.jsx";

/** Page footer: contact line, social row, build stamp. */
export function Footer({
  email,
  location = "Melbourne, VIC",
  links = [],
  note,
  onCopyEmail,
  emailCopied = false,
  style,
  ...rest
}) {
  return (
    <footer
      className="no-print"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-6)",
        padding: "var(--space-10) var(--gutter-lg)",
        borderTop: "1px solid var(--border-hairline)",
        background: "var(--surface-panel)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <button
          type="button"
          className="copy-email"
          onClick={onCopyEmail}
          title={emailCopied ? "Copied" : "Copy email address"}
          style={{
            font: "var(--weight-semibold) var(--text-lg) / 1.2 var(--font-display)",
            wordBreak: "break-all",
          }}
        >
          {email}
          <Icon name={emailCopied ? "check" : "copy"} size="sm" />
        </button>
        <span style={{ font: "var(--type-mono)", color: "var(--text-faint)", letterSpacing: "var(--tracking-wide)" }}>
          {location}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
        {/* An entry is either a link (href) or an in-page action (onClick). */}
        {links.map((l) => (
          <IconButton
            key={l.label}
            as={l.href ? "a" : "button"}
            href={l.href}
            target={l.href?.startsWith("http") ? "_blank" : undefined}
            rel={l.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            onClick={l.onClick}
            icon={l.icon}
            label={l.label}
            variant="ghost"
          />
        ))}
      </div>
      {note ? <span style={{ font: "var(--type-mono)", color: "var(--text-faint)", width: "100%" }}>{note}</span> : null}
    </footer>
  );
}
