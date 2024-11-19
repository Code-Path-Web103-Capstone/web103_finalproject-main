import express from "express";
import IncomeController from "../controllers/incomes.js";

const router = express.Router();

// ACTUAL INCOMES
// POST request to add a new income
router.post("/actual/add", IncomeController.addIncomeActual);

// POST request to add multiple incomes
router.post("/actual/addbulk", IncomeController.addIncomesActualBulk);

// GET request to fetch all incomes for a specific budget_id
router.get("/actual/:user_id/:budget_id", IncomeController.getIncomesActual);

// PATCH request to update an income by specific income_id
router.patch("/actual/update", IncomeController.updateIncomeActual);

// DELETE request to delete an income by specific income_id
router.delete("/actual/delete", IncomeController.deleteIncomeActual);
// Delete bulk request to delete an income by specific income_id
router.delete("/actual/deletebulk", IncomeController.deleteIncomesActualBulk);

// PREDICTED INCOMES
// POST request to add a new income
router.post("/predicted/add", IncomeController.addIncomePredicted);

// POST request to add multiple incomes
router.post("/predicted/addbulk", IncomeController.addIncomesPredictedBulk);

// GET request to fetch all incomes for a specific budget_id
router.get("/predicted/:user_id/:budget_id", IncomeController.getIncomesPredicted);

// PATCH request to update an income by specific income_id
router.patch("/predicted/update", IncomeController.updateIncomePredicted);

// DELETE request to delete an income by specific income_id
router.delete("/predicted/delete", IncomeController.deleteIncomePredicted);

// Delete bulk request to delete an income by specific income_id
router.delete("/predicted/deletebulk", IncomeController.deleteIncomesPredictedBulk);

// RECURRENT INCOMES
// POST request to add a new income
router.post("/recurrent/add", IncomeController.addIncomeRecurrent);

// GET request to fetch all incomes for a specific budget_id
router.get("/recurrent", IncomeController.getIncomesRecurrent);

// PATCH request to update an income by specific income_id
router.patch("/recurrent/update", IncomeController.updateIncomeRecurrent);

// DELETE request to delete an income by specific income_id
router.delete("/recurrent/delete", IncomeController.deleteIncomeRecurrent);

export default router;