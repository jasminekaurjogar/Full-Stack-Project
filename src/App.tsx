import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import { SavingsGoals } from "./components/SavingsGoals/SavingsGoals";
import ExpenseCategories from "./components/ExpenseCategories/ExpenseCategories";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Layout sits on the root path so its header and footer show on every
          page, and each child route renders inside its Outlet */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="goals" element={<SavingsGoals />} />
        <Route path="expenses" element={<ExpenseCategories />} />
      </Route>
    </Routes>
  );
}

export default App;
