# Sprint 3 Architecture — Sehajpreet Kaur (SK)

This file is for my savings work only. Jasmine will write her own
expense architecture file.

My resource is **savings goals**. Data moves like this:

`SavingsGoals.tsx` → `useSavingsGoals` → `savingsGoalService` → `savingsGoalRepo` → test data

## useSavingsGoals (hook)

**1. What does it do?**  
It holds the list and form fields for the Savings page. It returns the goals,
the add-form values, the edit fields, the error message, and functions like
add, remove, edit, complete, and add money.

**2. Why this logic is here?**  
This is presentation logic: what the page shows and what happens when the
user clicks. It does not decide if a target is valid. That belongs in the
service. It does not store the list as the main copy of the data. That
belongs in the repository.

**3. Where is it used?**  
`src/hooks/useSavingsGoals.ts` is used in
`src/components/SavingsGoals/SavingsGoals.tsx` and
`src/components/SavingsGoals/SavingsTotals.tsx` (Home page).

## savingsGoalService (service)

**1. What does it do?**  
It has the business rules for a goal. It checks name, target greater than 0,
and description. It also updates saved money, edits a goal, and completes a
goal. Then it asks the repository to save.

**2. Why this logic is here?**  
Rules like “target must be greater than 0” are business logic, not how the
page looks. The hook should not talk to the repository. The service sits in
the middle.

**3. Where is it used?**  
`src/services/savingsGoalService.ts` is used by `useSavingsGoals`.

## savingsGoalRepo (repository)

**1. What does it do?**  
It gets, adds, removes, and updates savings goals. It starts from the test
data array. This is data access only.

**2. Why this logic is here?**  
The repo does not check the form. It only reads and writes the list. Later
we can change this file to call a real backend without changing the page.

**3. Where is it used?**  
`src/apis/savingsGoalRepo.ts` is used by `savingsGoalService`.
It imports `src/data/savingsGoalTestData.ts` (10 goals for I.2).

## SavingsGoal type

**1. What does it do?**  
It describes one goal: id, name, target, saved, image, and note.

**2. Why this logic is here?**  
The type is shared by the page, hook, service, repo, and test data so they
all use the same shape.

**3. Where is it used?**  
`src/types/SavingsGoal.ts` is imported by the test data, repo, service,
hook, and Savings page.

The shared amount is a second resource. Data moves like this:

`Home.tsx` / `SavingsGoals.tsx` → `useSavedThisMonth` → `savedThisMonthService` → `savedThisMonthRepo` → test data

## useSavedThisMonth (hook)

**1. What does it do?**  
It holds the shared saved amount. It returns the number, add $10, and add
another amount.

**2. Why this logic is here?**  
This is presentation logic. Home and Savings both need the same number.
The hook asks the service. It does not store the main copy of the data.

**3. Where is it used?**  
`src/hooks/useSavedThisMonth.ts` is used in
`src/components/pages/Home.tsx` and
`src/components/SavingsGoals/SavingsGoals.tsx`.

## savedThisMonthService (service)

**1. What does it do?**  
It has the rules for the shared amount. It can read the number, add money,
and block values below 0. Then it asks the repository to save.

**2. Why this logic is here?**  
“Amount cannot be less than 0” is a business rule, not how the page looks.
The hook should not talk to the repository. The service sits in the middle.

**3. Where is it used?**  
`src/services/savedThisMonthService.ts` is used by `useSavedThisMonth`.

## savedThisMonthRepo (repository)

**1. What does it do?**  
It gets and sets one number in memory. It starts from the test data (325).
This is data access only. Home and Savings share this one copy.

**2. Why this logic is here?**  
The repo does not check the number. It only reads and writes. Later we can
change this file to call a real backend without changing the page.

**3. Where is it used?**  
`src/apis/savedThisMonthRepo.ts` is used by `savedThisMonthService`.
It imports `src/data/savedThisMonthTestData.ts`.

## SavedThisMonth type

**1. What does it do?**  
It describes the shared amount: one field called amount.

**2. Why this logic is here?**  
The type is shared by the test data, repo, service, and hook so they all
use the same shape.

**3. Where is it used?**  
`src/types/SavedThisMonth.ts` is imported by the test data.
