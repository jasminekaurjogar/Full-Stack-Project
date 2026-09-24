import { NavLink } from "react-router-dom";

export function Nav() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/goals">Savings</NavLink>
      <NavLink to="/expenses">Expenses</NavLink>
      <NavLink className="nav-button" to="/goals">
        Get Started
      </NavLink>
    </nav>
  );
}
