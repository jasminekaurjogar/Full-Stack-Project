import { useEffect, useState } from "react";
import type { SavingsGoal } from "../types/SavingsGoal";
import * as savingsGoalService from "../services/savingsGoalService";

// Presentation hook for the savings page.
// It holds the list and form fields, then asks the service to add,
// edit, remove, complete, or add money.
//
// What this hook returns:
// goals - the list shown on the page
// goalName, goalTarget, goalNote - add-form fields
// setGoalName, setGoalTarget, setGoalNote - update those fields
// addAmounts, setAddAmounts - the add-money box on each row
// formError - validation message for the add form
// editingId, editName, editTarget, editNote - edit form
// handleAddGoal, handleRemoveGoal, handleAddMoney - list actions
// startEditGoal, handleSaveEdit, handleCompleteGoal - edit/complete
// totals - total saved, total target, and percent

export function useSavingsGoals() {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalNote, setGoalNote] = useState("");
  const [addAmounts, setAddAmounts] = useState<Record<number, string>>({});
  const [formError, setFormError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editTarget, setEditTarget] = useState("");
  const [editNote, setEditNote] = useState("");

  useEffect(function () {
    setGoals(savingsGoalService.getGoals());
  }, []);

  function handleAddGoal(event: React.FormEvent) {
    event.preventDefault();

    const result = savingsGoalService.tryCreateGoal(
      goalName,
      goalTarget,
      goalNote
    );

    if (!result.ok) {
      setFormError(result.message);
      return;
    }

    setGoals([...goals, result.goal]);
    setGoalName("");
    setGoalTarget("");
    setGoalNote("");
    setFormError("");
  }

  function handleRemoveGoal(id: number) {
    savingsGoalService.deleteGoal(id);
    const remaining = goals.filter(function (goal) {
      return goal.id !== id;
    });
    setGoals(remaining);
  }

  function handleAddMoney(id: number) {
    const goal = goals.find(function (item) {
      return item.id === id;
    });

    if (!goal) {
      return 0;
    }

    const result = savingsGoalService.tryAddMoney(goal, addAmounts[id] || "");

    if (!result.ok) {
      return 0;
    }

    setGoals(
      goals.map(function (item) {
        if (item.id === id) {
          return result.goal;
        }
        return item;
      })
    );
    setAddAmounts({ ...addAmounts, [id]: "" });
    return result.goal.saved - goal.saved;
  }

  function startEditGoal(goal: SavingsGoal) {
    setEditingId(goal.id);
    setEditName(goal.name);
    setEditTarget(String(goal.target));
    setEditNote(goal.note);
  }

  function handleSaveEdit(id: number) {
    const goal = goals.find(function (item) {
      return item.id === id;
    });

    if (!goal) {
      return;
    }

    const result = savingsGoalService.tryUpdateGoal(
      goal,
      editName,
      editTarget,
      editNote
    );

    if (!result.ok) {
      return;
    }

    setGoals(
      goals.map(function (item) {
        if (item.id === id) {
          return result.goal;
        }
        return item;
      })
    );
    setEditingId(null);
  }

  function handleCompleteGoal(id: number) {
    const goal = goals.find(function (item) {
      return item.id === id;
    });

    if (!goal) {
      return;
    }

    const updatedGoal = savingsGoalService.completeGoal(goal);
    setGoals(
      goals.map(function (item) {
        if (item.id === id) {
          return updatedGoal;
        }
        return item;
      })
    );
  }

  const totals = savingsGoalService.getGoalTotals(goals);

  return {
    goals,
    goalName,
    setGoalName,
    goalTarget,
    setGoalTarget,
    goalNote,
    setGoalNote,
    addAmounts,
    setAddAmounts,
    formError,
    editingId,
    setEditingId,
    editName,
    setEditName,
    editTarget,
    setEditTarget,
    editNote,
    setEditNote,
    handleAddGoal,
    handleRemoveGoal,
    handleAddMoney,
    startEditGoal,
    handleSaveEdit,
    handleCompleteGoal,
    totals,
  };
}
