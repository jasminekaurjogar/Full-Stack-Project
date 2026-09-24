import "./ExpenseCategories.css";

// Interface to define the data structure for each expense category
export interface ExpenseCategory {
  id: number;
  name: string;
  budget: number;
  description: string;
}

function ExpenseCategories() {
  const categories: ExpenseCategory[] = [
    {
      id: 1,
      name: "Food",
      budget: 250,
      description: "Groceries, dining, and everyday meals.",
    },
    {
      id: 2,
      name: "Transportation",
      budget: 100,
      description: "Transit, fuel, and daily commuting.",
    },
    {
      id: 3,
      name: "Rent and Bills",
      budget: 500,
      description: "Rent, electricity, and phone bills.",
    },
    {
      id: 4,
      name: "Entertainment",
      budget: 75,
      description: "Events, subscriptions, and nights out.",
    },
  ];

  // Add up every category budget to show the total monthly spending plan
  let totalBudget = 0;
  for (const category of categories) {
    totalBudget = totalBudget + category.budget;
  }

  return (
    <section className="ExpenseCategories" id="expenses">
      <h2>Expense Categories</h2>
      <p>
        Organize monthly spending by category so your budget stays easy to follow.
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
