import type { ExpenseCategory } from "../types/ExpenseCategory";
import { expenseCategoryTestData } from "../data/expenseCategoryTestData";

// In-memory copy of the test data. The page does not talk to this yet.
// The service will call these functions so components never touch the data directly.
let categories: ExpenseCategory[] = expenseCategoryTestData.map(function (category) {
  return { ...category };
});

// Read every category
export function getAllCategories(): ExpenseCategory[] {
  return categories.map(function (category) {
    return { ...category };
  });
}

// Read one category by id
export function getCategoryById(id: number): ExpenseCategory | undefined {
  const found = categories.find(function (category) {
    return category.id === id;
  });

  if (!found) {
    return undefined;
  }

  return { ...found };
}

// Create a new category and give it an id
export function createCategory(
  name: string,
  budget: number,
  description: string,
  image: string,
): ExpenseCategory {
  const category: ExpenseCategory = {
    id: Date.now(),
    name: name,
    budget: budget,
    description: description,
    image: image,
  };

  categories = [...categories, category];
  return { ...category };
}

// Update the fields that were sent in. Id stays the same.
export function updateCategory(
  id: number,
  changes: {
    name?: string;
    budget?: number;
    description?: string;
    image?: string;
  },
): ExpenseCategory | undefined {
  let updated: ExpenseCategory | undefined;

  categories = categories.map(function (category) {
    if (category.id !== id) {
      return category;
    }

    updated = {
      id: category.id,
      name: changes.name ?? category.name,
      budget: changes.budget ?? category.budget,
      description: changes.description ?? category.description,
      image: changes.image ?? category.image,
    };

    return updated;
  });

  if (!updated) {
    return undefined;
  }

  return { ...updated };
}

// Delete one category. Returns true if something was removed.
export function deleteCategory(id: number): boolean {
  const lengthBefore = categories.length;
  categories = categories.filter(function (category) {
    return category.id !== id;
  });
  return categories.length < lengthBefore;
}
