let budget = 0;
let income = 0;
let expenses = [];


/* SET STARTING BUDGET */

function setBudget() {

    let amount = Number(
        document.getElementById("startingBudget").value
    );

    if (amount <= 0) {
        alert("Please enter a valid budget.");
        return;
    }

    budget = amount;

    updateDisplay();

    document.getElementById("startingBudget").value = "";
}


/* ADD INCOME */

function addIncome() {

    let name =
        document.getElementById("incomeName").value.trim();

    let amount =
        Number(document.getElementById("incomeAmount").value);

    if (name === "" || amount <= 0) {
        alert("Please enter the income details.");
        return;
    }

    income += amount;

    updateDisplay();

    document.getElementById("incomeName").value = "";
    document.getElementById("incomeAmount").value = "";
}


/* ADD EXPENSE */

function addExpense() {

    let name =
        document.getElementById("expenseName").value.trim();

    let amount =
        Number(document.getElementById("expenseAmount").value);

    if (name === "" || amount <= 0) {
        alert("Please enter the expense details.");
        return;
    }

    expenses.push({
        name: name,
        amount: amount
    });

    updateDisplay();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}


/* UPDATE EVERYTHING */

function updateDisplay() {

    let totalExpenses = expenses.reduce(
        function(total, expense) {
            return total + expense.amount;
        },
        0
    );

    let balance =
        budget + income - totalExpenses;


    document.getElementById("balance").textContent =
        "₱" + balance.toFixed(2);

    document.getElementById("totalIncome").textContent =
        "₱" + income.toFixed(2);

    document.getElementById("totalExpenses").textContent =
        "₱" + totalExpenses.toFixed(2);


    displayExpenses();
}


/* DISPLAY EXPENSES */

function displayExpenses() {

    let list =
        document.getElementById("expenseList");

    list.innerHTML = "";

    if (expenses.length === 0) {

        list.innerHTML =
            '<p class="empty">No expenses yet 💜';

        return;
    }


    expenses.forEach(function(expense, index) {

        let item =
            document.createElement("div");

        item.className = "expense-item";

        item.innerHTML = `
            <div>
                <strong>${expense.name}</strong>
                <p>₱${expense.amount.toFixed(2)}</p>
            </div>

            <button onclick="deleteExpense(${index})">
                Delete
            </button>
        `;

        list.appendChild(item);
    });
}


/* DELETE EXPENSE */

function deleteExpense(index) {

    let confirmDelete =
        confirm("Delete this expense?");

    if (!confirmDelete) {
        return;
    }

    expenses.splice(index, 1);

    updateDisplay();
}


/* START */

updateDisplay();
