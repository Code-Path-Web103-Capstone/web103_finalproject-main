import express from "express";
import ExpenseController from "../controllers/expenses.js";

const router = express.Router();

//ACTUAL EXPENESES
// POST request to add a new expense
router.post("/actual/add", ExpenseController.addExpenseActual);

// POST request to add multiple expenses
router.post("/actual/addbulk", ExpenseController.addExpensesActualBulk);

// GET request to fetch all expenses for a specific budget_id
router.get("/actual/:user_id/:budget_id", ExpenseController.getExpensesActual);

// PATCH request to update an expense budget_id
router.patch("/actual/update", ExpenseController.updateExpenseActual);

// DELETE request to delete an expense budget_id
router.delete("/actual/delete", ExpenseController.deleteExpenseActual);
// DELETE BUlK request to delete an expense budget_id
router.delete("/actual/deletebulk", ExpenseController.deleteExpensesActualBulk);


// PREDICTED EXPENESES
// POST request to add a new expense
router.post("/predicted/add", ExpenseController.addExpensePredicted);

// POST request to add multiple expenses
router.post("/predicted/addbulk", ExpenseController.addExpensesPredictedBulk);

// GET request to fetch all expenses for a specific budget_id
router.get("/predicted/:user_id/:budget_id", ExpenseController.getExpensesPredicted);

// PATCH request to update an expense
router.patch("/predicted/update", ExpenseController.updateExpensePredicted);

// DELETE request to delete an expense
router.delete("/predicted/delete", ExpenseController.deleteExpensePredicted);

// DELETE BUlK request to delete an expense
router.delete("/predicted/deletebulk", ExpenseController.deleteExpensesPredictedBulk);


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