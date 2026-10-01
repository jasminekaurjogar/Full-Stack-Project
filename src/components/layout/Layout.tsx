import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

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
      <Footer />
    </>
  );
}
