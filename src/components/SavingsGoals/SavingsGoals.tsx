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

export function SavingsGoals() {
  return (
    <section className="savings-goals">
      <h2>Savings Goals</h2>
      <p>These are some example goals that a user could track in Pink Piggy.</p>

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
