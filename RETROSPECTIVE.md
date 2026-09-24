# Sprint 1 Retrospective

**Project:** Piggy Bank
**Team Members:** Jasmine Kaur, Sehajpreet Kaur
**Sprint:** 1
**Date:** September 14, 2026

## Sprint Summary

For Sprint 1 we set up our project repository, initialized a Vite + React +
TypeScript application, wrote our README and style guide, and each built one
high-level React component. Sehajpreet built the `SavingsGoals` component and
handled the `App.tsx` integration and site-wide styling. I built the
`ExpenseCategories` component, which displays four student spending categories
(Food, Transportation, School Supplies, and Entertainment) with their monthly
budgets, and renders them from an array using `.map()`.

## What Went Well

**Small, focused commits made our work easy to follow.** I broke my component
into eight separate commits, each doing one thing: creating the component and
its TypeScript interface, adding the data array, adding the budget summary,
rendering the cards with `.map()`, adding the stylesheet, adding the card grid,
integrating into `App.tsx`, and updating the colours. Anyone reviewing the
branch can see exactly how the component was built.

**Branch protection rules forced us into a proper workflow.** Because `main` and
`develop` were both protected from direct pushes, we had no choice but to work
on feature branches and go through pull requests. This prevented us from
accidentally breaking the shared branch.

**The pull request review was genuinely useful.** When I reviewed Sehajpreet's
pull request for the `SavingsGoals` component, I was able to read her code
before it reached `develop`, which is how I discovered that our two components
were using different CSS class naming conventions and different colour palettes.

**Dividing the work by component meant we could work in parallel.** Because my
`ExpenseCategories` component and her `SavingsGoals` component lived in separate
folders, we were able to build them at the same time without blocking each
other.

**We met the technical requirements for our individual components.** My
component renders a single `<section>` with a matching `className`, contains
multiple child HTML elements, initializes a list of data, and renders it
iteratively with unique `key` properties. The production build compiles with no
TypeScript errors and the browser console has no React warnings.

## What Did Not Go Well

**The project was renamed partway through the sprint without being agreed on
first.** I built my component believing the project was called "MoneyMap," while
the README, page heading, and logo were being changed to "Piggy Bank." I only
found out when I read my teammate's branch. Nothing broke technically, but for a
while our two branches described two differently named products.

**The style guide was rewritten after our components were already styled.** I
wrote my component's CSS using the original navy blue (`#26358c`) and sky blue
(`#2c8ecb`) from `STYLEGUIDE.md`. The style guide was then replaced with a cream
and brown palette (`#8b6f5a`, `#c9a27e`, `#faf4ed`). My component still worked,
but it looked completely out of place next to the rest of the page and I had to
rewrite all of my CSS colour values to match.

**Our component files got copied between branches instead of being merged.** My
`ExpenseCategories.tsx` and `ExpenseCategories.css` files ended up inside my
teammate's feature branch and were merged into `develop` through her pull
request rather than mine. The code works, but the Git history now credits my
component to someone else's commit, and my own pull request has almost nothing
left to contribute.

**The `develop` branch was reset mid-sprint.** At one point `develop` was rolled
back to an empty initial commit containing only `README.md`, even though the
project setup, README, and style guide had already been committed. This meant
neither of us could reliably branch from `develop` or treat it as the current
state of the project.

**Our feature branches drifted apart before being merged.** Because we both
worked for several days without syncing, by the time we tried to merge, our
branches conflicted on the same files. We were resolving problems at merge time
that we could have caught on day two.

**Some commit messages were not descriptive.** Messages like "changes" do not
explain what was changed, which makes the history hard to read and makes it
harder to find where a specific change was introduced.

## What We Will Do Differently Next Sprint

**Lock the project name and style guide before writing any component code.** In
the first team meeting of Sprint 2, we will confirm the project name, colour
palette, font sizes, and CSS class naming convention, and commit them to
`STYLEGUIDE.md` before either of us starts a component. Any later change to the
style guide must be proposed as its own pull request and approved by both of us
before anyone restyles their component.

**Never copy a teammate's files into our own branch.** If one of us needs the
other's component in order to work, we will run `git merge origin/<their-branch>`
so their commits and authorship are preserved. The rule we agreed on is that
only the author of a component edits the files inside that component's folder.
If we want a change to someone else's component, we request it in a pull request
comment instead of editing it ourselves.

**Each person opens their own pull request for their own work.** Every component
will reach `develop` through a pull request from its author's branch, reviewed
and approved by the other team member. This keeps the contribution history
accurate for both of us.

**Sync every feature branch with `develop` at least once a day.** We will each
run `git fetch` followed by `git merge origin/develop` on our feature branch
daily, so that conflicts are found and fixed while they are small instead of at
the end of the sprint.

**Treat `develop` as permanent and never rewrite it.** We will not force-push or
reset `develop` under any circumstances. If something needs to be undone, we
will do it with a new commit or a revert commit so no work disappears from the
shared history.

**Write commit messages that describe the change.** Every commit message will
start with a verb and name what changed, for example "Add expense category data
array" rather than "changes". We will review each other's commit messages during
pull request review and ask for a rewrite if a message is unclear.

**Agree on our integration point up front.** Because `App.tsx` is the one file
we both need to edit, we will decide at the start of Sprint 2 who owns it, and
the other person will add their component to it only after the owner's changes
are merged into `develop`.
