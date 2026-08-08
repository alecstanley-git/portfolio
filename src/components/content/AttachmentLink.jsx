import React from "react";
import { Icon } from "../core/Icon.jsx";

const ICONS = { pdf: "file-text", zip: "file-archive", docx: "file-type", default: "paperclip" };

/**
 * Row for a report, certificate or code bundle. Three states:
 *   - no `href`      → dashed, non-interactive, stamped FILE PENDING
 *   - `href`         → a link that opens the file in a new tab
 *   - `expandable`   → a disclosure button; `PdfEmbed` uses this to reveal an
 *                      inline viewer below the row
 */
export function AttachmentLink({
  label,
  file,
  href,
  expandable = false,
  expanded = false,
  onToggle,
  controls,
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const ext = (file || "").split(".").pop().toLowerCase();
  const missing = !href;
  const Tag = expandable ? "button" : missing ? "div" : "a";
  const live = !missing;

  return (
    <Tag
      type={expandable ? "button" : undefined}
      onClick={expandable ? onToggle : undefined}
      aria-expanded={expandable ? expanded : undefined}
      aria-controls={expandable ? controls : undefined}
      href={expandable || missing ? undefined : href}
      target={expandable || missing ? undefined : "_blank"}
      rel={expandable || missing ? undefined : "noopener noreferrer"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        width: "100%",
        textAlign: "left",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-4)",
        borderRadius: expanded
          ? "var(--radius-control) var(--radius-control) 0 0"
          : "var(--radius-control)",
        border: `1px ${missing ? "dashed" : "solid"} ${hovered && live ? "var(--border-strong)" : "var(--border-line)"}`,
        borderBottomWidth: expanded ? 0 : 1,
        background: hovered && live ? "var(--hull-800)" : "var(--surface-inset)",
        color: missing ? "var(--text-faint)" : hovered || expanded ? "var(--ignition-400)" : "var(--text-body)",
        textDecoration: "none",
        cursor: live ? "pointer" : "default",
        transition: "var(--transition-control)",
        ...style,
      }}
      {...rest}
    >
      <Icon
        name={ICONS[ext] || ICONS.default}
        size="md"
        color={missing ? "var(--text-faint)" : "var(--ignition-500)"}
      />
      <span style={{ font: "var(--weight-medium) var(--text-sm) / 1.3 var(--font-display)", flex: 1 }}>{label}</span>
      <span
        style={{
          font: "var(--type-mono)",
          color: "var(--text-faint)",
          letterSpacing: "var(--tracking-wide)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {missing ? "File pending" : ext}
      </span>
      {missing ? null : (
        <Icon
          name={expandable ? "chevron-down" : "arrow-up-right"}
          size="sm"
          style={
            expandable
              ? {
                  transform: expanded ? "rotate(180deg)" : "none",
                  transition: "transform var(--dur-fast) var(--ease-standard)",
                }
              : undefined
          }
        />
      )}
    </Tag>
  );
}
