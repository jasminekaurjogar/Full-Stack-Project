import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import { SavingsGoals } from "./components/SavingsGoals/SavingsGoals";
import ExpenseCategories from "./components/ExpenseCategories/ExpenseCategories";
import "./App.css";

function App() {
  // Lifted state: one number shared by Home, Goals, and Expenses
  const [savedThisMonth, setSavedThisMonth] = useState(325);

  return (
    <Routes>
      {/* Layout sits on the root path so its header and footer show on every
          page, and each child route renders inside its Outlet */}
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Home
              savedThisMonth={savedThisMonth}
              setSavedThisMonth={setSavedThisMonth}
            />
          }
        />
        <Route
          path="goals"
          element={
            <SavingsGoals
              savedThisMonth={savedThisMonth}
              setSavedThisMonth={setSavedThisMonth}
            />
          }
        />
        <Route
          path="expenses"
          element={
            <ExpenseCategories
              savedThisMonth={savedThisMonth}
              setSavedThisMonth={setSavedThisMonth}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
