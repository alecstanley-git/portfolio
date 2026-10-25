import { Link } from "react-router-dom";
import { parseInline } from "../../lib/inline.js";

const PARA = { font: "var(--type-body)", color: "var(--text-body)" };

/** One line of copy with **bold**, *italic* and [links](…) as real elements —
 *  never injected HTML. Site paths become router links; anything else opens in
 *  a new tab. */
export function Inline({ text }) {
  return parseInline(text).map((t, i) => {
    if (t.type === "strong") return <strong key={i}>{t.text}</strong>;
    if (t.type === "em") return <em key={i}>{t.text}</em>;
    if (t.type === "link") {
      return t.href.startsWith("/") ? (
        <Link key={i} to={t.href}>
          {t.text}
        </Link>
      ) : (
        <a key={i} href={t.href} target="_blank" rel="noopener noreferrer">
          {t.text}
        </a>
      );
    }
    return t.text;
  });
}

/**
 * A project write-up. Each block is a string (paragraph), `{ heading }`,
 * `{ list, ordered? }` or `{ attachment }` — the last handed to
 * `renderAttachment(file)` so the page decides how a file row looks.
 */
export function RichBody({ blocks = [], renderAttachment }) {
  return (
    <div className="stack">
      {blocks.map((b, i) => {
        if (typeof b === "string") {
          return (
            <p key={i} style={PARA}>
              <Inline text={b} />
            </p>
          );
        }
        if (b.heading) {
          return (
            <h3 key={i} style={{ font: "var(--type-h3)", color: "var(--text-primary)", marginTop: "var(--space-2)" }}>
              <Inline text={b.heading} />
            </h3>
          );
        }
        if (b.list) {
          const List = b.ordered ? "ol" : "ul";
          return (
            <List key={i} className="prose-list" style={PARA}>
              {b.list.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </List>
          );
        }
        if (b.attachment) return <div key={i}>{renderAttachment?.(b.attachment)}</div>;
        return null;
      })}
    </div>
  );
}
