import { NavLink } from "react-router-dom";

// One entry per page so the same links show in the header on every page
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/goals", label: "Savings Goals" },
  { to: "/expenses", label: "Expense Categories" },
];

function Nav() {
  return (
    <nav>
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end
          // NavLink tells us whether its route is the one being viewed,
          // so the current page can be highlighted
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Nav;
