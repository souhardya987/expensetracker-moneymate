import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF", "#FF6F91"];

const CategoryPie = ({ byCategory }) => {
  if (!byCategory || byCategory.length === 0) {
    return <p>No spending data for this month.</p>;
  }

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={byCategory.map(c => ({ name: c._id, value: c.total }))}
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
        dataKey="value"
      >
        {byCategory.map((entry, idx) => (
          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CategoryPie;
