import type { Dispatch, SetStateAction } from "react";

// The shared monthly savings amount stored by the repository.
export interface MonthlySavings {
  amount: number;
}

// Shared monthly savings value lives in App and is passed to every page
export interface SavedThisMonthProps {
  savedThisMonth: number;
  setSavedThisMonth: Dispatch<SetStateAction<number>>;
}
