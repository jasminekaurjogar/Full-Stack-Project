import { useSavingsGoals } from "../../hooks/useSavingsGoals";

// Second component that uses the savings hook.
export function SavingsTotals() {
  const { totals } = useSavingsGoals();

  return (
    <div className="snapshot-row">
      <span>All goals</span>
      <strong>${totals.totalSaved}</strong>
    </div>
  );
}
