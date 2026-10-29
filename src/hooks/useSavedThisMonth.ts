import { useEffect, useState } from "react";
import {
  addToSavedThisMonth,
  readSavedThisMonth,
  saveSavedThisMonth,
} from "../services/savedThisMonthService";

// Each page that calls this hook keeps its own copy of the number.
// This list tells every copy to reload after a change.
const listeners: Array<() => void> = [];

function notifyListeners() {
  for (let i = 0; i < listeners.length; i++) {
    listeners[i]();
  }
}

// useSavedThisMonth is presentation logic for the shared savings amount.
// It does not decide if a number is allowed and it does not store the number.
// The service checks the amount. The repository stores it.
//
// Returned values:
// savedThisMonth: the number to show on Home, Savings Goals, and Expense Categories
// updateSavedAmount: replaces the total. Returns "" or an error message.
// addSavedAmount: adds money on top of the current total. Returns "" or an error message.
export function useSavedThisMonth() {
  const [savedThisMonth, setSavedThisMonth] = useState(readSavedThisMonth);

  useEffect(function () {
    function reload() {
      setSavedThisMonth(readSavedThisMonth());
    }

    listeners.push(reload);

    return function () {
      const index = listeners.indexOf(reload);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  function updateSavedAmount(amount: number) {
    const errorMessage = saveSavedThisMonth(amount);

    if (errorMessage === "") {
      notifyListeners();
    }

    return errorMessage;
  }

  function addSavedAmount(extra: number) {
    const errorMessage = addToSavedThisMonth(extra);

    if (errorMessage === "") {
      notifyListeners();
    }

    return errorMessage;
  }

  return {
    savedThisMonth: savedThisMonth,
    updateSavedAmount: updateSavedAmount,
    addSavedAmount: addSavedAmount,
  };
}
