import React, { useState } from "react";
import { useUser } from "../services/context";
import useUserFinanceData from "../hooks/useUserFinanceData";
import IncomesExpensesTable from "../components/budget/IncomesExpensesTable";
import { processRow, deleteRow } from "../services/api";
import { MdAddBox } from "react-icons/md";
import TableHeader from "../components/budget/TableHeader";

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
        date_posted: "",
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
        actualExpenses.map((expense) =>
          processRow(expense, "expense", "actual")
        )
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

  // Submit data for expected incomes and expenses
  const handleExpectedSubmit = async (event) => {
    event.preventDefault();

    try {
      const expectedIncomeResults = await Promise.all(
        expectedIncomes.map((income) =>
          processRow(income, "income", "predicted")
        )
      );
      const expectedExpenseResults = await Promise.all(
        expectedExpenses.map((expense) =>
          processRow(expense, "expense", "predicted")
        )
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
      {/* Form for Actual Incomes and Expenses */}
      <form
        onSubmit={handleActualSubmit}
        className="border-2 border-red-500 p-4"
      >
        <div>
          <TableHeader
            handleAddRow={handleAddRow}
            setRows={setActualIncomes}
            title="Actual Incomes"
          />
          <IncomesExpensesTable
            rows={actualIncomes}
            setRows={setActualIncomes}
            type="income_actual"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
        </div>

        <div>
          <TableHeader
            handleAddRow={handleAddRow}
            setRows={setActualExpenses}
            title="Actual Expenses"
          />
          <IncomesExpensesTable
            rows={actualExpenses}
            setRows={setActualExpenses}
            type="expense_actual"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 p-2 text-white"
        >
          Submit Actuals
        </button>
      </form>

      {/* Form for Expected Incomes and Expenses */}
      <form
        onSubmit={handleExpectedSubmit}
        className="mt-6 border-2 border-blue-500 p-4"
      >
        <div>
          <TableHeader
            handleAddRow={handleAddRow}
            setRows={setExpectedIncomes}
            title="Expected Incomes"
          />
          <IncomesExpensesTable
            rows={expectedIncomes}
            setRows={setExpectedIncomes}
            type="income_predicted"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
        </div>

        <div>
          <TableHeader
            handleAddRow={handleAddRow}
            setRows={setExpectedExpenses}
            title="Expected Expenses"
          />
          <IncomesExpensesTable
            rows={expectedExpenses}
            setRows={setExpectedExpenses}
            type="expense_predicted"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-green-500 p-2 text-white"
        >
          Submit Expected
        </button>
      </form>
    </div>
  );
}

export default StatementInput;
