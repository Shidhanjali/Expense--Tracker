
async function addExpense() {
  const description = document.getElementById('expense-description').value.trim();
  const amount = parseFloat(document.getElementById('expense-amount').value.trim());


  if (description && amount) {
      try {
         
          const response = await fetch('http://localhost:4500/api/expenses', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ description, amount })
          });

        
          const data = await response.json();

        
          if (response.ok) {
             
              document.getElementById('expense-description').value = '';
              document.getElementById('expense-amount').value = '';

              renderExpense(data.expense);
          } else {
              
              alert(data.message || 'Failed to add expense');
          }
      } catch (error) {
          console.error('Error adding expense:', error);
          alert('Failed to add expense. Please try again.');
      }
  } else {
   
      alert('Please enter both description and amount.');
  }
}


async function deleteExpense(id) {
  try {
     
      const response = await fetch(`http://localhost:4500/api/expenses/${id}`, {
          method: 'DELETE'
      });

      
      const data = await response.json();

    
      if (response.ok) {
         
          const expenseElement = document.getElementById(`expense-${id}`);
          expenseElement.parentNode.removeChild(expenseElement);
      } else {
          
          alert(data.message || 'Failed to delete expense');
      }
  } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
  }
}


function renderExpense(expense) {
  const expensesList = document.getElementById('expenses');
  const li = document.createElement('li');
  li.id = `expense-${expense._id}`;
  li.textContent = `${expense.description}: $${expense.amount.toFixed(2)}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteExpense(expense._id);
  li.appendChild(deleteButton);

  expensesList.appendChild(li);
}


async function fetchExpenses() {
  try {
      
      const response = await fetch('http://localhost:4500/api/expenses');

     
      const data = await response.json();

     
      if (response.ok) {
         
          data.expenses.forEach(expense => {
              renderExpense(expense);
          });
      } else {
        
          alert(data.message || 'Failed to fetch expenses');
      }
  } catch (error) {
      console.error('Error fetching expenses:', error);
      alert('Failed to fetch expenses. Please try again.');
  }
}

fetchExpenses();
