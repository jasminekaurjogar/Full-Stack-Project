import { useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { ExpenseCategory } from "../../types/ExpenseCategory";
import { checkCategoryFields } from "../../services/expenseCategoryService";
import Button from "../Button/Button";

type AddCategoryFormProps = {
  categories: ExpenseCategory[];
  setCategories: Dispatch<SetStateAction<ExpenseCategory[]>>;
};

// Form receives the list and its setter as props, then updates the page
function AddCategoryForm({ categories, setCategories }: AddCategoryFormProps) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const budgetNumber = Number(budget);
    // The service owns the name and budget rules. The form only shows the message.
    const errorMessage = checkCategoryFields(name, budgetNumber, categories);

    if (errorMessage !== "") {
      setError(errorMessage);
      return;
    }

    const newCategory: ExpenseCategory = {
      id: Date.now(),
      name: name.trim(),
      budget: budgetNumber,
      description: description.trim() || "No description yet.",
      image: "/expenses/school-supplies.png",
    };

    setCategories([...categories, newCategory]);
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
