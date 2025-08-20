import React, { useState } from "react";
import Navbar from "../components/Navbar";
import CategoryPie from "../components/CategoryPie";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";

function Home() {
  const user = { name: "Souhardya" };
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(5000);

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, { ...transaction, id: Date.now() }]);
  };

  const updateTransaction = (updated) => {
    setTransactions(prev =>
      prev.map(t => t.id === updated.id ? updated : t)
    );
  };

  const income = transactions.filter(t => t.type === "income").reduce((a,b)=>a+b.amount,0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((a,b)=>a+b.amount,0);
  const balance = income - expenses;

  const byCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={() => console.log("Logout clicked")} />

      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <ExpenseForm addTransaction={addTransaction} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <ExpenseTable transactions={transactions} updateTransaction={updateTransaction} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-xl font-bold mb-4">💰 Budget</h2>
            <input
              type="number"
              value={budget}
              onChange={e=>setBudget(Number(e.target.value))}
              className="border p-2 rounded mb-2 w-full text-right"
            />
            <p>Income: ₹{income}</p>
            <p>Expenses: ₹{expenses}</p>
            <p className="font-bold">Balance: ₹{balance}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <CategoryPie 
              byCategory={byCategory} 
              transactions={transactions} 
              updateTransaction={updateTransaction} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
