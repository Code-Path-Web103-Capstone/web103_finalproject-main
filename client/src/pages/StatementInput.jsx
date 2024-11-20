import React, { useState, useEffect } from "react";
import { useUser } from "../services/context";
import useUserFinanceData from "../hooks/useUserFinanceData";
import IncomesExpensesTable from "../components/budget/IncomesExpensesTable";
import {
  processRow,
  deleteRow,
  deleteExpensesActualBulk,
  deleteIncomesActualBulk,
  deleteIncomesPredictedBulk,
  deleteExpensesPredictedBulk,
  updateKeepTrack,
  getBudgetById,
  updateBudget,
} from "../services/api";
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
  const [keepTrack, setKeepTrack] = useState(false);
  const [budgetYear, setBudgetYear] = useState("");
  const [budgetMonth, setBudgetMonth] = useState("");

  useEffect(() => {
  const fetchBudget = async () => {
    try {
      const data = await getBudgetById(budgetId);
      if (data) {
        setKeepTrack(data.keep_track);
        setBudgetYear(data.year || "");

        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const monthIndex = monthNames.indexOf(data.month) + 1;
        setBudgetMonth(monthIndex || "");
      }
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  fetchBudget();
}, [budgetId]);

  const handleAddRow = (setRows) => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: "",
        date_posted: new Date().toISOString().split("T")[0],
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
        { ...row, type: type.split("_")[0] },
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
        actualExpenses.map((expense) =>
          processRow(expense, "expense", "actual")
        )
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
        expectedIncomes.map((income) =>
          processRow(income, "income", "predicted")
        )
      );
      const expectedExpenseResults = await Promise.all(
        expectedExpenses.map((expense) =>
          processRow(expense, "expense", "predicted")
        )
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

  const handleUpdateKeepTrack = async () => {
    try {
      const newKeepTrack = !keepTrack;
      const response = await updateKeepTrack(budgetId, user.id, newKeepTrack);
      console.log(response.message);
      setKeepTrack(newKeepTrack);
    } catch (error) {
      console.error("Error updating keep_track:", error);
    }
  };

  const handleUpdateBudget = async () => {
    const fetchBudget = async () => {
      try {
        const data = await getBudgetById(budgetId);
        if (data) {
          setKeepTrack(data.keep_track);
          setBudgetYear(data.year || "");

          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          const monthIndex = monthNames.indexOf(data.month) + 1;
          setBudgetMonth(monthIndex || "");
        }
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };

    try {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const monthName = monthNames[budgetMonth - 1];

      const updates = {
        id: budgetId,
        user_id: user.id,
        year: budgetYear,
        month: budgetMonth,
        month_name: monthName,
      };
      const response = await updateBudget(budgetId, updates);
      console.log(response.message);
      await fetchBudget(); // Call fetchBudget after updating the budget
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  return (
    <PageLayout>
      <div className="flex w-full gap-2 p-20">
        <form
          onSubmit={handleActualSubmit}
          className="flex w-1/2 flex-col space-y-3 rounded-xl p-4"
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
          <SubmitStatementButton text="Submit Actuals" />
        </form>
        <form
          onSubmit={handleExpectedSubmit}
          className="flex w-1/2 flex-col space-y-3 rounded-xl p-4"
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
          <SubmitStatementButton text="Submit Expected" />
        </form>
      </div>

      <UploadPdf />

      <div className="mt-4">
        <button onClick={handleUpdateKeepTrack} className="p-2 bg-blue-500 text-white rounded">
          {keepTrack ? "Disable Keep Track" : "Enable Keep Track"}
        </button>
        <span className="ml-2">Current Keep Track: {keepTrack ? "True" : "False"}</span>
      </div>

      <div className="mt-4">
        <label>
          Budget Year:
          <select value={budgetYear} onChange={(e) => setBudgetYear(e.target.value)}>
            <option value="">Select Year</option>
            {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
            ))}
          </select>
        </label>
        <label>
          Budget Month:
          <select value={budgetMonth} onChange={(e) => setBudgetMonth(e.target.value)}>
            <option value="">Select Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleUpdateBudget} className="p-2 bg-green-500 text-white rounded">
          Edit Budget
        </button>
      </div>
    </PageLayout>
  );
}

export default StatementInput;