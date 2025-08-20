const router = require("express").Router();
const { getBudget, updateBudget, getMonthlySummary } = require("../Controllers/budgetController");
const auth = require("../middleware/auth"); // your JWT auth middleware

router.get("/budget", auth, getBudget);
router.put("/budget", auth, updateBudget);
router.get("/expenses/summary", auth, getMonthlySummary);

module.exports = router;
