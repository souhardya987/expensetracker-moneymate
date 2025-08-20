import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryPie({ byCategory, transactions, updateTransaction }) {
  const labels = Object.keys(byCategory);
  const data = Object.values(byCategory);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Expenses by Category',
        data,
        backgroundColor: [
          '#4F46E5', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#F472B6'
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleEditCategory = (oldCategory, newCategory) => {
    transactions
      .filter(t => t.category === oldCategory)
      .forEach(t => updateTransaction({...t, category: newCategory}));
  };

  return (
    <div>
      {labels.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses yet</p>
      ) : (
        <>
          <Pie data={chartData} />
          <div className="mt-4">
            {labels.map(label => (
              <div key={label} className="flex items-center justify-between mb-2">
                <span>{label}</span>
                <input
                  type="text"
                  placeholder="Edit category"
                  className="border p-1 rounded"
                  onBlur={(e) => handleEditCategory(label, e.target.value)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryPie;
