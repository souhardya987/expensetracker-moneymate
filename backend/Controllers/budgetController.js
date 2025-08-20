const { startOfMonth, endOfMonth } = require("date-fns");
const Expense = require("../Models/Expense");
const User = require("../Models/User");


exports.getBudget = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("monthlyBudget budgetCurrency");
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch budget" });
  }
};


exports.updateBudget = async (req, res) => {
  try {
    const { monthlyBudget, budgetCurrency } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { monthlyBudget, ...(budgetCurrency ? { budgetCurrency } : {}) },
      { new: true, runValidators: true }
    ).select("monthlyBudget budgetCurrency");
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: "Failed to update budget" });
  }
};


exports.getMonthlySummary = async (req, res) => {
  try {
    const { month } = req.query; 
    const [year, mm] = month ? month.split("-").map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
    const monthStart = startOfMonth(new Date(year, (mm - 1), 1));
    const monthEnd = endOfMonth(monthStart);

    const byCategory = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: monthStart, $lte: monthEnd }
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } }
    ]);

    const totalSpent = byCategory.reduce((s, x) => s + x.total, 0);
    res.json({ totalSpent, byCategory });
  } catch (e) {
    res.status(500).json({ message: "Failed to get summary" });
  }
};
