import React from "react";

const SIZES = { sm: 14, md: 16, lg: 20, xl: 24 };
const CACHE = (window.__lucideCache = window.__lucideCache || {});

function load(name) {
  if (!CACHE[name]) {
    CACHE[name] = fetch(`https://unpkg.com/lucide-static@0.363.0/icons/${name}.svg`)
      .then((r) => (r.ok ? r.text() : ""))
      .catch(() => "");
  }
  return CACHE[name];
}

/** Lucide glyph inlined as SVG so it inherits currentColor. */
export function Icon({ name, size = "md", color = "currentColor", style, ...rest }) {
  const px = typeof size === "number" ? size : SIZES[size] || SIZES.md;
  const [markup, setMarkup] = React.useState("");
  React.useEffect(() => {
    let live = true;
    load(name).then((svg) => {
      if (!live || !svg) return;
      setMarkup(
        svg
          .replace(/<\?xml[^>]*\?>/g, "")
          .replace(/width="[^"]*"/, `width="${px}"`)
          .replace(/height="[^"]*"/, `height="${px}"`)
          .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
      );
    });
    return () => { live = false; };
  }, [name, px]);
  return (
    <span
      aria-hidden="true"
      data-icon={name}
      dangerouslySetInnerHTML={{ __html: markup }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: px,
        height: px,
        flex: "0 0 auto",
        color,
        ...style,
      }}
      {...rest}
    />
  );
}
