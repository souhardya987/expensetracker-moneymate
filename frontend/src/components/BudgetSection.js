import React, { useEffect, useState } from "react";

function BudgetSection({ monthlyBudget, setMonthlyBudget, expenseAmt }) {
  const [inputBudget, setInputBudget] = useState(monthlyBudget);

  // Sync localStorage whenever budget changes
  useEffect(() => {
    localStorage.setItem("monthlyBudget", monthlyBudget);
  }, [monthlyBudget]);

  // Update budget on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputBudget >= 0) {
      setMonthlyBudget(Number(inputBudget));
    }
  };

  const remaining = monthlyBudget - expenseAmt;
  const spentPercent =
    monthlyBudget > 0 ? Math.min((expenseAmt / monthlyBudget) * 100, 100) : 0;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">💡 Monthly Budget</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
        <input
          type="number"
          value={inputBudget}
          onChange={(e) => setInputBudget(e.target.value)}
          placeholder="Enter budget"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Save
        </button>
      </form>

      <div className="bg-gray-100 rounded-lg p-4">
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Budget:</span> ₹{monthlyBudget || 0}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Spent:</span> ₹{expenseAmt}
        </p>
        <p
          className={`mb-2 font-semibold ${
            remaining < 0 ? "text-red-600" : "text-green-600"
          }`}
        >
          Remaining: ₹{remaining}
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-300 h-3 rounded-full">
          <div
            className={`h-3 rounded-full ${
              remaining < 0 ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${spentPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default BudgetSection;
