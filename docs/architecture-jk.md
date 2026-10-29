# Architecture Notes — Jasmine Kaur (jk)

Sprint 3 resource: expense categories.

The page does not talk to the test data directly. The path is:

component → hook → service → repository → test data

I also moved the shared "saved this month" number onto the same kind of path, so `App.tsx` no longer passes that number down as props.

## useExpenseCategories

File: `src/hooks/useExpenseCategories.ts`

### What does this hook do?

This hook holds the values the expense screen needs to draw. It returns the category list, the planned total, each row's share of the plan, and the text in the edit boxes. It also returns functions to start editing, cancel, save, add a row, and delete a row. The comment at the top of the file lists every returned value.

### How did you decide what logic to include, and how does that separate concerns?

The hook only handles presentation. It remembers which row is open and what the user typed. It does not decide if a budget is valid, and it does not store the list. After add, save, or delete, it asks the service to do the work and then reloads the list for the screen. Two components can call the hook, and both reload when the list changes.

### Where is this implementation used, and how?

`ExpenseCategories.tsx` calls it to draw the table, the totals, and the Edit and Remove buttons. `AddCategoryForm.tsx` calls it and uses `addNewCategory` when the user submits the form. The form only keeps the typed text and shows an error message.

## expenseCategoryService

File: `src/services/expenseCategoryService.ts`

### What does this service do?

This service holds the business rules for an expense category. It checks that the name is not blank, the name is not already used, and the budget is greater than 0. It adds up the budgets and calculates one row's percent of the plan. `addCategory`, `saveCategory`, and `removeCategory` run those rules and then call the repository.

### How did you decide what logic to include, and how does that separate concerns?

These rules used to sit inside the form and the table. I moved them here so the components do not repeat the same if statements. The service does not draw inputs or tables, and it does not keep its own copy of the list. The repository is the only place that stores categories.

### Where is this implementation used, and how?

`useExpenseCategories` calls this service. The hook calls `readAllCategories` to load the table, `getTotalBudget` and `getShareOfPlan` for the numbers on the page, and `addCategory`, `saveCategory`, and `removeCategory` when the user changes a row.

## expenseCategoryRepo

File: `src/apis/expenseCategoryRepo.ts`

### What does this repository do?

This repository stores the expense categories and offers create, read, update, and delete. `getAllCategories` and `getCategoryById` read the list. `createCategory` adds a row. `updateCategory` changes a row and keeps the same id. `deleteCategory` removes a row.

### How did you decide what logic to include, and how does that separate concerns?

The repository only reads and writes data. It does not check for a duplicate name or a budget of 0. Those checks belong in the service. It starts from `src/data/expenseCategoryTestData.ts`, which has 12 categories, and copies that array so later edits do not change the original test file. There is no API call yet. The next module can replace this copy with database data.

### Where is this implementation used, and how?

Only `expenseCategoryService` imports this file. Components and the hook do not call the repository directly.

## useSavedThisMonth

File: `src/hooks/useSavedThisMonth.ts`

### What does this hook do?

This hook returns the shared "saved this month" number and two ways to change it. `updateSavedAmount` replaces the total. `addSavedAmount` adds money on top of the current total. Each returned value is documented in the file.

### How did you decide what logic to include, and how does that separate concerns?

In Sprint 2 this number lived in `App.tsx` and was passed into every page. That was prop drilling. The hook's job is to give the screen the current number and to reload it after a change. It does not decide if a negative number is allowed. The service does that. More than one page can call the hook, and they all see the same stored number.

### Where is this implementation used, and how?

`Home.tsx` calls it to show the amount in the monthly snapshot. `SavingsGoals.tsx` calls `addSavedAmount` for the "$10" button and when money is added to a goal. `SavedThisMonthBox.tsx` calls `updateSavedAmount` when the user types a new total on the expense page.

## savedThisMonthService

File: `src/services/savedThisMonthService.ts`

### What does this service do?

This service reads the shared savings amount and checks changes to it. The amount must be a number and cannot be less than 0. `saveSavedThisMonth` replaces the total. `addToSavedThisMonth` adds a positive amount on top of the current total.

### How did you decide what logic to include, and how does that separate concerns?

The "greater than or equal to 0" check used to live in the input box. I moved it here so every page follows the same rule. The service does not render the input, and it does not keep the number itself. It asks the repository to store the new amount.

### Where is this implementation used, and how?

`useSavedThisMonth` is the only caller. `readSavedThisMonth` loads the number for the screen. `saveSavedThisMonth` runs when the expense page input changes. `addToSavedThisMonth` runs when Savings Goals adds money.

## savedThisMonthRepo

File: `src/apis/savedThisMonthRepo.ts`

### What does this repository do?

This repository stores one shared savings amount. `getSavedThisMonth` reads it. `updateSavedThisMonth` replaces it. The starting value is 325, from `src/data/savedThisMonthTestData.ts`.

### How did you decide what logic to include, and how does that separate concerns?

The repository only stores and returns the number. It does not check for a negative amount. That rule stays in the service. The test value is copied into a variable so a later update does not rewrite the test file. A database can replace this file in the next module.

### Where is this implementation used, and how?

Only `savedThisMonthService` imports this file. Pages do not call it directly.
