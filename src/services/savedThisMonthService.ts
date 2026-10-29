import { getSavedThisMonth, updateSavedThisMonth } from "../apis/savedThisMonthRepo";

// Business rules for the shared "saved this month" amount.
// This file does not draw a page. The repository stores the number.

// Read the current amount from the repository.
export function readSavedThisMonth(): number {
  return getSavedThisMonth().amount;
}

// A saved amount can be 0 or more. It cannot be blank or negative.
export function checkSavedAmount(amount: number): string {
  if (Number.isNaN(amount)) {
    return "Please enter a number.";
  }

  if (amount < 0) {
    return "Saved amount cannot be less than 0.";
  }

  return "";
}

// Save a new total after the check passes.
// Returns an error message, or "" when the repository stored the number.
export function saveSavedThisMonth(amount: number): string {
  const error = checkSavedAmount(amount);

  if (error !== "") {
    return error;
  }

  updateSavedThisMonth(amount);
  return "";
}

// Add money on top of the current amount. Used by the $10 button and goal deposits.
export function addToSavedThisMonth(extra: number): string {
  if (Number.isNaN(extra) || extra <= 0) {
    return "Please enter an amount greater than 0.";
  }

  return saveSavedThisMonth(readSavedThisMonth() + extra);
}
