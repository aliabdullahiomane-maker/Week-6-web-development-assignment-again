# SpendWise - Interactive Budgeting Application

## Description
SpendWise is an interactive personal finance dashboard built to process financial data, manage spending records, and give real-time feedback on user budget health.

## Improvements Made This Week
- Replaced static console logging and prompt pop-ups with interactive HTML input forms.
- Replaced standalone variables with an array of expense objects (`expensesList`).
- Connected live user actions to DOM element updates so changes reflect instantly without reloading the page.

## Core JavaScript Concepts Implemented

### 1. Decision Making (Conditionals)
Conditionals (`if...else if...else`) evaluate monthly income against total expenses inside `updateDashboard()`. The application dynamically updates the alert banner's text and toggles visual CSS highlight styles (`info`, `success`, `danger`).

### 2. Working with Arrays
All individual expense records are stored inside the `expensesList` array as object records containing `id`, `category`, `amount`, and `icon` fields. Items are added via `.push()` and removed via `.filter()`.

### 3. Data Processing with Loops
- A standard `for` loop inside `calculateTotalExpenses()` iterates through the array to sum total spending.
- An Array `.forEach()` loop iterates through `expensesList` inside `updateDashboard()` to construct card elements for the DOM.

### 4. Updating the Dashboard (DOM Manipulation)
Text targets (`textContent`) update financial balances instantly, while structural methods (`document.createElement()`, `appendChild()`, and `innerHTML = ""`) update the card grid container dynamically.

### 5. Handling User Interactions (Events)
Forms use `addEventListener("submit", ...)` to intercept submission events, prevent default page reloads via `event.preventDefault()`, extract input values, update backend arrays, and re-render views.

## Challenges Encountered & Resolutions
- **Challenge:** New cards were appending below existing ones, causing duplicate displays on every submission.
- **Resolution:** Reset the grid container (`cardsGrid.innerHTML = ""`) prior to executing the array loop inside `updateDashboard()`.
