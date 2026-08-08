import { Icon } from "../core/Icon.jsx";

/** Figure frame: renders an image when `src` is supplied, otherwise a labelled
 *  drop slot naming the file that belongs there. */
export function MediaFrame({ src, alt, caption, file, width, height = 320, imageHeight, style, ...rest }) {
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)", ...style }} {...rest}>
      {src ? (
        <img
          src={src}
          alt={alt || caption || ""}
          loading="lazy"
          /* Intrinsic size + `height: auto` reserves the right box before the
             image loads, so a page of figures doesn't jump as they arrive. */
          width={width}
          height={imageHeight}
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: width && imageHeight ? `${width} / ${imageHeight}` : undefined,
            display: "block",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--border-hairline)",
            filter: "saturate(0.9)",
          }}
        />
      ) : (
        <div
          className="slot"
          style={{
            height,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-2)",
            border: "1px dashed var(--border-line)",
            borderRadius: "var(--radius-card)",
            color: "var(--text-faint)",
            textAlign: "center",
            padding: "var(--space-4)",
          }}
        >
          <Icon name="image" size="lg" />
          <span style={{ font: "var(--type-label)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)" }}>
            Image slot
          </span>
          {file ? <span style={{ font: "var(--type-mono)", wordBreak: "break-all" }}>{file}</span> : null}
        </div>
      )}
      {caption ? (
        <figcaption style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", textAlign: "center" }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
