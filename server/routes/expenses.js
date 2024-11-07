import express from "express";
import ExpenseController from "../controllers/expenses.js";

const router = express.Router();

//ACTUAL EXPENESES
// POST request to add a new expense
router.post("/actual/add", ExpenseController.addExpenseActual);

// GET request to fetch all expenses for a specific budget_id
router.get("/actual", ExpenseController.getExpensesActual);

// PATCH request to update an expense budget_id
router.patch("/actual/update", ExpenseController.updateExpenseActual);

// DELETE request to delete an expense budget_id
router.delete("/actual/delete", ExpenseController.deleteExpenseActual);


// PREDICTED EXPENESES
// POST request to add a new expense
router.post("/predicted/add", ExpenseController.addExpensePredicted);

// GET request to fetch all expenses for a specific budget_id
router.get("/predicted", ExpenseController.getExpensesPredicted);

// PATCH request to update an expense
router.patch("/predicted/update", ExpenseController.updateExpensePredicted);

// DELETE request to delete an expense
router.delete("/predicted/delete", ExpenseController.deleteExpensePredicted);


// RECURRENT EXPENESES
// POST request to add a new expense
router.post("/recurrent/add", ExpenseController.addExpenseRecurrent);

// GET request to fetch all expenses for a specific budget_id
router.get("/recurrent", ExpenseController.getExpensesRecurrent);

// PATCH request to update an expense
router.patch("/recurrent/update", ExpenseController.updateExpenseRecurrent);

// DELETE request to delete an expense
router.delete("/recurrent/delete", ExpenseController.deleteExpenseRecurrent);

export default router;