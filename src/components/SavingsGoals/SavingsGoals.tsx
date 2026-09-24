const savingsGoals = [
  {
    name: "Emergency Fund",
    amount: "$500",
  },
  {
    name: "New Laptop",
    amount: "$900",
  },
  {
    name: "Vacation Savings",
    amount: "$700",
  },
];

import type { SavedThisMonthProps } from "../../types/savedThisMonth";

export function SavingsGoals({
  savedThisMonth,
  setSavedThisMonth,
}: SavedThisMonthProps) {
  return (
    <section className="savings-goals" id="goals">
      <h2>Savings Goals</h2>
      <p>These are some example goals that a user could track in Piggy Bank.</p>

      <ul>
        {savingsGoals.map((goal) => (
          <li key={goal.name}>
            <strong>{goal.name}</strong>: {goal.amount}
          </li>
        ))}
      </ul>
    </section>
  );
}
