import type { ChangeEvent } from "react";
import { useSavedThisMonth } from "../../hooks/useSavedThisMonth";
import "./SavedThisMonthBox.css";

// SavedThisMonthBox calls useSavedThisMonth so a page can show and change
// the shared amount without props from App.
// The hook asks the service to check the number, then the repository stores it.
function SavedThisMonthBox() {
  const { savedThisMonth, updateSavedAmount } = useSavedThisMonth();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = Number(event.target.value);
    updateSavedAmount(nextValue);
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
