# Piggy Bank

A personal finance app for tracking expenses, savings goals, and monthly progress.

## Team

- Sehajpreet Kaur — Savings Goals page, routing setup, shared layout
- Jasmine Kaur — Expense Categories page

## Repository

https://github.com/jasminekaurjogar/Full-Stack-Project

## What is finished (Sprint 1)

- Vite + React + TypeScript project
- Style guide and homepage layout
- Savings Goals section
- Expense Categories section

## What we are building now (Sprint 2)

- Multi-page navigation with React Router (`/`, `/goals`, `/expenses`)
- Shared header, nav, and footer on every page
- Shared `savedThisMonth` state that both pages can show and change
- Savings Goals page: form to add a goal, button to remove a goal
- Expense Categories page: form to add a category, button to remove a category

## What is next this week

1. Finish the shared `Layout`, `Nav`, `Footer`, and routes
2. Sehajpreet completes the Savings Goals page (form + add/remove)
3. Jasmine completes the Expense Categories page (form + add/remove)
4. Each person reviews the other person’s pull request with 3–4 specific comments
5. Merge into `develop`, then `main`, and use the Vercel production URL

## Current challenges

- The GitHub repo moved to Jasmine’s account. All new commits go to this repo, not the old Sprint 1 repo.
- Vercel Hobby blocked collaborator previews while the repo was private. The repo is public now. Production deploys after a merge to `main`.
- We should not both edit `App.tsx` at the same time. Shared routing goes in first, then each person stays in their own folder.

## How to run

```powershell
npm install
npm run dev
```

## Tech

- Vite
- React
- TypeScript
- CSS
- React Router
