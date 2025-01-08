import React from 'react';
import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, removeExpense }) {
  return (
    <div>
      {expenses.length === 0 ? (
        <p>No expenses to display</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            removeExpense={removeExpense}
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;
