import * as savedThisMonthRepo from "../apis/savedThisMonthRepo";

// Business rules. The hook will call these. The page should not
// talk to the repository itself.

export function getAmount() {
  return savedThisMonthRepo.getAmount();
}

export function addAmount(extraAmount: number) {
  if (extraAmount <= 0) {
    return savedThisMonthRepo.getAmount();
  }

  const newAmount = savedThisMonthRepo.getAmount() + extraAmount;
  savedThisMonthRepo.setAmount(newAmount);
  return newAmount;
}

export function setAmount(newAmount: number) {
  if (newAmount < 0) {
    return savedThisMonthRepo.getAmount();
  }

  savedThisMonthRepo.setAmount(newAmount);
  return newAmount;
}
