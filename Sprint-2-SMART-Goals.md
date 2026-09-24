# Sprint 2 Plan and SMART Goals

This file answers the Sprint 1 feedback: say what is next, name the challenges, and write goals we can measure.

## Sprint 1 feedback we are fixing

- Check-in: the instructor knew the README, style guide, and Savings Goals work, but not what was next or what was hard.
- Team contribution: we need 3–4 specific PR review comments for a teammate, not just a PR description.
- Retrospective: goals must be SMART. We must say how we will know we succeeded.

## Challenges this sprint

- GitHub remote changed to `jasminekaurjogar/Full-Stack-Project`.
- Vercel Hobby blocked teammate preview deploys on a private repo.
- Merge conflicts happen when both people edit `App.tsx`.

## SMART goals

### 1. Multi-page app by Friday

- Specific: Users can open Home (`/`), Savings (`/goals`), and Expenses (`/expenses`) from the same nav.
- Measurable: Three routes work in the browser. The nav stays on every page.
- Achievable: We already added `react-router-dom`, `BrowserRouter`, `Layout`, and `Nav`.
- Relevant: This is team requirement T.1 and T.2.
- Time-bound: Shared routing is merged before we each finish our feature page.
- Done when: clicking Home, Savings, and Expenses changes the URL and the page content.

### 2. Savings Goals page can add and remove goals

- Specific: The `/goals` page has a form (name + target) and a remove button on each card.
- Measurable: Starting with 3 goals, adding one makes 4 cards. Removing one makes 3 cards. The page updates immediately.
- Achievable: The cards already render with `.map()`. This adds `useState` and one form.
- Relevant: This is my individual work (I.1, I.2, I.3).
- Time-bound: Finished and pushed on `feature/savings-goals` this sprint, before the due date.
- Done when: I can add “New Bike, 400” and see the card, then delete it, without refreshing.

### 3. Shared amount stays the same across pages

- Specific: `savedThisMonth` lives in `App` and is passed to both feature pages.
- Measurable: Changing it on Savings, then opening Expenses, still shows the new number.
- Achievable: One `useState` in `App` and two props. Same pattern as the class demo.
- Relevant: This is team requirement T.3.
- Time-bound: Added in the same week as the routes, before feature-page forms.
- Done when: I change the number on one page, click the other page, and the number matches.

### 4. Review Jasmine’s pull request with 4 comments

- Specific: I leave at least 4 comments on her Expense Categories PR. Each comment names a file and a change.
- Measurable: GitHub shows 4 review comments from me on that PR.
- Achievable: I already read `ExpenseCategories.tsx` and her CSS.
- Relevant: This is the team-contribution mark we lost (3/8).
- Time-bound: Comments are posted within 24 hours of her opening the PR.
- Done when: the PR conversation has 4 of my comments, not only “looks good”.

## How I will know Sprint 2 is successful

- The three pages load from the nav.
- I can add and remove a savings goal.
- The shared saved amount is the same on both pages.
- Jasmine’s PR has 4 written review comments from me.
- The Vercel production URL shows the merged Sprint 2 site.
