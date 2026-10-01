import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/pages/Home";
import { SavingsGoals } from "./components/SavingsGoals/SavingsGoals";
import ExpenseCategories from "./components/ExpenseCategories/ExpenseCategories";
import "./App.css";

function App() {
  // Shared value for both feature pages. Changing it on one page
  // should still show the same number after you open the other page.
  const [savedThisMonth, setSavedThisMonth] = useState(325);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home savedThisMonth={savedThisMonth} />} />
        <Route
          path="goals"
          element={
            <main>
              <SavingsGoals
                savedThisMonth={savedThisMonth}
                setSavedThisMonth={setSavedThisMonth}
              />
            </main>
          }
        />
        <Route
          path="expenses"
          element={
            <main>
              <ExpenseCategories
                savedThisMonth={savedThisMonth}
                setSavedThisMonth={setSavedThisMonth}
              />
            </main>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
