import React, { useState, useEffect } from "react";
import { useUser } from "../services/context";
import useUserFinanceData from "../hooks/useUserFinanceData";
import IncomesExpensesTable from "../components/budget/IncomesExpensesTable";
import { processRow, deleteRow } from "../services/api";

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
    loading,
    error,
  } = useUserFinanceData();

  const [deletedRows, setDeletedRows] = useState([]);
  const { user, budgetId } = useUser(); // Get user and budgetId from context instead of passing as a param

  const handleAddRow = (setRows) => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: "",
        date_posted: "",
        description: "",
        amount: "",
        category: "",
        budget_id: budgetId,
      },
    ]);
  };

  const handleDeleteRow = (index, rows, setRows, type) => {
  const row = rows[index];
  if (row.id) {
    setDeletedRows((prevDeletedRows) => [
      ...prevDeletedRows,
      { ...row, type: type.split('_')[0] },
    ]);
   }
  setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, event, setRows) => {
    const { name, value } = event.target;
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index][name] = value;
      return newRows;
    });
  };

  const handleActualSubmit = async (event) => {
  event.preventDefault();

  try {
    const incomeResults = await Promise.all(
      actualIncomes.map((income) => processRow(income, "income", "actual"))
    );
    const expenseResults = await Promise.all(
      actualExpenses.map((expense) => processRow(expense, "expense", "actual"))
    );

    for (const row of deletedRows) {
      await deleteRow(row, "actual");
    }

    console.log("Income Responses:", incomeResults);
    console.log("Expense Responses:", expenseResults);
  } catch (error) {
    console.error("Error:", error);
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

    for (const row of deletedRows) {
      await deleteRow(row, "predicted");
    }

    console.log("Expected Income Responses:", expectedIncomeResults);
    console.log("Expected Expense Responses:", expectedExpenseResults);
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div>
      <h1>USER ON THIS PAGE</h1>
      <p>{user?.id}</p>
      <h1>BUDGET ON THIS PAGE</h1>
      <p>{budgetId}</p>

      <form onSubmit={handleActualSubmit} className="border-2 border-red-500">
        <div>
          <h2>Actual Incomes</h2>
          <IncomesExpensesTable
            rows={actualIncomes}
            setRows={setActualIncomes}
            type="income_actual"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
          <button type="button" onClick={() => handleAddRow(setActualIncomes)}>
            Add Income Row
          </button>
        </div>

        <div>
          <h2>Actual Expenses</h2>
          <IncomesExpensesTable
            rows={actualExpenses}
            setRows={setActualExpenses}
            type="expense_actual"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
          <button type="button" onClick={() => handleAddRow(setActualExpenses)}>
            Add Expense Row
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>

      <form onSubmit={handleExpectedSubmit} className="border-2 border-blue-500">
        <div>
          <h2>Expected Incomes</h2>
          <IncomesExpensesTable
            rows={expectedIncomes}
            setRows={setExpectedIncomes}
            type="income_predicted"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
          <button type="button" onClick={() => handleAddRow(setExpectedIncomes)}>
            Add Expected Income Row
          </button>
        </div>

        <div>
          <h2>Expected Expenses</h2>
          <IncomesExpensesTable
            rows={expectedExpenses}
            setRows={setExpectedExpenses}
            type="expense_predicted"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
          <button type="button" onClick={() => handleAddRow(setExpectedExpenses)}>
            Add Expected Expense Row
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StatementInput;