import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Load expenses from localStorage on page load
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    console.log(storedExpenses);
    setExpenses(storedExpenses);
    const total = storedExpenses.reduce(
      (acc, expense) => acc + parseFloat(expense.amount),
      0
    );
    setTotalAmount(total);
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = { ...expense, id: Date.now() };
    const updatedExpenses = [...expenses, newExpense];
    console.log(expenses);
    setExpenses(updatedExpenses);
    setTotalAmount((prevAmount) => prevAmount + parseFloat(expense.amount));
  };

  const removeExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);

    const removedExpense = expenses.find((expense) => expense.id === id);
    setTotalAmount(
      (prevAmount) => prevAmount - parseFloat(removedExpense.amount)
    );
  };

  // Filter expenses by category and date
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = categoryFilter
      ? expense.category === categoryFilter
      : true;
    const matchesDate = dateFilter ? expense.date === dateFilter : true;
    return matchesCategory && matchesDate;
  });

  return (
    <div>
      <h1 className="font-bold text-5xl m-3">Expense Tracker</h1>
      <ExpenseForm addExpense={addExpense} />

      <div className="flex flex-col">
        <h2 className="font-bold text-3xl m-3">
          Total Amount: {totalAmount.toFixed(2)}
        </h2>
        <div className="flex justify-end">
          <select
            className="w-28 h-4 p-0 text-xs "
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
          >
            <option value="">Filter</option>
            <option value="Food">Food</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
          </select>

          <input
            className="w-28 h-4 p-0 text-xs"
            type="date"
            onChange={(e) => setDateFilter(e.target.value)}
            value={dateFilter}
          />
        </div>
        <ExpenseList
          expenses={filteredExpenses}
          removeExpense={removeExpense}
        />
      </div>
    </div>
  );
}

export default ExpenseTracker;
