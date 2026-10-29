import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/pages/Home";
import { SavingsGoals } from "./components/SavingsGoals/SavingsGoals";
import ExpenseCategories from "./components/ExpenseCategories/ExpenseCategories";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="goals"
          element={
            <main>
              <SavingsGoals />
            </main>
          }
        />
        <Route
          path="expenses"
          element={
            <main>
              <ExpenseCategories />
            </main>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
