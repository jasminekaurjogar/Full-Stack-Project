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
            <p>A personal finance tracker</p>
          </div>
        </div>

        <nav>
          <a href="#features">Features</a>
          <a href="#goals">Goals</a>
          <a href="#expenses">Expenses</a>
          <button>Get Started</button>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-label">Simple money planning</p>
            <h2>Build better money habits without feeling overwhelmed.</h2>
            <p>
              Piggy Bank helps students organize spending, savings goals, and
              everyday money habits in one friendly place.
            </p>
            <div className="hero-buttons">
              <button>Start Planning</button>
              <button className="secondary-button">View Features</button>
            </div>
          </div>

          <div className="hero-preview">
            <h3>Monthly Snapshot</h3>
            <p>Saved this month</p>
            <strong>$325</strong>
            <p>Top category</p>
            <strong>Food</strong>
          </div>
        </section>

        <section className="feature-grid" id="features">
          <article className="feature-card">
            <h3>Track Expenses</h3>
            <p>Keep common spending categories organized and easy to read.</p>
          </article>

          <article className="feature-card">
            <h3>Plan Savings</h3>
            <p>Set simple goals for future purchases and emergency money.</p>
          </article>

          <article className="feature-card">
            <h3>Build Habits</h3>
            <p>Use small notes to remember better money choices each month.</p>
          </article>
        </section>

        <section className="money-notes">
          <h2>Money Notes</h2>
          <p>
            Start with small goals, review spending often, and save a little at
            a time.
          </p>
        </section>

        <section className="dashboard-preview">
          <div>
            <p className="hero-label">Dashboard idea</p>
            <h2>Your money at a glance</h2>
            <p>
              Future users could sign in and see their personal spending,
              savings, and monthly progress.
            </p>
          </div>
          <div className="dashboard-card">
            <p>Budget Progress</p>
            <div className="progress-bar">
              <span></span>
            </div>
            <p>65% of monthly budget used</p>
          </div>
        </section>

        <SavingsGoals />
        <ExpenseCategories />
      </main>

      <footer>
        <p>Created by Sehajpreet Kaur and Jasmine Kaur</p>
        <p>Track expenses, plan savings, and build better habits.</p>
      </footer>
    </>
  );
}

export default App;
