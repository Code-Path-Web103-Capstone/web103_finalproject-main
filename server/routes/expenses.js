import express from "express";
import ExpenseController from "../controllers/expenses.js";

const router = express.Router();

// POST request to add a new expense
router.post("/actual/add", ExpenseController.addExpenseActual);

// GET request to fetch all expenses
router.get("/actual/:id", ExpenseController.getExpensesActual);

// PUT request to update an expense
router.put("/actual/update/:id", ExpenseController.updateExpenseActual);

// DELETE request to delete an expense
router.delete("/actual/delete/:id", ExpenseController.deleteExpenseActual);

export default router;