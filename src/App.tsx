import { SavingsGoals } from "./components/SavingsGoals/SavingsGoals";
import ExpenseCategories from "./components/ExpenseCategories/ExpenseCategories";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <img
          className="app-logo"
          src="/piggy-bank-logo.png"
          alt="Piggy Bank logo"
        />
        <div>
          <h1>Piggy Bank</h1>
          <p>A simple personal finance tracker for Sprint 1.</p>
        </div>
      </header>

      <main>
        <h2>Welcome to Piggy Bank</h2>
        <p>
          This app will help users organize expenses, savings goals, and money
          habits.
        </p>
        <SavingsGoals />
        <ExpenseCategories />
      </main>

      <footer>
        <p>Created by Sehajpreet Kaur and Jasmine Kaur</p>
      </footer>
    </>
  );
}

export default App;
