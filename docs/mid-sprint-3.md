Sprint 3: I split it so each file has one job.

- **Page** = what you see
- **Hook** = the list and buttons
- **Service** = the rules (name cannot be empty)
- **Repository** = save and load the data

When I add a goal: page → hook → service → repo.

I work on `feature/savings-goals`. Later: pull request to `develop`, then `main`.

## What I changed (show these files)

### 1. `src/types/SavingsGoal.ts`

This is the shape of one goal: id, name, target, saved, image, note.
Every savings file uses this type.

### 2. `src/data/savingsGoalTestData.ts`

Sprint 3 needs at least 10 test goals. They live in this file.
The page still shows 3 so the screen is not too full.

### 3. `src/apis/savingsGoalRepo.ts`

This file only stores data: get, add, remove, update.
It does not check the form. Later we can point it at a real database.

### 4. `src/services/savingsGoalService.ts`

This file has the rules. If the name is empty or the target is 0,
it says no and does not save. That is business logic.

### 5. `src/hooks/useSavingsGoals.ts`

This hook keeps the list and the form.
When I add a goal, it asks the service, not the repo.
The comment at the top lists what it returns.

### 6. `src/components/SavingsGoals/SavingsGoals.tsx`

The page is presentation only. It calls `useSavingsGoals()`.
It still has add, edit, complete, and remove.

### 7. `docs/architecture-sk.md`

This explains what the hook, service, and repo do,
why that layer, and where they are used.

## Demo

Open `/goals`. Add a goal. Edit. Complete. Remove.

## What I have not done yet (after mid-sprint)

- `savedThisMonth` still comes from App as props. Next I will use a hook for that.
- The goals hook is used on the Savings page. Next I will use it in a second component.
- Jasmine is changing Expenses style. I kept my cards.

## Retrospective from Sprint 2

Last sprint I said I would:

1. Add Jasmine as a reviewer before I merge
2. Run `npm run build` before code goes to `main`
3. Not merge if GitHub says it cannot merge

What I am doing now:

- I only edit Savings files. I do not touch her CSS. She will change her own style.
- I work on a feature branch. I will not push this straight to `main`.
- After the full sprint I will open a PR to `develop` and wait for her review.
- When I merge to `main`, I will run `npm run build` first.

I started on the wrong branch once, so now I check `git branch --show-current` before I commit.

## One sentence

I split Savings into a type, 10 test goals, a repository, a service, and a hook.
The page uses the hook. Next I will move the shared saved amount off props
and use the hook in a second component.
