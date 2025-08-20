const API_URL = process.env.REACT_APP_API_URL;

export async function getBudget(token) {
  const res = await fetch(`${API_URL}/api/budget`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch budget");
  return res.json();
}

export async function updateBudget(token, payload) {
  const res = await fetch(`${API_URL}/api/budget`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update budget");
  return res.json();
}

export async function getMonthlySummary(token, monthStr) {
  const url = monthStr
    ? `${API_URL}/api/expenses/summary?month=${monthStr}`
    : `${API_URL}/api/expenses/summary`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
}
