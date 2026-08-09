import { NavLink } from "react-router-dom";
import "./NavBar.css";

/** Sticky top navigation: wordmark, section links, one primary action. */
export function NavBar({ brand = "Alec Stanley", items = [], action }) {
  return (
    <nav className="nav no-print" aria-label="Primary">
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
