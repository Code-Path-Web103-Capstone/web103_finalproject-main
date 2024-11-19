import React, { useState } from "react";
import { useUser } from "../services/context";
import useUserFinanceData from "../hooks/useUserFinanceData";
import IncomesExpensesTable from "../components/budget/IncomesExpensesTable";
import { processRow, deleteRow, deleteExpensesActualBulk, deleteIncomesActualBulk, deleteIncomesPredictedBulk, deleteExpensesPredictedBulk } from "../services/api";
import TableHeader from "../components/budget/TableHeader";
import UploadPdf from "../components/budget/UploadPdf.jsx";
import ParseButton from "../components/budget/ParseButton.jsx";
import SimpleParseButton from "../components/budget/ParseButton.jsx";
import TDParser from "../components/budget/TDParser.jsx";
import PostParser from "../components/budget/PostParser.jsx";
import SubmitStatementButton from "../components/budget/SubmitStatementButton.jsx";
import PageLayout from "../layouts/PageLayout.jsx";

function StatementInput() {
  const {
    actualIncomes,
    setActualIncomes,
    actualExpenses,
    setActualExpenses,
    expectedIncomes,
    setExpectedIncomes,
    expectedExpenses,
    setExpectedExpenses,
  } = useUserFinanceData();

  const [deletedRows, setDeletedRows] = useState([]);
  const { user, budgetId } = useUser();

  // Add a new empty row
  const handleAddRow = (setRows) => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: "",
        date_posted: new Date().toISOString().split("T")[0], // Ensure date_posted is not empty
        description: "",
        amount: "",
        category: "",
        budget_id: budgetId,
      },
    ]);
  };

  // Delete a row
  const handleDeleteRow = (index, rows, setRows, type) => {
    const row = rows[index];
    if (row.id) {
      setDeletedRows((prevDeletedRows) => [
        ...prevDeletedRows,
        { ...row, type: type.split("_")[0] },
      ]);
    }
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  // Handle input change for each row
  const handleInputChange = (index, event, setRows) => {
    const { name, value } = event.target;
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index][name] = value;
      return newRows;
    });
  };

  // Submit data for actual incomes and expenses
const handleActualSubmit = async (event) => {
  event.preventDefault();

  try {
    const incomeResults = await Promise.all(
      actualIncomes.map((income) => processRow(income, "income", "actual"))
    );
    const expenseResults = await Promise.all(
      actualExpenses.map((expense) => processRow(expense, "expense", "actual"))
    );

    const incomeIdsToDelete = deletedRows
      .filter((row) => row.type === "income")
      .map((row) => row.id);
    const expenseIdsToDelete = deletedRows
      .filter((row) => row.type === "expense")
      .map((row) => row.id);

    if (incomeIdsToDelete.length > 0) {
      await deleteIncomesActualBulk(incomeIdsToDelete, budgetId);
    }

    if (expenseIdsToDelete.length > 0) {
      await deleteExpensesActualBulk(expenseIdsToDelete, budgetId);
    }

    console.log("Income Responses:", incomeResults);
    console.log("Expense Responses:", expenseResults);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    window.location.reload();
  }
};

const handleExpectedSubmit = async (event) => {
  event.preventDefault();

  try {
    const expectedIncomeResults = await Promise.all(
      expectedIncomes.map((income) => processRow(income, "income", "predicted"))
    );
    const expectedExpenseResults = await Promise.all(
      expectedExpenses.map((expense) => processRow(expense, "expense", "predicted"))
    );

    const incomeIdsToDelete = deletedRows
      .filter((row) => row.type === "income")
      .map((row) => row.id);
    const expenseIdsToDelete = deletedRows
      .filter((row) => row.type === "expense")
      .map((row) => row.id);

    if (incomeIdsToDelete.length > 0) {
      await deleteIncomesPredictedBulk(incomeIdsToDelete, budgetId);
    }

    if (expenseIdsToDelete.length > 0) {
      await deleteExpensesPredictedBulk(expenseIdsToDelete, budgetId);
    }

    console.log("Expected Income Responses:", expectedIncomeResults);
    console.log("Expected Expense Responses:", expectedExpenseResults);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    window.location.reload();
  }
};

  return (
    <PageLayout>
      {/* Table Container */}
      <div className="flex w-full gap-2 p-20">
        {/* Form for Actual Incomes and Expenses */}
        <form
          onSubmit={handleActualSubmit}
          className="bg-budgetblue flex w-1/2 flex-col space-y-3 rounded-xl p-4"
        >
          <IncomesExpensesTable
            title="Actual Incomes"
            handleAddRow={handleAddRow}
            rows={actualIncomes}
            setRows={setActualIncomes}
            type="income_actual"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
          <IncomesExpensesTable
            title="Actual Expenses"
            handleAddRow={handleAddRow}
            rows={actualExpenses}
            setRows={setActualExpenses}
            type="expense_actual"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
          {/* Submit Actual Incomes to DB */}
          <SubmitStatementButton text="Submit Actuals" />
        </form>
        {/* Form for Expected Incomes and Expenses */}
        <form
          onSubmit={handleExpectedSubmit}
          className="bg-budgetblue flex w-1/2 flex-col space-y-3 rounded-xl p-4"
        >
          <IncomesExpensesTable
            handleAddRow={handleAddRow}
            title="Expected Incomes"
            rows={expectedIncomes}
            setRows={setExpectedIncomes}
            type="income_predicted"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />

          <IncomesExpensesTable
            title="Expected Expenses"
            handleAddRow={handleAddRow}
            rows={expectedExpenses}
            setRows={setExpectedExpenses}
            type="expense_predicted"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
          {/* Submit Expected Incomes to DB */}
          <SubmitStatementButton text="Submit Expected" />
        </form>
      </div>

      {/* Render the UploadPdf component as a button */}
      <UploadPdf />
    </PageLayout>
  );
}

export default StatementInput;
