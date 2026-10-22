import type { SavingsGoal } from "../../types/SavingsGoal";
import { useSavingsGoals } from "../../hooks/useSavingsGoals";
import "./SavingsGoals.css";

interface SavingsGoalsProps {
  savedThisMonth: number;
  setSavedThisMonth: (value: number) => void;
}

// This page is presentation only. It uses useSavingsGoals for state.
// The hook calls the service. The service calls the repository.
export function SavingsGoals({
  savedThisMonth,
  setSavedThisMonth,
}: SavingsGoalsProps) {
  const {
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
  } = useSavingsGoals();

  function addTenDollars() {
    setSavedThisMonth(savedThisMonth + 10);
  }

  function onAddMoney(id: number) {
    const added = handleAddMoney(id);
    if (added && added > 0) {
      setSavedThisMonth(savedThisMonth + added);
    }
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
          <h3>${totals.totalSaved}</h3>
          <p>
            of ${totals.totalTarget} total · {totals.totalPercent}% complete
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
              {editingId === goal.id ? (
                <div className="savings-edit">
                  <input
                    type="text"
                    value={editName}
                    onChange={function (event) {
                      setEditName(event.target.value);
                    }}
                  />
                  <input
                    type="number"
                    min="1"
                    value={editTarget}
                    onChange={function (event) {
                      setEditTarget(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    value={editNote}
                    onChange={function (event) {
                      setEditNote(event.target.value);
                    }}
                  />
                  <button
                    type="button"
                    onClick={function () {
                      handleSaveEdit(goal.id);
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={function () {
                      setEditingId(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h3>{goal.name}</h3>
                  <p className="savings-status">{status}</p>
                  <p className="savings-goals-amount">${goal.saved} saved</p>
                  <p>Target ${goal.target}</p>
                  <p>${left} left to save</p>
                </>
              )}
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
                    onAddMoney(goal.id);
                  }}
                >
                  Add money
                </button>
              </div>
              <div className="savings-card-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={function () {
                    startEditGoal(goal);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={
                    percent >= 100
                      ? "secondary-button savings-complete-button savings-complete-button-done"
                      : "secondary-button savings-complete-button"
                  }
                  onClick={function () {
                    handleCompleteGoal(goal.id);
                  }}
                >
                  Complete
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={function () {
                    handleRemoveGoal(goal.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
