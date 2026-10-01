import { useState } from "react";
import type { SavedThisMonthProps } from "../../types/savedThisMonth";
import Button from "../Button/Button";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";
import SavedThisMonthBox from "../SavedThisMonthBox/SavedThisMonthBox";
import "./ExpenseCategories.css";

// Interface to define the data structure for each expense category
export interface ExpenseCategory {
  id: number;
  name: string;
  budget: number;
  description: string;
}

// Starting list. useState copies this into state so the user can change it later.
const startingCategories: ExpenseCategory[] = [
    {
      id: 1,
      name: "Food",
      budget: 250,
      description: "Groceries, coffee, and eating out with friends.",
    },
    {
      id: 2,
      name: "Transportation",
      budget: 100,
      description: "Bus passes, gas money, and rides to campus.",
    },
    {
      id: 3,
      name: "School Supplies",
      budget: 150,
      description: "Textbooks, notebooks, and other class materials.",
    },
    {
      id: 4,
      name: "Entertainment",
      budget: 75,
      description: "Movies, games, and weekend plans.",
    },
];

// ExpenseCategories is the Feature Page for /expenses
function ExpenseCategories({
  savedThisMonth,
  setSavedThisMonth,
}: SavedThisMonthProps) {
  // categories is the current list. setCategories updates the page right away.
  const [categories, setCategories] = useState(startingCategories);

  // Keep every category except the one whose Remove button was clicked
  function removeCategory(idToRemove: number) {
    const remaining = categories.filter((category) => category.id !== idToRemove);
    setCategories(remaining);
  }

  // Add up every category budget to show the total monthly spending plan
  let totalBudget = 0;
  for (const category of categories) {
    totalBudget = totalBudget + category.budget;
  }

  return (
    <section className="ExpenseCategories" id="expenses">
      <h2>Expense Categories</h2>
      <p>
        Track your student budget across different daily spending categories to
        stay on top of your finances.
      </p>
      <p className="ExpenseCategories-summary">
        You are tracking {categories.length} categories with a total monthly
        budget of ${totalBudget}. After expenses, ${savedThisMonth} is still
        marked as saved this month.
      </p>

      <SavedThisMonthBox
        savedThisMonth={savedThisMonth}
        setSavedThisMonth={setSavedThisMonth}
      />

      <AddCategoryForm
        categories={categories}
        setCategories={setCategories}
      />

      {categories.length === 0 && (
        <p className="ExpenseCategories-empty">
          No categories yet. Use the form above to add one.
        </p>
      )}

      {/* Loop through the array and build one list item for each category */}
      <ul className="ExpenseCategories-list">
        {categories.map((category) => (
          <li className="ExpenseCategories-card" key={category.id}>
            <h3>{category.name}</h3>
            <p className="ExpenseCategories-budget">${category.budget} / month</p>
            <p>{category.description}</p>
            <Button
              variant="secondary"
              onClick={() => removeCategory(category.id)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ExpenseCategories;
