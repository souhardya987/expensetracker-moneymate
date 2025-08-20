import React from "react";

const BudgetCard = ({ totalSpent, monthlyBudget, currency }) => {
  const pct = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
      <h3>Monthly Budget</h3>
      <p>
        {currency} {totalSpent} / {currency} {monthlyBudget}
      </p>
      <div style={{ background: "#eee", borderRadius: "6px", overflow: "hidden", height: "20px" }}>
        <div
          style={{
            width: `${Math.min(pct, 100)}%`,
            background: pct > 100 ? "red" : pct > 70 ? "orange" : "green",
            height: "100%",
            transition: "0.3s ease"
          }}
        />
      </div>
      <p style={{ fontSize: "12px", marginTop: "5px" }}>{pct.toFixed(1)}% of budget used</p>
    </div>
  );
};

export default BudgetCard;
