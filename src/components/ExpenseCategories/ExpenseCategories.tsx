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

  // Add up every category budget to show the total monthly spending plan
  let totalBudget = 0;
  for (const category of categories) {
    totalBudget = totalBudget + category.budget;
  }

  return (
    <section className="ExpenseCategories">
      <h2>Expense Categories</h2>
      <p>
        Track your student budget across different daily spending categories to
        stay on top of your finances.
      </p>
      <p className="ExpenseCategories-summary">
        You are tracking {categories.length} categories with a total monthly
        budget of ${totalBudget}.
      </p>

      {/* Loop through the array and build one list item for each category */}
      <ul className="ExpenseCategories-list">
        {categories.map((category) => (
          <li className="ExpenseCategories-card" key={category.id}>
            <h3>{category.name}</h3>
            <p className="ExpenseCategories-budget">${category.budget} / month</p>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ExpenseCategories;
