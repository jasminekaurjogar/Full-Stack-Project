import type { ExpenseCategory } from "../types/ExpenseCategory";

// Pre-made categories for Sprint 3. The repository reads this list
// instead of calling a real API. We will swap this for database data later.
export const expenseCategoryTestData: ExpenseCategory[] = [
  {
    id: 1,
    name: "Food",
    budget: 250,
    description: "Groceries, coffee, and eating out with friends.",
    image: "/expenses/food.png",
  },
  {
    id: 2,
    name: "Transportation",
    budget: 100,
    description: "Bus passes, gas money, and rides to campus.",
    image: "/expenses/transportation.png",
  },
  {
    id: 3,
    name: "School Supplies",
    budget: 150,
    description: "Textbooks, notebooks, and other class materials.",
    image: "/expenses/school-supplies.png",
  },
  {
    id: 4,
    name: "Entertainment",
    budget: 75,
    description: "Movies, games, and weekend plans.",
    image: "/expenses/entertainment.png",
  },
  {
    id: 5,
    name: "Rent",
    budget: 800,
    description: "Monthly share of the apartment rent.",
    image: "/expenses/school-supplies.png",
  },
  {
    id: 6,
    name: "Phone",
    budget: 45,
    description: "Cell phone plan and extra data.",
    image: "/expenses/entertainment.png",
  },
  {
    id: 7,
    name: "Health",
    budget: 40,
    description: "Prescriptions, vitamins, and clinic visits.",
    image: "/expenses/food.png",
  },
  {
    id: 8,
    name: "Clothing",
    budget: 60,
    description: "Clothes and shoes for school and work.",
    image: "/expenses/transportation.png",
  },
  {
    id: 9,
    name: "Subscriptions",
    budget: 35,
    description: "Streaming, music, and cloud storage.",
    image: "/expenses/entertainment.png",
  },
  {
    id: 10,
    name: "Personal Care",
    budget: 30,
    description: "Haircuts, toiletries, and laundry.",
    image: "/expenses/food.png",
  },
  {
    id: 11,
    name: "Gifts",
    budget: 25,
    description: "Birthdays and small gifts for family.",
    image: "/expenses/school-supplies.png",
  },
  {
    id: 12,
    name: "Utilities",
    budget: 70,
    description: "Electricity, internet, and water split.",
    image: "/expenses/transportation.png",
  },
];
