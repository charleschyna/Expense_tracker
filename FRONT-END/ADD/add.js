document.addEventListener("DOMContentLoaded", () => {
    const addForm = document.getElementById("addForm");
    const expenseList = document.getElementById("expenseList");
    const clearAllBtn = document.getElementById("clearAllBtn");

    addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const description = document.getElementById("description").value;
        const amount = document.getElementById("amount").value;
        const category = document.getElementById("category").value;
        addExpense(name, date, description, amount, category);
    });

    clearAllBtn.addEventListener("click", clearAllExpenses);

    function addExpense(name, date, description, amount, category) {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const newExpense = { id: Date.now(), name, date, description, amount, category };
        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpense(newExpense);
        addForm.reset();
    }

    function displayExpense(expense) {
        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";
        expenseItem.setAttribute("data-id", expense.id);
        expenseItem.innerHTML = `
            <p><strong>Name:</strong> ${expense.name}</p>
            <p><strong>Date:</strong> ${expense.date}</p>
            <p><strong>Description:</strong> ${expense.description}</p>
            <p><strong>Amount:</strong> ${expense.amount}</p>
            <p><strong>Category:</strong> ${expense.category}</p>
            <button class="delete-btn" data-id="${expense.id}">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
    }

    function loadExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.forEach(expense => displayExpense(expense));
    }

    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = e.target.getAttribute("data-id");
            console.log("Delete button clicked for ID:", id); // Debug log
            deleteExpense(Number(id));
        }
    });

    function deleteExpense(id) {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        const expenseItem = document.querySelector(`.expense-item[data-id='${id}']`);
        if (expenseItem) {
            expenseItem.remove();
        }
    }

    function clearAllExpenses() {
        // Clear local storage
        localStorage.removeItem('expenses');
        
        // Clear displayed expenses
        while (expenseList.firstChild) {
            expenseList.removeChild(expenseList.firstChild);
        }
    }

    loadExpenses();
});


