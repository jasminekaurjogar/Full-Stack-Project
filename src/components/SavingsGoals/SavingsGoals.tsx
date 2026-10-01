import { useState } from "react";
import "./SavingsGoals.css";

// Simple type for one savings goal
interface SavingsGoal {
  id: number;
  name: string;
  target: number;
  saved: number;
  image: string;
  note: string;
}

const startingGoals: SavingsGoal[] = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 500,
    saved: 325,
    image: "/savings/emergency-fund.png",
    note: "Keep a safety amount for surprise bills.",
  },
  {
    id: 2,
    name: "Gaming Laptop Setup",
    target: 5000,
    saved: 900,
    image: "/savings/gaming-setup.png",
    note: "Save a little each month for a gaming setup.",
  },
  {
    id: 3,
    name: "Travel Fund",
    target: 1200,
    saved: 480,
    image: "/savings/travel.png",
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
  const [goals, setGoals] = useState(startingGoals);
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalNote, setGoalNote] = useState("");
  const [addAmounts, setAddAmounts] = useState<Record<number, string>>({});
  const [formError, setFormError] = useState("");

  function addTenDollars() {
    setSavedThisMonth(savedThisMonth + 10);
  }

  function handleAddGoal(event: React.FormEvent) {
    event.preventDefault();

    const targetNumber = Number(goalTarget);

    if (goalName.trim() === "") {
      setFormError("Please enter a goal name.");
      return;
    }

    if (Number.isNaN(targetNumber) || targetNumber <= 0) {
      setFormError("Please enter a target greater than 0.");
      return;
    }

    if (goalNote.trim() === "") {
      setFormError("Please enter a short description.");
      return;
    }

    const newGoal: SavingsGoal = {
      id: Date.now(),
      name: goalName.trim(),
      target: targetNumber,
      saved: 0,
      image: "/savings/new-goal.png",
      note: goalNote.trim(),
    };

    setGoals([...goals, newGoal]);
    setGoalName("");
    setGoalTarget("");
    setGoalNote("");
    setFormError("");
  }

  function handleRemoveGoal(id: number) {
    const updatedGoals = goals.filter(function (goal) {
      return goal.id !== id;
    });

    setGoals(updatedGoals);
  }

  function handleAddMoney(id: number) {
    const amount = Number(addAmounts[id]);

    if (Number.isNaN(amount) || amount <= 0) {
      return;
    }

    const updatedGoals = goals.map(function (goal) {
      if (goal.id === id) {
        return { ...goal, saved: goal.saved + amount };
      }
      return goal;
    });

    setGoals(updatedGoals);
    setSavedThisMonth(savedThisMonth + amount);
    setAddAmounts({ ...addAmounts, [id]: "" });
  }

  let totalSaved = 0;
  let totalTarget = 0;

  for (let i = 0; i < goals.length; i++) {
    totalSaved = totalSaved + goals[i].saved;
    totalTarget = totalTarget + goals[i].target;
  }

  let totalPercent = 0;
  if (totalTarget > 0) {
    totalPercent = Math.round((totalSaved / totalTarget) * 100);
  }

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

      <form className="savings-form" onSubmit={handleAddGoal}>
        <h3>Add a new goal</h3>
        <label>
          Goal name
          <input
            type="text"
            value={goalName}
            onChange={function (event) {
              setGoalName(event.target.value);
            }}
          />
        </label>
        <label>
          Target amount
          <input
            type="number"
            min="1"
            value={goalTarget}
            onChange={function (event) {
              setGoalTarget(event.target.value);
            }}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={goalNote}
            onChange={function (event) {
              setGoalNote(event.target.value);
            }}
          />
        </label>
        {formError !== "" && <p className="savings-error">{formError}</p>}
        <button type="submit">Add goal</button>
      </form>

      <ul className="savings-goals-list">
        {goals.map((goal) => {
          const percent = Math.min(
            100,
            Math.round((goal.saved / goal.target) * 100)
          );
          const left = Math.max(0, goal.target - goal.saved);
          let status = "Just started";

          if (percent >= 100) {
            status = "Goal reached";
          } else if (percent >= 60) {
            status = "On track";
          } else if (percent >= 30) {
            status = "Keep going";
          }

          return (
            <li className="savings-goals-card" key={goal.id}>
              {goal.image && (
                <img
                  className="savings-icon"
                  src={goal.image}
                  alt={goal.name + " icon"}
                />
              )}
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
              <div className="savings-add-money">
                <input
                  type="number"
                  min="1"
                  placeholder="Amount"
                  value={addAmounts[goal.id] || ""}
                  onChange={function (event) {
                    setAddAmounts({
                      ...addAmounts,
                      [goal.id]: event.target.value,
                    });
                  }}
                />
                <button
                  type="button"
                  onClick={function () {
                    handleAddMoney(goal.id);
                  }}
                >
                  Add money
                </button>
              </div>
              <button
                type="button"
                className="secondary-button"
                onClick={function () {
                  handleRemoveGoal(goal.id);
                }}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
