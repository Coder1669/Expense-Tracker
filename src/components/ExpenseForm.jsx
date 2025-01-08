import React, { useState } from 'react';

function ExpenseForm({ addExpense }) {
  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.name && expense.amount && expense.category && expense.date) {
      addExpense(expense);
      setExpense({ name: '', amount: '', category: '', date: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id = "expense"
        type="text"
        name="name"
        value={expense.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        type="number"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <select
        name="category"
        value={expense.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Vegetabels">Vegetables</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
      </select>
      <input
        type="date"
        name="date"
        value={expense.date}
        onChange={handleChange}
        required
      /> 
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
