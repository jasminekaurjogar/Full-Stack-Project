import type { MonthlySavings } from "../types/savedThisMonth";
import { savedThisMonthTestData } from "../data/savedThisMonthTestData";

// In-memory copy of the shared savings amount.
// Pages still receive this number as props. The service will call these functions next.
let saved: MonthlySavings = {
  amount: savedThisMonthTestData.amount,
};

// Read the current amount.
export function getSavedThisMonth(): MonthlySavings {
  return { amount: saved.amount };
}

// Replace the saved amount. The service decides if the number is allowed.
export function updateSavedThisMonth(amount: number): MonthlySavings {
  saved = { amount: amount };
  return { amount: saved.amount };
}
