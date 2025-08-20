import React, { useEffect, useState } from "react";
import { getBudget, getMonthlySummary } from "../api/budget"; // ✅ fixed path

function Dashboard({ token }) {
  const [budget, setBudget] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [budgetRes, summaryRes] = await Promise.all([
          getBudget(token),
          getMonthlySummary(token)
        ]);
        setBudget(budgetRes);
        setSummary(summaryRes);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      }
    }
    fetchData();
  }, [token]); // ✅ no warning now

  if (!budget || !summary) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Budget: {budget.monthlyBudget} {budget.budgetCurrency}</h3>
      <h3>Total Spent: {summary.totalSpent}</h3>
      <ul>
        {summary.byCategory.map((cat) => (
          <li key={cat._id}>
            {cat._id}: {cat.total}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
