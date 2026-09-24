import { SavingsGoals } from "./components/SavingsGoals/SavingsGoals";
import ExpenseCategories from "./components/ExpenseCategories/ExpenseCategories";
import "./App.css";

function App() {
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

        <nav>
          <a href="#features">Features</a>
          <a href="#goals">Goals</a>
          <a href="#expenses">Expenses</a>
          <a className="nav-button" href="#goals">
            Get Started
          </a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-label">Finance made clear</p>
            <h2>Know where your money goes. Watch your savings grow.</h2>
            <p>
              Piggy Bank brings your spending, budgets, and savings goals into
              one calm place so you can make better decisions each month.
            </p>
            <div className="hero-buttons">
              <a className="nav-button" href="#goals">
                View savings
              </a>
              <a className="secondary-button" href="#expenses">
                View expenses
              </a>
            </div>
          </div>

          <div className="hero-preview">
            <p className="hero-label">This month</p>
            <h3>Monthly overview</h3>
            <div className="snapshot-row">
              <span>Saved</span>
              <strong>$325</strong>
            </div>
            <div className="snapshot-row">
              <span>Spent</span>
              <strong>$600</strong>
            </div>
            <div className="snapshot-row">
              <span>Left to spend</span>
              <strong>$200</strong>
            </div>
          </div>
        </section>

        <section className="feature-grid" id="features">
          <article className="feature-card">
            <p className="hero-label">01</p>
            <h3>Track expenses</h3>
            <p>Organize monthly spending into clear, easy-to-read categories.</p>
          </article>

          <article className="feature-card">
            <p className="hero-label">02</p>
            <h3>Plan savings</h3>
            <p>Set targets for the things that matter and track progress over time.</p>
          </article>

          <article className="feature-card">
            <p className="hero-label">03</p>
            <h3>Stay on budget</h3>
            <p>See remaining budget and savings progress before you spend more.</p>
          </article>
        </section>

        <section className="dashboard-preview">
          <div>
            <p className="hero-label">Overview</p>
            <h2>This month at a glance</h2>
            <p>
              65% of the monthly budget has been used. There is still room to
              move money toward your emergency fund.
            </p>
          </div>
          <div className="dashboard-card">
            <p>Budget used</p>
            <div className="progress-bar">
              <span></span>
            </div>
            <p>$600 of $925 spent</p>
          </div>
        </section>

        <SavingsGoals />
        <ExpenseCategories />
      </main>

      <footer>
        <p>
          <strong>Piggy Bank</strong> · A clearer way to manage your money
        </p>
        <p>© 2026 Piggy Bank. Plan spending. Grow savings.</p>
      </footer>
    </>
  );
}

export default App;
