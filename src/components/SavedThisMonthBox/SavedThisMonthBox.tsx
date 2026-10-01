import type { ChangeEvent } from "react";
import type { SavedThisMonthProps } from "../../types/savedThisMonth";
import "./SavedThisMonthBox.css";

// Reusable box: shows the shared savings number and lets any page change it
function SavedThisMonthBox({
  savedThisMonth,
  setSavedThisMonth,
}: SavedThisMonthProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = Number(event.target.value);

    // Only update shared state when the input is a valid number
    if (!Number.isNaN(nextValue) && nextValue >= 0) {
      setSavedThisMonth(nextValue);
    }
  }

  return (
    <div className="saved-this-month-box">
      <p>
        Saved this month: <strong>${savedThisMonth}</strong>
      </p>
      <label htmlFor="saved-this-month">Update shared savings</label>
      <input
        id="saved-this-month"
        type="number"
        min="0"
        value={savedThisMonth}
        onChange={handleChange}
      />
    </div>
  );
}

export default SavedThisMonthBox;
