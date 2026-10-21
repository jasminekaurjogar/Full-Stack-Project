// One savings goal. The repository and service will use this type too.
export interface SavingsGoal {
  id: number;
  name: string;
  target: number;
  saved: number;
  image: string;
  note: string;
}
