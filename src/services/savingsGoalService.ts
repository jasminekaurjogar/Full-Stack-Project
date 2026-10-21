import type { SavingsGoal } from "../types/SavingsGoal";
import * as savingsGoalRepo from "../apis/savingsGoalRepo";

// Business rules. The hook will call these. The page should not
// talk to the repository itself.

export function getGoals(): SavingsGoal[] {
  return savingsGoalRepo.getAllGoals();
}

export function tryCreateGoal(
  name: string,
  targetText: string,
  note: string
): { ok: true; goal: SavingsGoal } | { ok: false; message: string } {
  const targetNumber = Number(targetText);

  if (name.trim() === "") {
    return { ok: false, message: "Please enter a goal name." };
  }

  if (Number.isNaN(targetNumber) || targetNumber <= 0) {
    return { ok: false, message: "Please enter a target greater than 0." };
  }

  if (note.trim() === "") {
    return { ok: false, message: "Please enter a short description." };
  }

  const newGoal: SavingsGoal = {
    id: Date.now(),
    name: name.trim(),
    target: targetNumber,
    saved: 0,
    image: "/savings/new-goal.png",
    note: note.trim(),
  };

  savingsGoalRepo.addGoal(newGoal);
  return { ok: true, goal: newGoal };
}

export function deleteGoal(id: number): SavingsGoal[] {
  return savingsGoalRepo.removeGoal(id);
}

export function tryAddMoney(
  goal: SavingsGoal,
  amountText: string
): { ok: true; goal: SavingsGoal } | { ok: false; message: string } {
  const amount = Number(amountText);

  if (Number.isNaN(amount) || amount <= 0) {
    return { ok: false, message: "Please enter an amount greater than 0." };
  }

  const updatedGoal: SavingsGoal = {
    ...goal,
    saved: goal.saved + amount,
  };

  savingsGoalRepo.updateGoal(updatedGoal);
  return { ok: true, goal: updatedGoal };
}

export function tryUpdateGoal(
  goal: SavingsGoal,
  name: string,
  targetText: string,
  note: string
): { ok: true; goal: SavingsGoal } | { ok: false; message: string } {
  const targetNumber = Number(targetText);

  if (name.trim() === "") {
    return { ok: false, message: "Please enter a goal name." };
  }

  if (Number.isNaN(targetNumber) || targetNumber <= 0) {
    return { ok: false, message: "Please enter a target greater than 0." };
  }

  const updatedGoal: SavingsGoal = {
    ...goal,
    name: name.trim(),
    target: targetNumber,
    note: note.trim(),
  };

  savingsGoalRepo.updateGoal(updatedGoal);
  return { ok: true, goal: updatedGoal };
}

export function completeGoal(goal: SavingsGoal): SavingsGoal {
  const updatedGoal: SavingsGoal = {
    ...goal,
    saved: goal.target,
  };

  savingsGoalRepo.updateGoal(updatedGoal);
  return updatedGoal;
}

export function getGoalTotals(goals: SavingsGoal[]) {
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

  return { totalSaved, totalTarget, totalPercent };
}
