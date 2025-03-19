document.getElementById("expense-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("expense-name").value;
    const amount = document.getElementById("expense-amount").value;
    const category = document.getElementById("expense-category").value;

    if (name.trim() === "" || amount.trim() === "") return;

    const table = document.getElementById("expense-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>$${amount}</td>
        <td>${category}</td>
        <td><button onclick="deleteExpense(this)">Delete</button></td>
    `;

    table.appendChild(row);

    document.getElementById("expense-form").reset();
});

function deleteExpense(button) {
    button.parentElement.parentElement.remove();
}
