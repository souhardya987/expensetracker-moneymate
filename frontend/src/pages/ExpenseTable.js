import React from "react";

function ExpenseTable({ transactions }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📜 Transactions</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Description</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-3 text-gray-500">
                No transactions yet
              </td>
            </tr>
          ) : (
            transactions.map((t, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{t.description}</td>
                <td
                  className={`p-2 ${
                    t.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.amount}
                </td>
                <td className="p-2">{t.category}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
