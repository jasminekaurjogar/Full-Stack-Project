import "./SavingsGoals.css";

// Simple type for one savings goal
interface SavingsGoal {
  name: string;
  target: number;
  saved: number;
  image: string;
  note: string;
}

const savingsGoals: SavingsGoal[] = [
  {
    name: "Emergency Fund",
    target: 500,
    saved: 325,
    image: "/savings/emergency-fund.svg",
    note: "Keep a safety amount for surprise bills.",
  },
  {
    name: "New Laptop",
    target: 1800,
    saved: 900,
    image: "/savings/laptop.svg",
    note: "Save a little each month for school work.",
  },
  {
    name: "Travel Fund",
    target: 1200,
    saved: 480,
    image: "/savings/travel.svg",
    note: "Plan a trip without using credit cards.",
  },
];

interface SavingsGoalsProps {
  savedThisMonth: number;
  setSavedThisMonth: (value: number) => void;
}

export function SavingsGoals({
  savedThisMonth,
  setSavedThisMonth,
}: SavingsGoalsProps) {
  function addTenDollars() {
    setSavedThisMonth(savedThisMonth + 10);
  }

  let totalSaved = 0;
  let totalTarget = 0;

  for (let i = 0; i < savingsGoals.length; i++) {
    totalSaved = totalSaved + savingsGoals[i].saved;
    totalTarget = totalTarget + savingsGoals[i].target;
  }

  const totalPercent = Math.round((totalSaved / totalTarget) * 100);

  return (
    <section className="savings-goals" id="goals">
      <p className="hero-label">Goals</p>
      <h2>Savings Goals</h2>
      <p>Set a target, add to it over time, and see how close you are.</p>

      <div className="savings-summary">
        <div>
          <p className="hero-label">This month</p>
          <h3>${savedThisMonth}</h3>
          <p>Shared amount saved across pages</p>
        </div>
        <div>
          <p className="hero-label">All goals</p>
          <h3>${totalSaved}</h3>
          <p>
            of ${totalTarget} total · {totalPercent}% complete
          </p>
        </div>
        <button type="button" onClick={addTenDollars}>
          Add $10 to shared savings
        </button>
      </div>

      <ul className="savings-goals-list">
        {savingsGoals.map((goal) => {
          const percent = Math.round((goal.saved / goal.target) * 100);
          const left = goal.target - goal.saved;
          let status = "Just started";

          if (percent >= 100) {
            status = "Goal reached";
          } else if (percent >= 60) {
            status = "On track";
          } else if (percent >= 30) {
            status = "Keep going";
          }

          return (
            <li className="savings-goals-card" key={goal.name}>
              <img
                className="savings-icon"
                src={goal.image}
                alt={goal.name + " icon"}
              />
              <h3>{goal.name}</h3>
              <p className="savings-status">{status}</p>
              <p className="savings-goals-amount">${goal.saved} saved</p>
              <p>Target ${goal.target}</p>
              <p>${left} left to save</p>
              <div className="progress-bar">
                <span style={{ width: percent + "%" }}></span>
              </div>
              <p>{percent}% complete</p>
              <p className="savings-note">{goal.note}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
