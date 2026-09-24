import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";

export function Layout() {
  return (
    <>
      <header>
        <div className="brand-area">
          <img
            className="app-logo"
            src="/piggy-bank-logo.png"
            alt="Piggy Bank logo"
          />
          <div>
            <h1>Piggy Bank</h1>
            <p>Personal finance, clearly organized</p>
          </div>
        </div>

        <Nav />
      </header>

      <Outlet />

      <footer>
        <p>
          <strong>Piggy Bank</strong> · A clearer way to manage your money
        </p>
        <p>© 2026 Piggy Bank. Plan spending. Grow savings.</p>
      </footer>
    </>
  );
}
