import { useEffect, useRef } from "react";
import { useMediaQuery } from "../../lib/useMediaQuery.js";
import "./Backdrop.css";

/**
 * The page's blueprint-grid backdrop: a fixed layer behind all content, masked
 * to a horizon so the lower half of every screen stays flat, and drifting at a
 * fraction of the scroll rate. One per app, mounted in the page shell.
 */
export function Backdrop() {
  // The site-wide reduced-motion block in site.css only neutralises CSS
  // animation and transition durations — it cannot stop a value we write from
  // JS, so the listener has to be skipped here rather than overridden there.
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || still) return;

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
  }, [still]);

  return <div ref={ref} className="backdrop no-print" aria-hidden="true" />;
}
