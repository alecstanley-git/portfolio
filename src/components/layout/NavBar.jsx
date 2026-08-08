import { NavLink } from "react-router-dom";
import "./NavBar.css";

/** Sticky top navigation: wordmark, section links, one primary action. */
export function NavBar({ brand = "Alec Stanley", items = [], action }) {
  return (
    <nav className="nav no-print" aria-label="Primary">
      <NavLink to="/" className="nav__brand">
        {brand}
      </NavLink>
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
      <div className="nav__action">{action}</div>
    </nav>
  );
}
