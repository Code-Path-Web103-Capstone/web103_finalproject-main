import React, { useState, useEffect } from "react";
import { useUser } from "../services/context";
import useUserFinanceData from "../hooks/useUserFinanceData";
import IncomesExpensesTable from "../components/budget/IncomesExpensesTable";

function StatementInput() {
  const {
    actualIncomes,
    setActualIncomes,
    actualExpenses,
    setActualExpenses,
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
        { ...row, type },
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const processRow = async (row, type) => {
      const isUpdate = row.id && row.id !== "";
      const url = isUpdate
        ? `http://localhost:3000/api/${type}/actual/update`
        : `http://localhost:3000/api/${type}/actual/addbulk`;
      const method = isUpdate ? "PATCH" : "POST";
      const body = {
        ...row,
        id: isUpdate ? row.id : undefined, // Remove id for POST requests
      };
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, response: ${errorText}`
        );
      }
      return response.json();
    };

    try {
      const incomeResults = await Promise.all(
        actualIncomes.map((income) => processRow(income, "income"))
      );
      const expenseResults = await Promise.all(
        actualExpenses.map((expense) => processRow(expense, "expense"))
      );

      for (const row of deletedRows) {
        const url = `http://localhost:3000/api/${row.type}/actual/delete`;
        const body = {
          id: row.id,
          budget_id: row.budget_id,
        };

        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, response: ${errorText}`
          );
        }
      }

      console.log("Income Responses:", incomeResults);
      console.log("Expense Responses:", expenseResults);
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

      <form onSubmit={handleSubmit} className="border-2 border-red-500">
        <div>
          <h2>Incomes</h2>
          <IncomesExpensesTable
            rows={actualIncomes}
            setRows={setActualIncomes}
            type="income"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
          <button type="button" onClick={() => handleAddRow(setActualIncomes)}>
            Add Income Row
          </button>
        </div>

        <div>
          <h2>Expenses</h2>
          <IncomesExpensesTable
            rows={actualExpenses}
            setRows={setActualExpenses}
            type="expense"
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />
          <button type="button" onClick={() => handleAddRow(setActualExpenses)}>
            Add Expense Row
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StatementInput;
