import { useState } from "react";
import type { ExpenseCategory } from "../../types/ExpenseCategory";
import type { SavedThisMonthProps } from "../../types/savedThisMonth";
import {
  checkCategoryFields,
  getShareOfPlan,
  getTotalBudget,
} from "../../services/expenseCategoryService";
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
  // Only one row is open for editing at a time.
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editBudget, setEditBudget] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editError, setEditError] = useState("");

  // Keep every category except the one whose Remove button was clicked
  function removeCategory(idToRemove: number) {
    const remaining = categories.filter((category) => category.id !== idToRemove);
    setCategories(remaining);
    if (editingId === idToRemove) {
      setEditingId(null);
      setEditError("");
    }
  }

  // Fill the boxes with this category so the user can change the whole row
  function startEdit(category: ExpenseCategory) {
    setEditingId(category.id);
    setEditName(category.name);
    setEditBudget(String(category.budget));
    setEditDescription(category.description);
    setEditError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditError("");
  }

  // Save the name, budget, and description for the row that is open.
  // The service checks the fields. This function only updates the list on the page.
  function saveEdit(idToUpdate: number) {
    const budgetNumber = Number(editBudget);
    const errorMessage = checkCategoryFields(
      editName,
      budgetNumber,
      categories,
      idToUpdate,
    );

    if (errorMessage !== "") {
      setEditError(errorMessage);
      return;
    }

    const updated = categories.map((category) => {
      if (category.id !== idToUpdate) {
        return category;
      }
      return {
        ...category,
        name: editName.trim(),
        budget: budgetNumber,
        description: editDescription.trim() || "No description yet.",
      };
    });

    setCategories(updated);
    setEditingId(null);
    setEditError("");
  }

  // The service adds the budgets and figures each row's share of the plan.
  const totalBudget = getTotalBudget(categories);

  return (
    <section className="ExpenseCategories" id="expenses">
      <div className="ExpenseCategories-heading">
        <p className="ExpenseCategories-kicker">Monthly spending plan</p>
        <h2>Expense Categories</h2>
        <p>Set a monthly budget for each type of spending.</p>
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
              const share = getShareOfPlan(category.budget, totalBudget);

              const isEditing = editingId === category.id;

              return (
                <tr key={category.id}>
                  <td>
                    <div className="ExpenseCategories-name">
                      <img src={category.image} alt="" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editName}
                          aria-label="Category name"
                          onChange={(event) => setEditName(event.target.value)}
                        />
                      ) : (
                        <span>{category.name}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editDescription}
                        aria-label="What it covers"
                        onChange={(event) => setEditDescription(event.target.value)}
                      />
                    ) : (
                      category.description
                    )}
                  </td>
                  <td className="ExpenseCategories-budget">
                    {isEditing ? (
                      <input
                        type="number"
                        min="1"
                        value={editBudget}
                        aria-label="Budget"
                        onChange={(event) => setEditBudget(event.target.value)}
                      />
                    ) : (
                      "$" + category.budget
                    )}
                  </td>
                  <td>{share}% of the plan</td>
                  <td>
                    {isEditing ? (
                      <div className="ExpenseCategories-actions">
                        <Button type="button" onClick={() => saveEdit(category.id)}>
                          Save
                        </Button>
                        <Button type="button" variant="secondary" onClick={cancelEdit}>
                          Cancel
                        </Button>
                        {editError !== "" && (
                          <p className="ExpenseCategories-error">{editError}</p>
                        )}
                      </div>
                    ) : (
                      <div className="ExpenseCategories-actions">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => startEdit(category)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => removeCategory(category.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
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
