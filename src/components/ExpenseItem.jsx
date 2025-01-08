import React from 'react';

function ExpenseItem({ expense, removeExpense }) {
  return (
    <div className="expense-item">
      <span>
        {expense.name} - ₹{expense.amount} - {expense.category} - {expense.date}
      </span>
      <button onClick={() => removeExpense(expense.id)}>Delete</button>
    </div>
  );
}

export default ExpenseItem;
