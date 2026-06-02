
/* 
let transaction = [
    { id: 1, date: "2026-05-07", amount: -440, status: "Success", type: "expense" },
    { id: 2, date: "2026-05-07", amount: -440, status: "Success", type: "expense" },
    { id: 3, date: "2026-05-07", amount: -440, status: "Success", type: "expense" }
];

let monthlyIncome = 2645;
let monthlyExpense = 1895;

const today = new Date().toISOString().split("T")[0];

const input = document.getElementById('incomeDate');
if (input) {
    input.value = today;
}

function openIncomeModal() {
    document.getElementById('incomeModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openExpenseModal() {
    document.getElementById('expenseModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
    if (modalId === 'incomeModal') {
        document.getElementById('incomeForm').reset();
        document.getElementById('incomeDate').value = today;
    } else {
        document.getElementById('expenseForm').reset();
        document.getElementById('expenseDate').value = today;
    }
}

window.onclick = function(event) {
    const incomeModal = document.getElementById('incomeModal');
    const expenseModal = document.getElementById('expenseModal');
    if (event.target === incomeModal) {
        closeModal('incomeModal');
    }
    if (event.target === expenseModal) {
        closeModal('expenseModal');
    }
}

function addIncome(event) {
    const amount = parseFloat(document.getElementById('incomeAmount').value);
    const date = document.getElementById('incomeDate').value;
    const description = document.getElementById('incomeDescription').value;
    const category = document.getElementById('incomeCategory').value;
    
    if (!amount || !date || !description || !category) {
        alert('Please fill in all fields');
        return;
    }
    const newIncome = {
        id: transaction.length + 1,
        date: date,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount: amount,
        status: "Success",
        type: "income",
        description: description,
    };
    transaction.unshift(newIncome);
    monthlyIncome += amount;
    updateDashboard();
    updateTransactionsTable();
    closeModal('incomeModal');
    showNotification('Income added successfully!');
}

function addExpense(event) {
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const date = document.getElementById('expenseDate').value;
    const description = document.getElementById('expenseDescription').value;
    const category = document.getElementById('expenseCategory').value;
    
    if (!amount || !date || !description || !category) {
        alert('Please fill in all fields');
        return;
    }
    const newExpense = {
        id: transaction.length + 1,
        date: date,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount: -amount,
        status: "Success",
        type: "expense",
        description: description,
    };
    transaction.unshift(newExpense);
    monthlyExpense += amount;
    updateDashboard();
    updateTransactionsTable();
    closeModal('expenseModal');
    showNotification('Expense added successfully!');
}

function updateDashboard() {
    document.querySelector('.income-amount').textContent = `$${monthlyIncome.toLocaleString()}.00`;
    document.querySelector('.expense-amount').textContent = `$${monthlyExpense.toLocaleString()}.00`;
    let spendingLimit = 12645
    const usedAmount = monthlyExpense;
    const percentage = (usedAmount / spendingLimit) * 100;
    document.querySelector('spending-limit').textContent = `$${(spendingLimit-usedAmount).toLocaleString()}.00`;
    document.querySelector('.progress-fill').style.width = `${Math.min(percentage, 100)}%`;
}

function updateTransactionsTable() {
    const tbody = document.querySelector('#transactions-Table tbody');
    tbody.innerHTML = '';
    const recentTransactions = transaction.slice(0, 10);
    recentTransactions.forEach((transaction) => {
        const row = document.createElement('tr');
        const formattedDate = new Date(transaction.date).toLocaleDateString(
            'en-US', 
            { month: 'short', day: 'numeric', year: 'numeric' });
        const amountDisplay = transaction.amount < 0 ? `+$${Math.abs(transaction.amount).toLocaleString()}.00` : `-$${Math.abs(transaction.amount).toLocaleString()}.00`;
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${transaction.category}</td>
            <td style="color: ${transaction.amount < 0 ? 'green' : 'red'};">${amountDisplay}</td>
            <td><span class="status ${transaction.status.toLowerCase()}">${transaction.status}</span></td>
            <td><button class ="action-btn"><i class="fas fa-ellipsis-h"></i></button></td>
        `;
        tbody.appendChild(row);
    });
}

function showNotification(message, type='success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
    top: 2rem;
    right: 2rem;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1001;
    animation: fadeIn 0.3s ease;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    `
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {transform: translateX(100%); opacity: 0; }
        to {transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from {transform: translateX(0); opacity: 1; }
        to {transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    updateTransactionsTable();
});
----------------
function loadUserName() {
    const name = localStorage.getItem("userName") || "User";

    const userName = document.getElementById("userName");
    const cardHolder = document.getElementById("cardHolder");

    if (userName) {
        userName.textContent = name;
    }

    if (cardHolder) {
        cardHolder.textContent = name;
    }
}

let transaction = [
    { id: 1, date: "2026-05-07", category: "Subscription", amount: -440, status: "Success", type: "expense" },
    { id: 2, date: "2026-05-07", category: "Subscription", amount: -440, status: "Success", type: "expense" },
    { id: 3, date: "2026-05-07", category: "Subscription", amount: -440, status: "Success", type: "expense" }
];

let monthlyIncome = 2645;
let monthlyExpense = 1895;

const today = new Date().toISOString().split("T")[0];

document.addEventListener("DOMContentLoaded", () => {
    setDefaultDates();
    updateDashboard();
    updateTransactionsTable();
});

function setDefaultDates() {
    const incomeDate = document.getElementById("incomeDate");
    const expenseDate = document.getElementById("expenseDate");

    if (incomeDate) incomeDate.value = today;
    if (expenseDate) expenseDate.value = today;
}

function openIncomeModal() {
    document.getElementById("incomeModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function openExpenseModal() {
    document.getElementById("expenseModal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.style.display = "none";
    document.body.style.overflow = "auto";

    if (modalId === "incomeModal") {
        document.getElementById("incomeForm").reset();
        document.getElementById("incomeDate").value = today;
    }

    if (modalId === "expenseModal") {
        document.getElementById("expenseForm").reset();
        document.getElementById("expenseDate").value = today;
    }
}

window.onclick = function (event) {
    const incomeModal = document.getElementById("incomeModal");
    const expenseModal = document.getElementById("expenseModal");

    if (event.target === incomeModal) {
        closeModal("incomeModal");
    }

    if (event.target === expenseModal) {
        closeModal("expenseModal");
    }
};

function addIncome() {
    const amount = parseFloat(document.getElementById("incomeAmount").value);
    const date = document.getElementById("incomeDate").value;
    const description = document.getElementById("incomeDescription").value.trim();
    const category = document.getElementById("incomeCategory").value;

    if (!amount || amount <= 0 || !date || !description || !category) {
        showNotification("Please fill in all fields correctly", "error");
        return;
    }

    const newIncome = {
        id: Date.now(),
        date: date,
        category: formatCategory(category),
        amount: amount,
        status: "Success",
        type: "income",
        description: description
    };

    transaction.unshift(newIncome);
    monthlyIncome += amount;

    updateDashboard();
    updateTransactionsTable();
    closeModal("incomeModal");
    showNotification("Income added successfully!");
}

function addExpense() {
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const date = document.getElementById("expenseDate").value;
    const description = document.getElementById("expenseDescription").value.trim();
    const category = document.getElementById("expenseCategory").value;

    if (!amount || amount <= 0 || !date || !description || !category) {
        showNotification("Please fill in all fields correctly", "error");
        return;
    }

    const newExpense = {
        id: Date.now(),
        date: date,
        category: formatCategory(category),
        amount: -amount,
        status: "Success",
        type: "expense",
        description: description
    };

    transaction.unshift(newExpense);
    monthlyExpense += amount;

    updateDashboard();
    updateTransactionsTable();
    closeModal("expenseModal");
    showNotification("Expense added successfully!");
}

function formatCategory(category) {
    return category
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, char => char.toUpperCase());
}

function updateDashboard() {
    const incomeAmount = document.querySelector(".income-amount");
    const expenseAmount = document.querySelector(".expense-amount");
    const spendingLimitText = document.querySelector(".spending-limit");
    const progressFill = document.querySelector(".progress-fill");

    if (incomeAmount) {
        incomeAmount.textContent = `৳${monthlyIncome.toLocaleString()}.00`;
    }

    if (expenseAmount) {
        expenseAmount.textContent = `৳${monthlyExpense.toLocaleString()}.00`;
    }

    const spendingLimit = 12645;
    const usedAmount = monthlyExpense;
    const remainingAmount = spendingLimit - usedAmount;
    const percentage = (usedAmount / spendingLimit) * 100;

    if (spendingLimitText) {
        spendingLimitText.textContent = `৳${remainingAmount.toLocaleString()}.00`;
    }

    if (progressFill) {
        progressFill.style.width = `${Math.min(percentage, 100)}%`;
    }
}

function updateTransactionsTable() {
    const tbody = document.querySelector(".transactions-table tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    const recentTransactions = transaction.slice(0, 10);

    recentTransactions.forEach(item => {
        const row = document.createElement("tr");

        const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

        const amountDisplay =
            item.amount >= 0
                ? `+৳${item.amount.toLocaleString()}.00`
                : `-৳${Math.abs(item.amount).toLocaleString()}.00`;

        const amountColor = item.amount >= 0 ? "green" : "red";

        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${item.category}</td>
            <td style="color: ${amountColor}; font-weight: 600;">${amountDisplay}</td>
            <td><span class="status-success">${item.status}</span></td>
            <td><button class="action-btn"><i class="fas fa-ellipsis-h"></i></button></td>
        `;

        tbody.appendChild(row);
    });
}

function showNotification(message, type = "success") {
    const oldNotification = document.querySelector(".custom-notification");
    if (oldNotification) {
        oldNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = "custom-notification";

    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 2000;
        background: ${type === "success" ? "#4CAF50" : "#f44336"};
        font-weight: 600;
        animation: notificationIn 0.3s ease;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "notificationOut 0.3s ease";

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

const notificationStyle = document.createElement("style");
notificationStyle.textContent = `
    @keyframes notificationIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes notificationOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);
document.addEventListener("DOMContentLoaded", () => {
    loadUserName();
    setDefaultDates();
    updateDashboard();
    updateTransactionsTable();
});

document.addEventListener("DOMContentLoaded", function () {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
        return;
    }

    const userName = localStorage.getItem("userName") || "User";

    const monthlyIncome = localStorage.getItem("monthlyIncome") || 0;
    const monthlyExpense = localStorage.getItem("monthlyExpense") || 0;

    const cardHolderName = localStorage.getItem("cardHolderName") || userName;
    const cardType = localStorage.getItem("cardType") || "Primary Wallet";
    const cardNumber = localStorage.getItem("cardNumber") || "0000 0000 0000 0000";
    const cardSpendingLimit = localStorage.getItem("cardSpendingLimit") || 0;

    const userNameElement = document.getElementById("userName");
    const dashboardIncome = document.getElementById("dashboardIncome");
    const dashboardExpense = document.getElementById("dashboardExpense");
    const cardHolder = document.getElementById("cardHolder");
    const dashboardCardType = document.getElementById("dashboardCardType");
    const dashboardCardNumber = document.getElementById("dashboardCardNumber");
    const dashboardSpendingLimit = document.getElementById("dashboardSpendingLimit");
    const dashboardSpendingUsed = document.getElementById("dashboardSpendingUsed");
    const dashboardTotalExpenses = document.getElementById("dashboardTotalExpenses");

    if (userNameElement) {
        userNameElement.textContent = userName;
    }

    if (dashboardIncome) {
        dashboardIncome.textContent = formatMoney(monthlyIncome);
    }

    if (dashboardExpense) {
        dashboardExpense.textContent = formatMoney(monthlyExpense);
    }

    if (cardHolder) {
        cardHolder.textContent = cardHolderName;
    }

    if (dashboardCardType) {
        dashboardCardType.textContent = "Linked to your " + cardType;
    }

    if (dashboardCardNumber) {
        dashboardCardNumber.textContent = cardNumber;
    }

    if (dashboardSpendingLimit) {
        dashboardSpendingLimit.textContent = formatMoney(cardSpendingLimit);
    }

    if (dashboardSpendingUsed) {
        dashboardSpendingUsed.textContent = "Used from " + formatMoney(monthlyExpense);
    }

    if (dashboardTotalExpenses) {
        dashboardTotalExpenses.textContent = formatMoney(monthlyExpense);
    }

    loadLastTransactions();
});

function formatMoney(amount) {
    amount = Number(amount);

    if (isNaN(amount)) {
        amount = 0;
    }

    return "৳" + amount.toLocaleString("en-BD") + ".00";
}

function loadLastTransactions() {
    const transactionBody = document.getElementById("transactionBody");

    if (!transactionBody) {
        return;
    }

    const savedTransactions = localStorage.getItem("lastTransactions");
    const transactions = savedTransactions ? JSON.parse(savedTransactions) : [];

    transactionBody.innerHTML = "";

    if (transactions.length === 0) {
        transactionBody.innerHTML = `
            <tr>
                <td colspan="6">No transaction found</td>
            </tr>
        `;
        return;
    }

    transactions.forEach(function (transaction) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.category}</td>
            <td>${transaction.description}</td>
            <td>${formatMoney(transaction.amount)}</td>
            <td><span class="status-success">Success</span></td>
            <td>
                <button class="action-btn">
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                </button>
            </td>
        `;

        transactionBody.appendChild(row);
    });
}

function formatDate(dateValue) {
    if (!dateValue) {
        return "No date";
    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
        return dateValue;
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}
    */
   
   document.addEventListener("DOMContentLoaded", function () {
    loadDashboard();
});

function loadDashboard() {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
        return;
    }

    const userName = localStorage.getItem("userName") || "User";
    const monthlyIncome = Number(localStorage.getItem("monthlyIncome")) || 0;
    const monthlyExpense = Number(localStorage.getItem("monthlyExpense")) || 0;

    const cardHolderName = localStorage.getItem("cardHolderName") || userName;
    const cardType = localStorage.getItem("cardType") || "Primary Wallet";
    const cardNumber = localStorage.getItem("cardNumber") || "0000 0000 0000 0000";
    const cardSpendingLimit = Number(localStorage.getItem("cardSpendingLimit")) || 0;

    document.getElementById("userName").textContent = userName;
    document.getElementById("dashboardIncome").textContent = formatMoney(monthlyIncome);
    document.getElementById("dashboardExpense").textContent = formatMoney(monthlyExpense);
    document.getElementById("cardHolder").textContent = cardHolderName;
    document.getElementById("dashboardCardType").textContent = "Linked to your " + cardType;
    document.getElementById("dashboardCardNumber").textContent = cardNumber;
    document.getElementById("dashboardSpendingLimit").textContent = formatMoney(cardSpendingLimit);
    document.getElementById("dashboardTotalExpenses").textContent = formatMoney(monthlyExpense);

    loadLastTransactions();
    generateGraph(monthlyIncome, monthlyExpense);
}

function formatMoney(amount) {
    return "৳" + Number(amount).toLocaleString("en-BD") + ".00";
}
/*
function generateGraph(income, expense) {
    const chartWrapper = document.getElementById("chartWrapper");

    if (!chartWrapper) return;

    chartWrapper.innerHTML = "";

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const maxValue = Math.max(income, expense, 1);

    months.forEach((month, index) => {
        const incomeVariation = income * (0.7 + Math.random() * 0.3);
        const expenseVariation = expense * (0.6 + Math.random() * 0.35);

        const incomeHeight = (incomeVariation / maxValue) * 220;
        const expenseHeight = (expenseVariation / maxValue) * 220;

        const item = document.createElement("div");
        item.className = "chart-item";

        item.innerHTML = `
            <div class="chart-bar active" style="height:230px; position:relative;">
                <div class="chart-bar-income"
                    style="
                        height:${incomeHeight}px;
                        width:28px;
                        background:#10b981;
                        position:absolute;
                        bottom:0;
                        left:8px;
                        border-radius:10px 10px 0 0;
                    ">
                </div>

                <div class="chart-bar-expense"
                    style="
                        height:${expenseHeight}px;
                        width:28px;
                        background:#f97316;
                        position:absolute;
                        bottom:0;
                        right:8px;
                        border-radius:10px 10px 0 0;
                    ">
                </div>
            </div>
            <span>${month}</span>
        `;

        chartWrapper.appendChild(item);
    });
}*/
function generateGraph(income, expense) {
    const chartWrapper = document.getElementById("chartWrapper");

    if (!chartWrapper) {
        return;
    }

    chartWrapper.innerHTML = "";

    income = Number(income) || 0;
    expense = Number(expense) || 0;

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const incomeRates = [0.72, 0.78, 0.82, 0.88, 0.92, 0.95, 0.9, 0.96, 1, 0.94, 0.89, 1];
    const expenseRates = [0.55, 0.58, 0.62, 0.68, 0.7, 0.74, 0.72, 0.76, 0.8, 0.78, 0.82, 1];

    const maxValue = Math.max(income, expense, 1);

    months.forEach(function (month, index) {
        let monthIncome = Math.round(income * incomeRates[index]);
        let monthExpense = Math.round(expense * expenseRates[index]);

        if (index === 11) {
            monthIncome = income;
            monthExpense = expense;
        }

        const incomeHeight = Math.max((monthIncome / maxValue) * 220, 4);
        const expenseHeight = Math.max((monthExpense / maxValue) * 220, 4);

        const column = document.createElement("div");
        column.className = "chart-column";

        column.innerHTML = `
            <div class="chart-tooltip">
                <strong>${month}</strong><br>
                Income: ${formatMoney(monthIncome)}<br>
                Expense: ${formatMoney(monthExpense)}
            </div>

            <div class="bar-group">
                <div class="single-bar income-bar" style="height: ${incomeHeight}px;"></div>
                <div class="single-bar expense-bar" style="height: ${expenseHeight}px;"></div>
            </div>

            <div class="month-label">${month}</div>
        `;

        chartWrapper.appendChild(column);
    });
}

function loadLastTransactions() {
    const transactionBody = document.getElementById("transactionBody");

    if (!transactionBody) return;

    const savedTransactions = JSON.parse(
        localStorage.getItem("lastTransactions")
    ) || [];

    transactionBody.innerHTML = "";

    if (savedTransactions.length === 0) {
        transactionBody.innerHTML = `
            <tr>
                <td colspan="6">No transaction found</td>
            </tr>
        `;
        return;
    }

    savedTransactions.forEach((transaction) => {
        transactionBody.innerHTML += `
            <tr>
                <td>${formatDate(transaction.date)}</td>
                <td>${transaction.category}</td>
                <td>${transaction.description}</td>
                <td>${formatMoney(transaction.amount)}</td>
                <td><span class="status-success">Success</span></td>
                <td>
                    <button class="action-btn">
                        <i class="fa fa-ellipsis-h"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

function loadGraph() {
    const chartWrapper = document.getElementById("chartWrapper");
    if (!chartWrapper) return;

    const history = JSON.parse(localStorage.getItem("graphHistory")) || [];

    chartWrapper.innerHTML = "";

    if (history.length === 0) {
        chartWrapper.innerHTML = "<p>No graph data yet</p>";
        return;
    }

    const maxValue = Math.max(
        ...history.map(item => Math.max(item.income, item.expense)),
        1
    );

    history.forEach(item => {
        const incomeHeight = (item.income / maxValue) * 220;
        const expenseHeight = (item.expense / maxValue) * 220;

        const column = document.createElement("div");
        column.className = "chart-column";

        column.innerHTML = `
            <div class="chart-tooltip">
                <strong>${item.label}</strong><br>
                Income: ${formatMoney(item.income)}<br>
                Expense: ${formatMoney(item.expense)}
            </div>

            <div class="bar-group">
                <div class="single-bar income-bar" style="height:${incomeHeight}px"></div>
                <div class="single-bar expense-bar" style="height:${expenseHeight}px"></div>
            </div>

            <div class="month-label">${item.label}</div>
        `;

        chartWrapper.appendChild(column);
    });
}
-->