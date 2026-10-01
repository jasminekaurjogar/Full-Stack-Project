import type { Dispatch, SetStateAction } from "react";

// Shared monthly savings value lives in App and is passed to every page
export interface SavedThisMonthProps {
  savedThisMonth: number;
  setSavedThisMonth: Dispatch<SetStateAction<number>>;
}
