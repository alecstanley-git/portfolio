import { Icon } from "../core/Icon.jsx";

function youtubeId(url) {
  if (!url) return null;
  const m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{6,})/);
  return m ? m[1] : /^[\w-]{6,}$/.test(url) ? url : null;
}

/** Video block — YouTube embed when `youtube` is set, otherwise a labelled
 *  placeholder. `aspect` defaults to 16:9; the matplotlib animations here are
 *  4:3 and would otherwise sit pillarboxed inside black bars. */
export function VideoEmbed({ youtube, caption, source, aspect = "16 / 9", style, ...rest }) {
  const id = youtubeId(youtube);
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)", ...style }} {...rest}>
      <div
        className={id ? undefined : "slot"}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: aspect,
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
          border: id ? "1px solid var(--border-hairline)" : "1px dashed var(--border-line)",
          backgroundColor: "var(--surface-inset)",
        }}
      >
        {id ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title={caption || "Video"}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-2)",
              color: "var(--text-faint)",
              textAlign: "center",
              padding: "var(--space-4)",
            }}
          >
            <Icon name="youtube" size="xl" color="var(--ignition-500)" />
            <span
              style={{ font: "var(--type-label)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)" }}
            >
              Video slot
            </span>
            {source ? <span style={{ font: "var(--type-mono)", wordBreak: "break-all" }}>{source}</span> : null}
          </div>
        )}
      </div>
      {caption ? (
        <figcaption style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", textAlign: "center" }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
