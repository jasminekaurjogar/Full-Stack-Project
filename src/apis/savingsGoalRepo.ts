import type { SavingsGoal } from "../types/SavingsGoal";
import { savingsGoalTestData } from "../data/savingsGoalTestData";

// Data access only. No form checks here.
// Copy the test list so add and remove can change it in memory.
let goals: SavingsGoal[] = [...savingsGoalTestData];

export function getAllGoals(): SavingsGoal[] {
  return [...goals];
}

export function addGoal(newGoal: SavingsGoal): SavingsGoal[] {
  goals = [...goals, newGoal];
  return getAllGoals();
}

export function removeGoal(id: number): SavingsGoal[] {
  goals = goals.filter(function (goal) {
    return goal.id !== id;
  });
  return getAllGoals();
}

export function updateGoal(updatedGoal: SavingsGoal): SavingsGoal[] {
  goals = goals.map(function (goal) {
    if (goal.id === updatedGoal.id) {
      return updatedGoal;
    }
    return goal;
  });
  return getAllGoals();
}
