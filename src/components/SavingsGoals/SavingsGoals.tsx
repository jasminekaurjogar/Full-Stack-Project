import "./SavingsGoals.css";

// Simple type for one savings goal
interface SavingsGoal {
  name: string;
  target: number;
  saved: number;
}

const savingsGoals: SavingsGoal[] = [
  {
    name: "Emergency Fund",
    target: 500,
    saved: 325,
  },
  {
    name: "New Laptop",
    target: 1800,
    saved: 900,
  },
  {
    name: "Travel Fund",
    target: 1200,
    saved: 480,
  },
];

export function SavingsGoals() {
  return (
    <section className="savings-goals" id="goals">
      <p className="hero-label">Goals</p>
      <h2>Savings Goals</h2>
      <p>Set a target, add to it over time, and see how close you are.</p>

      <ul className="savings-goals-list">
        {savingsGoals.map((goal) => {
          const percent = Math.round((goal.saved / goal.target) * 100);

          return (
            <li className="savings-goals-card" key={goal.name}>
              <h3>{goal.name}</h3>
              <p className="savings-goals-amount">${goal.saved} saved</p>
              <p>Target ${goal.target}</p>
              <div className="progress-bar">
                <span style={{ width: percent + "%" }}></span>
              </div>
              <p>{percent}% complete</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
