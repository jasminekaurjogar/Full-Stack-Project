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

import type { SavedThisMonthProps } from "../../types/savedThisMonth";
import SavedThisMonthBox from "../SavedThisMonthBox/SavedThisMonthBox";

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
      <p>These are some example goals that a user could track in Piggy Bank.</p>
      <SavedThisMonthBox
        savedThisMonth={savedThisMonth}
        setSavedThisMonth={setSavedThisMonth}
      />

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
