const form = document.getElementById('transaction-form');
const tableBody = document.getElementById('transaction-table');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceEl = document.getElementById('balance');

let transactions = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  transactions.push({ date, description, amount, type });
  form.reset();
  renderTransactions();
});

function renderTransactions() {
  tableBody.innerHTML = '';
  let income = 0, expense = 0;

  transactions.forEach((txn, index) => {
    if (txn.type === 'Income') income += txn.amount;
    else expense += txn.amount;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${txn.date}</td>
      <td>${txn.description}</td>
      <td>₹${txn.amount}</td>
      <td>${txn.type}</td>
      <td><button onclick="deleteTransaction(${index})">❌</button></td>
    `;
    tableBody.appendChild(row);
  });

  const balance = income - expense;

  totalIncomeEl.textContent = income.toFixed(2);
  totalExpenseEl.textContent = expense.toFixed(2);
  balanceEl.textContent = balance.toFixed(2);

  renderChart(income, expense);
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
}

let chart;
function renderChart(income, expense) {
  const ctx = document.getElementById('chart').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [{
        data: [income, expense],
        backgroundColor: ['#4CAF50', '#F44336']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}
