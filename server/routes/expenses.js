import express from "express";
import ExpenseController from "../controllers/expenses.js";

const router = express.Router();

//ACTUAL EXPENESES
// POST request to add a new expense
router.post("/actual/add", ExpenseController.addExpenseActual);

// GET request to fetch all expenses
router.get("/actual/:id", ExpenseController.getExpensesActual);

// PATCH request to update an expense
router.patch("/actual/update/:id", ExpenseController.updateExpenseActual);

// DELETE request to delete an expense
router.delete("/actual/delete/:id", ExpenseController.deleteExpenseActual);


// PREDICTED EXPENESES
// POST request to add a new expense
router.post("/predicted/add", ExpenseController.addExpensePredicted);

// GET request to fetch all expenses for a specific budget_id
router.get("/predicted/:id", ExpenseController.getExpensesPredicted);

// PATCH request to update an expense
router.patch("/predicted/update/:id", ExpenseController.updateExpensePredicted);

// DELETE request to delete an expense
router.delete("/predicted/delete/:id", ExpenseController.deleteExpensePredicted);


// RECURRENT EXPENESES
// POST request to add a new expense
router.post("/recurrent/add", ExpenseController.addExpenseRecurrent);

// GET request to fetch all expenses for a specific budget_id
router.get("/recurrent/:id", ExpenseController.getExpensesRecurrent);

// PATCH request to update an expense
router.patch("/recurrent/update/:id", ExpenseController.updateExpenseRecurrent);

// DELETE request to delete an expense
router.delete("/recurrent/delete/:id", ExpenseController.deleteExpenseRecurrent);

export default router;