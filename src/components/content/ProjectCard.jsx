import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../layout/Card.jsx";
import { Tag } from "../core/Tag.jsx";
import { Badge } from "../core/Badge.jsx";
import { Icon } from "../core/Icon.jsx";

/** The portfolio's workhorse: one technical project, at a glance. Renders as a
 *  link so the whole card is keyboard-reachable, not a clickable div. */
export function ProjectCard({
  id,
  title,
  summary,
  discipline,
  year,
  status,
  tags = [],
  image,
  featured = false,
  to,
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Card
      as={Link}
      to={to}
      interactive
      accent={featured}
      padding="0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", color: "inherit", ...style }}
      {...rest}
    >
      <div
        className={image ? undefined : "slot"}
        style={{
          position: "relative",
          height: 168,
          backgroundColor: "var(--surface-inset)",
          /* Left to the `.slot` class when there is no image, so the blueprint
             grid still tiles — an inline `no-repeat` would show one lone cell. */
          ...(image
            ? {
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : null),
          borderBottom: "1px solid var(--border-hairline)",
          filter: hovered ? "saturate(1.05)" : "saturate(0.85)",
          transition: "filter var(--dur-base) var(--ease-standard)",
        }}
      >
        {/* The status badge carries its meaning in colour, which a bright photo
            destroys. A short scrim along the top edge keeps it legible over any
            cover without tinting the image itself. */}
        {status && image ? (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "0 0 auto 0",
              height: 72,
              /* Holds near-full strength behind the badge before falling away,
                 rather than fading from the very first pixel — the brightest
                 covers washed the badge out under a single-stop ramp. */
              background:
                "linear-gradient(to bottom, rgba(5, 7, 10, 0.92), rgba(5, 7, 10, 0.72) 46%, transparent)",
            }}
          />
        ) : null}
        {/* Positioned directly, with no wrapper: an absolutely-positioned span
            becomes a block, and its line box left the badge sitting 5px lower
            than its offset — 17px from the top against 12px from the right. */}
        {status ? (
          <Badge
            tone={status.tone}
            style={{ position: "absolute", top: "var(--space-3)", right: "var(--space-3)" }}
          >
            {status.label}
          </Badge>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
          padding: "var(--space-5)",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "var(--space-3)",
            font: "var(--type-mono)",
            letterSpacing: "var(--tracking-wide)",
            color: "var(--text-faint)",
            textTransform: "uppercase",
          }}
        >
          {id ? <span style={{ color: "var(--ignition-500)" }}>{id}</span> : null}
          {discipline ? <span>{discipline}</span> : null}
          {year ? <span style={{ marginLeft: "auto" }}>{year}</span> : null}
        </div>
        <h3
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "var(--space-2)",
            font: "var(--type-h3)",
            color: hovered ? "var(--ignition-400)" : "var(--text-primary)",
            margin: 0,
            transition: "color var(--dur-fast) var(--ease-standard)",
          }}
        >
          {title}
          <Icon
            name="arrow-up-right"
            size="sm"
            style={{
              marginTop: 4,
              opacity: hovered ? 1 : 0.35,
              transform: hovered ? "translate(2px,-2px)" : "none",
              transition: "all var(--dur-fast) var(--ease-standard)",
            }}
          />
        </h3>
        <p style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", margin: 0 }}>{summary}</p>
        {tags.length ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-2)",
              marginTop: "auto",
              paddingTop: "var(--space-1)",
            }}
          >
            {tags.map((t) => (
              <Tag key={t} size="sm">
                {t}
              </Tag>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
