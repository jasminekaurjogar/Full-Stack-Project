import { savedThisMonthTestData } from "../data/savedThisMonthTestData";

// Data access only. No checks here.
// One amount in memory so pages can share the same number.
let amount = savedThisMonthTestData.amount;

export function getAmount() {
  return amount;
}

export function setAmount(newAmount: number) {
  amount = newAmount;
  return amount;
}
