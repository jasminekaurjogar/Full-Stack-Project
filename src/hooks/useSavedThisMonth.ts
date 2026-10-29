import { useEffect, useState } from "react";
import * as savedThisMonthService from "../services/savedThisMonthService";

// Presentation hook for the shared saved amount.
// It holds the number and asks the service to change it.
//
// What this hook returns:
// savedThisMonth - the shared amount shown on the page
// addTenDollars - add 10 to the shared amount
// addAmount - add another amount to the shared amount
// updateSavedAmount - set the shared amount from the expenses box

export function useSavedThisMonth() {
  const [savedThisMonth, setSavedThisMonth] = useState(0);

  useEffect(function () {
    setSavedThisMonth(savedThisMonthService.getAmount());
  }, []);

  function addTenDollars() {
    const newAmount = savedThisMonthService.addAmount(10);
    setSavedThisMonth(newAmount);
  }

  function addAmount(extraAmount: number) {
    const newAmount = savedThisMonthService.addAmount(extraAmount);
    setSavedThisMonth(newAmount);
  }

  function updateSavedAmount(newAmount: number) {
    const nextAmount = savedThisMonthService.setAmount(newAmount);
    setSavedThisMonth(nextAmount);
  }

  return {
    savedThisMonth,
    addTenDollars,
    addAmount,
    updateSavedAmount,
  };
}
