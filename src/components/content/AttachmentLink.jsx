import React from "react";
import { Icon } from "../core/Icon.jsx";

const ICONS = { pdf: "file-text", zip: "file-archive", docx: "file-type", default: "paperclip" };

/** Row-style link to a report, certificate or code bundle. Renders a dashed,
 *  non-interactive row stamped FILE PENDING until `href` is supplied. */
export function AttachmentLink({ label, file, href, style, ...rest }) {
  const [hovered, setHovered] = React.useState(false);
  const ext = (file || "").split(".").pop().toLowerCase();
  const missing = !href;
  const Tag = missing ? "div" : "a";
  return (
    <Tag
      href={href || undefined}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-4)",
        borderRadius: "var(--radius-control)",
        border: `1px ${missing ? "dashed" : "solid"} ${hovered && !missing ? "var(--border-strong)" : "var(--border-line)"}`,
        background: hovered && !missing ? "var(--hull-800)" : "var(--surface-inset)",
        color: missing ? "var(--text-faint)" : hovered ? "var(--ignition-400)" : "var(--text-body)",
        textDecoration: "none",
        cursor: missing ? "default" : "pointer",
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
      {missing ? null : <Icon name="arrow-up-right" size="sm" />}
    </Tag>
  );
}
