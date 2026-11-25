import { useEffect, useState } from "react";
import type { ExpenseCategory } from "../types/ExpenseCategory";
import {
  addCategory,
  getShareOfPlan,
  getTotalBudget,
  readAllCategories,
  removeCategory,
  saveCategory,
} from "../services/expenseCategoryService";

// The list lives in the repository. Each component that calls this hook
// keeps its own copy for the screen, and this list tells every copy to reload.
const listeners: Array<() => void> = [];

function notifyListeners() {
  for (let i = 0; i < listeners.length; i++) {
    listeners[i]();
  }
}

// useExpenseCategories is presentation logic for the expense pages.
// It does not check business rules and it does not talk to the test data.
// The service does the rules. The repository stores the categories.
//
// Returned values:
// categories: the rows to show in the table
// totalBudget: the number for "Planned this month"
// shareOfPlan: the percent to show for one row's budget
// editingId: the id of the row open for editing, or null when none is open
// editName: the text in the name box of the open row
// editBudget: the text in the budget box of the open row
// editDescription: the text in the description box of the open row
// setEditName: updates editName while the user types
// setEditBudget: updates editBudget while the user types
// setEditDescription: updates editDescription while the user types
// editError: the message under Save, or "" when there is no error
// startEdit: fills the boxes from one category and opens that row
// cancelEdit: closes the boxes and does not save
// saveEdit: asks the service to save the open row, then reloads the list
// addNewCategory: asks the service to add a row and returns "" or an error message
// deleteCategory: asks the service to remove a row, then reloads the list
export function useExpenseCategories() {
  const [categories, setCategories] = useState<ExpenseCategory[]>(readAllCategories);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editBudget, setEditBudget] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editError, setEditError] = useState("");

  useEffect(function () {
    function reload() {
      setCategories(readAllCategories());
    }

    listeners.push(reload);

    return function () {
      const index = listeners.indexOf(reload);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

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

  function saveEdit() {
    if (editingId === null) {
      return;
    }

    const errorMessage = saveCategory(
      editingId,
      editName,
      editBudget,
      editDescription,
    );

    if (errorMessage !== "") {
      setEditError(errorMessage);
      return;
    }

    setEditingId(null);
    setEditError("");
    notifyListeners();
  }

  function addNewCategory(name: string, budgetText: string, description: string) {
    const errorMessage = addCategory(name, budgetText, description);

    if (errorMessage === "") {
      notifyListeners();
    }

    return errorMessage;
  }

  function deleteCategory(id: number) {
    removeCategory(id);

    if (editingId === id) {
      setEditingId(null);
      setEditError("");
    }

    notifyListeners();
  }

  const totalBudget = getTotalBudget(categories);

  function shareOfPlan(budget: number) {
    return getShareOfPlan(budget, totalBudget);
  }

  return {
    categories: categories,
    totalBudget: totalBudget,
    shareOfPlan: shareOfPlan,
    editingId: editingId,
    editName: editName,
    editBudget: editBudget,
    editDescription: editDescription,
    setEditName: setEditName,
    setEditBudget: setEditBudget,
    setEditDescription: setEditDescription,
    editError: editError,
    startEdit: startEdit,
    cancelEdit: cancelEdit,
    saveEdit: saveEdit,
    addNewCategory: addNewCategory,
    deleteCategory: deleteCategory,
  };
}
