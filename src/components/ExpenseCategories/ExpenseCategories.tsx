// Interface to define the data structure for each expense category
export interface ExpenseCategory {
  id: number;
  name: string;
  budget: number;
  description: string;
}

// ExpenseCategories component to organize student spending categories
function ExpenseCategories() {
  // Array of the main expense categories a student spends money on
  const categories: ExpenseCategory[] = [
    {
      id: 1,
      name: "Food",
      budget: 250,
      description: "Groceries, coffee, and eating out with friends.",
    },
    {
      id: 2,
      name: "Transportation",
      budget: 100,
      description: "Bus passes, gas money, and rides to campus.",
    },
    {
      id: 3,
      name: "School Supplies",
      budget: 150,
      description: "Textbooks, notebooks, and other class materials.",
    },
    {
      id: 4,
      name: "Entertainment",
      budget: 75,
      description: "Movies, games, and weekend plans.",
    },
  ];

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
