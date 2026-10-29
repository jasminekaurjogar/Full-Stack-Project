import type { ExpenseCategory } from "../types/ExpenseCategory";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../apis/expenseCategoryRepo";

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

// Add every budget together. The page uses this for "Planned this month".
export function getTotalBudget(categories: ExpenseCategory[]): number {
  let total = 0;

  for (let i = 0; i < categories.length; i++) {
    total = total + categories[i].budget;
  }

  return total;
}

// What percent of the whole plan one budget is.
// Returns 0 when the plan total is 0 so we do not divide by zero.
export function getShareOfPlan(budget: number, totalBudget: number): number {
  if (totalBudget <= 0) {
    return 0;
  }

  return Math.round((budget / totalBudget) * 100);
}

// Add a category only after the name and budget pass the checks.
// Returns an error message, or "" when the repository saved the row.
export function addCategory(
  name: string,
  budgetText: string,
  description: string,
): string {
  const budget = Number(budgetText);
  const error = checkCategoryFields(name, budget, getAllCategories());

  if (error !== "") {
    return error;
  }

  const trimmedDescription = description.trim();
  createCategory(
    name.trim(),
    budget,
    trimmedDescription === "" ? "No description yet." : trimmedDescription,
    "/expenses/school-supplies.png",
  );

  return "";
}

// Update one category. ignoreId lets that row keep its current name.
export function saveCategory(
  id: number,
  name: string,
  budgetText: string,
  description: string,
): string {
  const budget = Number(budgetText);
  const error = checkCategoryFields(name, budget, getAllCategories(), id);

  if (error !== "") {
    return error;
  }

  const existing = getCategoryById(id);
  if (!existing) {
    return "That category is not on the list.";
  }

  const trimmedDescription = description.trim();
  updateCategory(id, {
    name: name.trim(),
    budget: budget,
    description: trimmedDescription === "" ? "No description yet." : trimmedDescription,
  });

  return "";
}

// Remove one category through the repository.
export function removeCategory(id: number): boolean {
  return deleteCategory(id);
}
