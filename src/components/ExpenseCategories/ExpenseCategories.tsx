import type { SavedThisMonthProps } from "../../types/savedThisMonth";
import { useExpenseCategories } from "../../hooks/useExpenseCategories";
import Button from "../Button/Button";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";
import SavedThisMonthBox from "../SavedThisMonthBox/SavedThisMonthBox";
import "./ExpenseCategories.css";

// ExpenseCategories is the feature page for /expenses.
// It calls useExpenseCategories for the rows, the edit boxes, and the buttons.
// The hook asks the expense service to save and remove. The service checks
// the rules, then calls the repository, which reads the test data.
// AddCategoryForm calls this same hook when the user adds a row.
// This component only decides what to show on the screen.
function ExpenseCategories({
  savedThisMonth,
  setSavedThisMonth,
}: SavedThisMonthProps) {
  const {
    categories,
    totalBudget,
    shareOfPlan,
    editingId,
    editName,
    editBudget,
    editDescription,
    setEditName,
    setEditBudget,
    setEditDescription,
    editError,
    startEdit,
    cancelEdit,
    saveEdit,
    deleteCategory,
  } = useExpenseCategories();

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

      <AddCategoryForm />

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
                  <td>{shareOfPlan(category.budget)}% of the plan</td>
                  <td>
                    {isEditing ? (
                      <div className="ExpenseCategories-actions">
                        <Button type="button" onClick={saveEdit}>
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
                          onClick={() => deleteCategory(category.id)}
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
