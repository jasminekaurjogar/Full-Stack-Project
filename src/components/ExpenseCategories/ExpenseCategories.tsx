// Interface to define the data structure for each expense category
export interface ExpenseCategory {
  id: number;
  name: string;
  budget: number;
  description: string;
}

// ExpenseCategories component to organize student spending categories
function ExpenseCategories() {
  return (
    <section className="ExpenseCategories">
      <h2>Expense Categories</h2>
      <p>
        Track your student budget across different daily spending categories to
        stay on top of your finances.
      </p>
    </section>
  );
}

export default ExpenseCategories;
