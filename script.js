let balance = 0;
let totalIncome = 0;
let totalExpenses = 0;

let expenses = [];


/* SET STARTING BUDGET */

function setBudget() {

    let startingBudget =
        Number(document.getElementById("startingBudget").value);

    if (startingBudget <= 0) {
        alert("Please enter a valid budget.");
        return;
    }

    balance = startingBudget;
    totalIncome = startingBudget;
    totalExpenses = 0;
    expenses = [];

    updateDisplay();
    displayExpenses();

    document.getElementById("startingBudget").value = "";
}


/* ADD INCOME */

function addIncome() {

    let name =
        document.getElementById("incomeName").value;

    let amount =
        Number(document.getElementById("incomeAmount").value);

    if (name === "") {
        alert("Please enter where the income came from.");
        return;
    }

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    balance += amount;
    totalIncome += amount;

    updateDisplay();

    document.getElementById("incomeName").value = "";
    document.getElementById("incomeAmount").value = "";

    alert("Income added successfully!");
}


/* ADD EXPENSE */

function addExpense() {

    let item =
        document.getElementById("expenseName").value;

    let amount =
        Number(document.getElementById("expenseAmount").value);

    if (item === "") {
        alert("Please enter what you bought.");
        return;
    }

    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (amount > balance) {
        alert("You don't have enough budget!");
        return;
    }

    expenses.push({
        name: item,
        amount: amount
    });

    balance -= amount;
    totalExpenses += amount;

    updateDisplay();
    displayExpenses();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}


/* DELETE EXPENSE */

function deleteExpense(index) {

    let deletedExpense = expenses[index];

    balance += deletedExpense.amount;
    totalExpenses -= deletedExpense.amount;

    expenses.splice(index, 1);

    updateDisplay();
    displayExpenses();
}


/* UPDATE NUMBERS */

function updateDisplay() {

    document.getElementById("balance").innerText =
        "₱" + balance.toFixed(2);

    document.getElementById("totalIncome").innerText =
        "₱" + totalIncome.toFixed(2);

    document.getElementById("totalExpenses").innerText =
        "₱" + totalExpenses.toFixed(2);
}


/* DISPLAY EXPENSES */

function displayExpenses() {

    let list =
        document.getElementById("expenseList");

    list.innerHTML = "";

    if (expenses.length === 0) {

        list.innerHTML =
            '<p class="empty">No expenses yet 💜</p>';

        return;
    }

    for (let i = 0; i < expenses.length; i++) {

        let expense = document.createElement("div");

        expense.className = "expense-item";

        expense.innerHTML = `
            <div class="expense-info">
                <strong>🛍️ ${expenses[i].name}</strong>
                <span>₱${expenses[i].amount.toFixed(2)}</span>
            </div>

            <button
                class="delete-button"
                onclick="deleteExpense(${i})">
                🗑️
            </button>
        `;

        list.appendChild(expense);
    }
}
