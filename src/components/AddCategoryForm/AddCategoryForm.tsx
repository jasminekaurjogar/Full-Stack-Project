import { useState } from "react";
import type { FormEvent } from "react";
import { useExpenseCategories } from "../../hooks/useExpenseCategories";
import Button from "../Button/Button";

// AddCategoryForm is the second component that calls useExpenseCategories.
// The expense page calls the same hook for the table. This form only uses
// addNewCategory. The hook asks the service to check the fields and save the row.
// The form keeps the typed text and shows the error message.
function AddCategoryForm() {
  const { addNewCategory } = useExpenseCategories();
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errorMessage = addNewCategory(name, budget, description);

    if (errorMessage !== "") {
      setError(errorMessage);
      return;
    }

    setName("");
    setBudget("");
    setDescription("");
    setError("");
  }

  return (
    <form className="ExpenseCategories-form" onSubmit={handleSubmit}>
      <div className="ExpenseCategories-formTop">
        <h3>Add a row</h3>
        <p className="ExpenseCategories-preview">
          {name.trim() || "New category"} · $
          {budget === "" ? "0" : budget}
        </p>
      </div>

      <div className="ExpenseCategories-fields">
        <div>
          <label htmlFor="category-name">Name</label>
          <input
            id="category-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category-budget">Budget</label>
          <input
            id="category-budget"
            type="number"
            min="1"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category-description">What it covers</label>
          <input
            id="category-description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <Button type="submit">Add row</Button>
      </div>

      {error !== "" && <p className="ExpenseCategories-error">{error}</p>}
    </form>
  );
}

export default AddCategoryForm;
