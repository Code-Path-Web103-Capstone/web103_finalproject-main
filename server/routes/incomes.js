import express from "express";
import IncomeController from "../controllers/incomes.js";

const router = express.Router();

// ACTUAL INCOMES
// POST request to add a new income
router.post("/actual/add", IncomeController.addIncomeActual);

// GET request to fetch all incomes for a specific budget_id
router.get("/actual/:id", IncomeController.getIncomesActual);

// PATCH request to update an income
router.patch("/actual/update/:id", IncomeController.updateIncomeActual);

// DELETE request to delete an income
router.delete("/actual/delete/:id", IncomeController.deleteIncomeActual);

// PREDICTED INCOMES
// POST request to add a new income
router.post("/predicted/add", IncomeController.addIncomePredicted);

// GET request to fetch all incomes for a specific budget_id
router.get("/predicted/:id", IncomeController.getIncomesPredicted);

// PATCH request to update an income
router.patch("/predicted/update/:id", IncomeController.updateIncomePredicted);

// DELETE request to delete an income
router.delete("/predicted/delete/:id", IncomeController.deleteIncomePredicted);

// RECURRENT INCOMES
// POST request to add a new income
router.post("/recurrent/add", IncomeController.addIncomeRecurrent);

// GET request to fetch all incomes for a specific budget_id
router.get("/recurrent/:id", IncomeController.getIncomesRecurrent);

// PATCH request to update an income
router.patch("/recurrent/update/:id", IncomeController.updateIncomeRecurrent);

// DELETE request to delete an income
router.delete("/recurrent/delete/:id", IncomeController.deleteIncomeRecurrent);

export default router;