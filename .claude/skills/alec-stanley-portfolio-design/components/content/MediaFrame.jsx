import React from "react";
import { Icon } from "../core/Icon.jsx";

/** Figure frame: renders an image when `src` is supplied, otherwise a labelled drop slot. */
export function MediaFrame({ src, alt, caption, file, height = 320, style, ...rest }) {
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)", ...style }} {...rest}>
      {src ? (
        <img src={src} alt={alt || caption || ""} style={{ width: "100%", display: "block", borderRadius: "var(--radius-card)", border: "1px solid var(--border-hairline)", filter: "saturate(0.9)" }} />
      ) : (
        <div style={{ height, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "var(--space-2)", background: "var(--surface-inset)", border: "1px dashed var(--border-line)", borderRadius: "var(--radius-card)", color: "var(--text-faint)" }}>
          <Icon name="image" size="lg" />
          <span style={{ font: "var(--type-label)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)" }}>Image slot</span>
          {file ? <span style={{ font: "var(--type-mono)" }}>{file}</span> : null}
        </div>
      )}
      {caption ? (
        <figcaption style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", textAlign: "center" }}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
