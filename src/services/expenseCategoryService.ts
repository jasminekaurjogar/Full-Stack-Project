import type { ExpenseCategory } from "../types/ExpenseCategory";
import { getAllCategories, getCategoryById } from "../apis/expenseCategoryRepo";

// Business rules for expense categories.
// This file does not draw the page and it does not store the list itself.
// The repository stores the list. The service decides if a change is allowed.

// Read every category from the repository.
export function readAllCategories(): ExpenseCategory[] {
  return getAllCategories();
}

// Read one category from the repository.
export function readCategory(id: number): ExpenseCategory | undefined {
  return getCategoryById(id);
}

// Check a name and budget before add or edit.
// ignoreId is the row being edited, so that row can keep its own name.
// Returns an error message, or "" when the values are ok.
export function checkCategoryFields(
  name: string,
  budget: number,
  categories: ExpenseCategory[],
  ignoreId?: number,
): string {
  const trimmedName = name.trim();

  if (trimmedName === "") {
    return "Please enter a category name.";
  }

  const nameAlreadyUsed = categories.some(function (category) {
    if (ignoreId !== undefined && category.id === ignoreId) {
      return false;
    }
    return category.name.toLowerCase() === trimmedName.toLowerCase();
  });

  if (nameAlreadyUsed) {
    return "That category is already on the list.";
  }

  if (Number.isNaN(budget) || budget <= 0) {
    return "Please enter a budget greater than 0.";
  }

  return "";
}
