// Shape of one expense category used across the app
// (repository, service, hook, and UI components)
export interface ExpenseCategory {
  id: number;
  name: string;
  budget: number;
  description: string;
  image: string;
}
