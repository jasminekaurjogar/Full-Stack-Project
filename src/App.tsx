import { SavingsGoals } from "./components/SavingsGoals/SavingsGoals";

function App() {
  return (
    <>
      <header>
        <h1>Pink Piggy</h1>
        <p>A simple personal finance tracker for Sprint 1.</p>
      </header>

      <main>
        <h2>Welcome to Pink Piggy</h2>
        <p>
          This app will help users organize expenses, savings goals, and money
          habits.
        </p>
        <SavingsGoals />
      </main>

      <footer>
        <p>Created by Sehajpreet Kaur and Jasmine Kaur</p>
      </footer>
    </>
  );
}

export default App;
