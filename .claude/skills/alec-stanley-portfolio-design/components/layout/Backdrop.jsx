import React from "react";

/* The page's blueprint grid. The only thing permitted behind page content —
   see the Backgrounds rule in readme.md for the full specification. */

/** How fast the grid creeps relative to the page. */
const DRIFT = 0.15;

/** Full at the top of the screen, gone before the bottom. */
const HORIZON = "linear-gradient(180deg, #000 0%, #000 18%, transparent 78%)";

/** Fixed grid layer behind all content. One per app, mounted in the page shell. */
export function Backdrop({ drift = DRIFT, style, ...rest }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The drift is written from JS, so a CSS reduced-motion block cannot stop
    // it — the listener has to be skipped here instead.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const write = () => {
      frame = 0;
      el.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };
    // Coalesce to one write per frame; the listener itself must never do layout.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="no-print"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        // At z-index 0 a positioned layer paints ABOVE non-positioned block
        // content, which would put the grid over the page text.
        zIndex: -1,
        pointerEvents: "none",
        "--scroll-y": "0px",
        backgroundImage: "var(--bg-grid-image)",
        backgroundSize: "var(--grid-size) var(--grid-size)",
        // A position shift rather than a transform, so the pattern tiles
        // forever and no edge is exposed however long the page runs.
        backgroundPosition: `0 calc(var(--scroll-y) * -${drift})`,
        WebkitMaskImage: HORIZON,
        maskImage: HORIZON,
        ...style,
      }}
      {...rest}
    />
  );
}
