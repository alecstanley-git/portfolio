import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

/** Fixed top navigation: wordmark, section links, one primary action. */
export function NavBar({ brand = "Alec Stanley", items = [], action }) {
  const ref = useRef(null);

  /* The bar is fixed, so the page has to reserve its height itself. It wraps to
     two rows below 720px, so that height is not a constant — publish the
     measured value and let the layout read it. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const publish = () => {
      document.documentElement.style.setProperty("--nav-h", `${el.offsetHeight}px`);
    };

    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <nav ref={ref} className="nav no-print" aria-label="Primary">
      {/* Brand and action sit in equal-width flex tracks so the link list is
          centred on the viewport, not on the space left between them. */}
      <div className="nav__side">
        <NavLink to="/" className="nav__brand">
          {brand}
        </NavLink>
      </div>
      <ul className="nav__links">
        {items.map((it) => (
          <li key={it.to}>
            <NavLink
              to={it.to}
              end={it.end}
              className={({ isActive }) => (isActive ? "nav__link is-active" : "nav__link")}
            >
              {it.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="nav__side nav__side--end nav__action">{action}</div>
    </nav>
  );
}
