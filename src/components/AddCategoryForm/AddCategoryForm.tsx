import { useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { ExpenseCategory } from "../ExpenseCategories/ExpenseCategories";
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

    const trimmedName = name.trim();
    const budgetNumber = Number(budget);

    if (trimmedName === "") {
      setError("Please enter a category name.");
      return;
    }

    const nameAlreadyUsed = categories.some(
      (category) => category.name.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (nameAlreadyUsed) {
      setError("That category is already on the list.");
      return;
    }

    if (Number.isNaN(budgetNumber) || budgetNumber <= 0) {
      setError("Please enter a budget greater than 0.");
      return;
    }

    const newCategory: ExpenseCategory = {
      id: Date.now(),
      name: trimmedName,
      budget: budgetNumber,
      description: description.trim() || "No description yet.",
    };

    setCategories([...categories, newCategory]);
    setName("");
    setBudget("");
    setDescription("");
    setError("");
  }

  return (
    <form className="ExpenseCategories-form" onSubmit={handleSubmit}>
      <h3>Add a category</h3>
      <p className="ExpenseCategories-preview">
        Preview: {name.trim() || "New category"} — $
        {budget === "" ? "0" : budget} / month
      </p>

      <label htmlFor="category-name">Name</label>
      <input
        id="category-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="category-budget">Monthly budget</label>
      <input
        id="category-budget"
        type="number"
        min="1"
        value={budget}
        onChange={(event) => setBudget(event.target.value)}
      />

      <label htmlFor="category-description">Description</label>
      <input
        id="category-description"
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      {error !== "" && <p className="ExpenseCategories-error">{error}</p>}

      <Button type="submit">Add Category</Button>
    </form>
  );
}

export default AddCategoryForm;
