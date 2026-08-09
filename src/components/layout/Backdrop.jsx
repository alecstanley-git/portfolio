import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from "../../lib/useMediaQuery.js";
import "./Backdrop.css";

/* TRIAL — this layer diverges from the design system's Backgrounds rule, which
   holds that every page surface is a flat token colour and that the blueprint
   grid is for bounded technical panels, never the page. It is on its own branch
   so the treatments can be judged live. If one is adopted, the system's readme
   has to be updated to record the exception; until then the rule stands and
   this code does not belong on main. */

const VARIANTS = ["grid", "rules", "scanline"];

/** Which treatment renders when the URL says nothing. Override with ?bg=. */
const DEFAULT_VARIANT = "grid";

export function Backdrop() {
  const [params] = useSearchParams();
  const requested = params.get("bg");
  const variant = requested === "off" ? null : VARIANTS.includes(requested) ? requested : DEFAULT_VARIANT;

  // The site-wide reduced-motion block in site.css only neutralises CSS
  // animation and transition durations — it cannot stop a value we write from
  // JS, so the listener has to be skipped here rather than overridden there.
  const still = useMediaQuery("(prefers-reduced-motion: reduce)");
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !variant || still) return;

    let frame = 0;
    const write = () => {
      frame = 0;
      const y = window.scrollY;
      const travel = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty("--scroll-y", `${y}px`);
      el.style.setProperty("--scroll-progress", travel > 0 ? String(Math.min(y / travel, 1)) : "0");
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
  }, [variant, still]);

  if (!variant) return null;

  return <div ref={ref} className={`backdrop backdrop--${variant} no-print`} aria-hidden="true" />;
}
