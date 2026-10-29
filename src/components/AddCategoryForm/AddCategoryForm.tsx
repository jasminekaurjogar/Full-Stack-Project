import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../Button/Button";

type AddCategoryFormProps = {
  onAdd: (name: string, budget: string, description: string) => string;
};

// The form only collects what the user typed. onAdd comes from the hook,
// and the hook asks the service to save the new category.
function AddCategoryForm({ onAdd }: AddCategoryFormProps) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errorMessage = onAdd(name, budget, description);

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
