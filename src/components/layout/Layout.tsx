import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import "./Layout.css";

// Layout is rendered by the root route, so the header and footer stay on
// screen while Outlet swaps in whichever page the user navigated to
function Layout() {
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
            <p>A personal finance tracker</p>
          </div>
        </div>

        <Nav />
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
