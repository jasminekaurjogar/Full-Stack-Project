import { useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { ExpenseCategory } from "../../types/ExpenseCategory";
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
