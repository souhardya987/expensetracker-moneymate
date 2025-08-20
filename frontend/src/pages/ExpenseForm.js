import React, { useState } from "react";

function ExpenseForm({ addTransaction }) {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState({ description: "", amount: "", category: "" });

  const handleExpenseChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(income){
      addTransaction({ type: "income", description: "Income", amount: Number(income) });
      setIncome("");
    }
    if(expense.description && expense.amount && expense.category){
      addTransaction({ type: "expense", ...expense, amount: Number(expense.amount) });
      setExpense({ description: "", amount: "", category: "" });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">➕ Add Transactions</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Income amount"
          value={income}
          onChange={e => setIncome(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="description"
          placeholder="Expense description"
          value={expense.description}
          onChange={handleExpenseChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="amount"
          placeholder="Expense amount"
          value={expense.amount}
          onChange={handleExpenseChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <select
          name="category"
          value={expense.category}
          onChange={handleExpenseChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Transactions
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
