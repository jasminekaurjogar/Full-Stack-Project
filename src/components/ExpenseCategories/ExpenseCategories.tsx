import { useState } from "react";
import type { ExpenseCategory } from "../../types/ExpenseCategory";
import type { SavedThisMonthProps } from "../../types/savedThisMonth";
import Button from "../Button/Button";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";
import SavedThisMonthBox from "../SavedThisMonthBox/SavedThisMonthBox";
import "./ExpenseCategories.css";

// Starting list. useState copies this into state so the user can change it later.
const startingCategories: ExpenseCategory[] = [
    {
      id: 1,
      name: "Food",
      budget: 250,
      description: "Groceries, coffee, and eating out with friends.",
      image: "/expenses/food.png",
    },
    {
      id: 2,
      name: "Transportation",
      budget: 100,
      description: "Bus passes, gas money, and rides to campus.",
      image: "/expenses/transportation.png",
    },
    {
      id: 3,
      name: "School Supplies",
      budget: 150,
      description: "Textbooks, notebooks, and other class materials.",
      image: "/expenses/school-supplies.png",
    },
    {
      id: 4,
      name: "Entertainment",
      budget: 75,
      description: "Movies, games, and weekend plans.",
      image: "/expenses/entertainment.png",
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
      <div className="ExpenseCategories-heading">
        <p className="ExpenseCategories-kicker">Monthly spending plan</p>
        <h2>Expense Categories</h2>
        <p>
          Each row is one place money goes this month. The bar shows that
          row&apos;s share of the whole plan.
        </p>
      </div>

      <div className="ExpenseCategories-stats">
        <div>
          <span>Categories</span>
          <strong>{categories.length}</strong>
        </div>
        <div>
          <span>Planned this month</span>
          <strong>${totalBudget}</strong>
        </div>
        <div className="ExpenseCategories-saved">
          <SavedThisMonthBox
            savedThisMonth={savedThisMonth}
            setSavedThisMonth={setSavedThisMonth}
          />
        </div>
      </div>

      <AddCategoryForm
        categories={categories}
        setCategories={setCategories}
      />

      <div className="ExpenseCategories-tableWrap">
        <table className="ExpenseCategories-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>What it covers</th>
              <th>Budget</th>
              <th>Share of plan</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr>
                <td className="ExpenseCategories-empty" colSpan={5}>
                  No categories yet. Use the row above to add one.
                </td>
              </tr>
            )}
            {categories.map((category) => {
              let share = 0;
              if (totalBudget > 0) {
                share = Math.round((category.budget / totalBudget) * 100);
              }

              return (
                <tr key={category.id}>
                  <td>
                    <div className="ExpenseCategories-name">
                      <img
                        src={category.image}
                        alt=""
                      />
                      <span>{category.name}</span>
                    </div>
                  </td>
                  <td>{category.description}</td>
                  <td className="ExpenseCategories-budget">
                    ${category.budget}
                  </td>
                  <td>
                    <div className="ExpenseCategories-share">
                      <span style={{ width: share + "%" }}></span>
                    </div>
                    <small>{share}%</small>
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => removeCategory(category.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExpenseCategories;
