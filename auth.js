/* auth.js */
/*
function togglePassword(id, btn) {
    const input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "Hide";
    } else {
        input.type = "password";
        btn.textContent = "Show";
    }
}

function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Fill all fields");
        return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Account created successfully!");
    window.location.href = "login.html";
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (email === savedEmail && password === savedPassword) {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong email or password");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "welcome.html";
}
    */
   function togglePassword(id, btn) {
    const input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "Hide";
    } else {
        input.type = "password";
        btn.textContent = "Show";
    }
}

function signup() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!name || !email || !password) {
        alert("Fill all fields");
        return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    localStorage.setItem("loggedIn", "true");

    localStorage.removeItem("monthlyIncome");
    localStorage.removeItem("monthlyExpense");
    localStorage.removeItem("cardHolderName");
    localStorage.removeItem("cardType");
    localStorage.removeItem("cardNumber");
    localStorage.removeItem("cardSpendingLimit");
    localStorage.removeItem("lastTransactions");
    localStorage.removeItem("infoCompleted");

    
    window.location.href = "infoUpdate.html";
}

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (email === savedEmail && password === savedPassword) {
        localStorage.setItem("loggedIn", "true");

        const infoCompleted = localStorage.getItem("infoCompleted");

        if (infoCompleted === "true") {
            window.location.href = "dashboard.html";
        } else {
            window.location.href = "infoUpadate.html";
        }

    } else {
        alert("Wrong email or password");
    }
}

function saveDashboardInfo() {
    const monthlyIncome = document.getElementById("monthlyIncome").value.trim();
    const monthlyExpense = document.getElementById("monthlyExpense").value.trim();

    const cardHolderName = document.getElementById("cardHolderName").value.trim();
    const cardType = document.getElementById("cardType").value;
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const cardSpendingLimit = document.getElementById("cardSpendingLimit").value.trim();

    const t1Amount = document.getElementById("t1Amount").value.trim();
    const t1Category = document.getElementById("t1Category").value.trim();
    const t1Description = document.getElementById("t1Description").value.trim();
    const t1Date = document.getElementById("t1Date").value;

    const t2Amount = document.getElementById("t2Amount").value.trim();
    const t2Category = document.getElementById("t2Category").value.trim();
    const t2Description = document.getElementById("t2Description").value.trim();
    const t2Date = document.getElementById("t2Date").value;

    const t3Amount = document.getElementById("t3Amount").value.trim();
    const t3Category = document.getElementById("t3Category").value.trim();
    const t3Description = document.getElementById("t3Description").value.trim();
    const t3Date = document.getElementById("t3Date").value;

    if (
        !monthlyIncome || !monthlyExpense ||
        !cardHolderName || !cardType || !cardNumber || !cardSpendingLimit ||
        !t1Amount || !t1Category || !t1Description || !t1Date ||
        !t2Amount || !t2Category || !t2Description || !t2Date ||
        !t3Amount || !t3Category || !t3Description || !t3Date
    ) {
        alert("Please fill all information");
        return;
    }

    localStorage.setItem("monthlyIncome", monthlyIncome);
    localStorage.setItem("monthlyExpense", monthlyExpense);

    localStorage.setItem("cardHolderName", cardHolderName);
    localStorage.setItem("cardType", cardType);
    localStorage.setItem("cardNumber", cardNumber);
    localStorage.setItem("cardSpendingLimit", cardSpendingLimit);

    const transactions = [
        {
            amount: t1Amount,
            category: t1Category,
            description: t1Description,
            date: t1Date
        },
        {
            amount: t2Amount,
            category: t2Category,
            description: t2Description,
            date: t2Date
        },
        {
            amount: t3Amount,
            category: t3Category,
            description: t3Description,
            date: t3Date
        }
    ];

    localStorage.setItem("lastTransactions", JSON.stringify(transactions));
    localStorage.setItem("infoCompleted", "true");

    alert("Information saved successfully!");
    window.location.href = "dashboard.html";
}

const graphHistory = [
    {
        label: "Start",
        income: Number(monthlyIncome),
        expense: Number(monthlyExpense)
    }
];

localStorage.setItem("graphHistory", JSON.stringify(graphHistory));

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "welcome.html";
}