// 1. Data Structures: Array for expense records & variable for income
let monthlyIncome = 0;
let expensesList = [
  { id: 1, category: "Food & Dining", amount: 450.00, icon: "🍔" },
  { id: 2, category: "Transport", amount: 120.50, icon: "🚗" },
  { id: 3, category: "Rent & Housing", amount: 1200.00, icon: "🏠" },
  { id: 4, category: "Entertainment", amount: 85.00, icon: "🎬" },
  { id: 5, category: "Utilities", amount: 160.25, icon: "⚡" }
];

// 2. Target DOM Elements
const incomeForm = document.getElementById("income-form");
const incomeInput = document.getElementById("income-input");
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");

const totalIncomeDisplay = document.getElementById("total-income-display");
const totalExpensesDisplay = document.getElementById("total-expenses-display");
const remainingBalanceDisplay = document.getElementById("remaining-balance-display");
const budgetStatusBanner = document.getElementById("budget-status");
const cardsGrid = document.getElementById("cards-grid");

// 3. Process Array Data with Loops
function calculateTotalExpenses() {
  let total = 0;
  for (let i = 0; i < expensesList.length; i++) {
    total += expensesList[i].amount;
  }
  return total;
}

// 4. Update Webpage Content Dynamically (DOM Manipulation)
function updateDashboard() {
  let totalExpenses = calculateTotalExpenses();
  let remainingBalance = monthlyIncome - totalExpenses;

  // Render Numerical Totals
  totalIncomeDisplay.textContent = `$${monthlyIncome.toFixed(2)}`;
  totalExpensesDisplay.textContent = `$${totalExpenses.toFixed(2)}`;
  remainingBalanceDisplay.textContent = `$${remainingBalance.toFixed(2)}`;

  // Decision Making: Conditionals evaluating budget health
  if (monthlyIncome === 0) {
    budgetStatusBanner.textContent = "Please set your monthly income above to evaluate your budget health.";
    budgetStatusBanner.className = "status-banner info";
  } else if (remainingBalance >= 0) {
    budgetStatusBanner.textContent = `Great job! You are within budget with $${remainingBalance.toFixed(2)} remaining.`;
    budgetStatusBanner.className = "status-banner success";
  } else {
    budgetStatusBanner.textContent = `Warning! You have exceeded your budget by $${Math.abs(remainingBalance).toFixed(2)}.`;
    budgetStatusBanner.className = "status-banner danger";
  }

  // Render Expense Cards Grid using Array iteration (.forEach)
  cardsGrid.innerHTML = "";

  expensesList.forEach((expense) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("tabindex", "0");

    card.innerHTML = `
      <div class="card-header">
        <h3>${expense.category}</h3>
        <span class="icon">${expense.icon || "💳"}</span>
      </div>
      <p class="amount">$${expense.amount.toFixed(2)}</p>
      <button class="delete-btn" onclick="deleteExpense(${expense.id})">Remove</button>
    `;

    cardsGrid.appendChild(card);
  });
}

// 5. Handle User Interactions with Event Listeners
incomeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let parsedIncome = parseFloat(incomeInput.value);
  if (!isNaN(parsedIncome) && parsedIncome >= 0) {
    monthlyIncome = parsedIncome;
    incomeInput.value = "";
    updateDashboard();
  }
});

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let categoryName = expenseNameInput.value.trim();
  let parsedAmount = parseFloat(expenseAmountInput.value);

  if (categoryName !== "" && !isNaN(parsedAmount) && parsedAmount > 0) {
    let newExpense = {
      id: Date.now(),
      category: categoryName,
      amount: parsedAmount,
      icon: "💳"
    };

    expensesList.push(newExpense);
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
    updateDashboard();
  }
});

// Helper function to remove an expense record from array
function deleteExpense(id) {
  expensesList = expensesList.filter((item) => item.id !== id);
  updateDashboard();
}

// Initial render call
updateDashboard();