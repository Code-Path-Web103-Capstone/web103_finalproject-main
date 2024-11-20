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
import Modal from "../components/shared/Modal.jsx";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

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
  const [budgetName, setBudgetName] = useState("");
  const [budgetPlan, setBudgetPlan] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal functionality
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleParserModal = () => {
    openModal(); // Open modal for new budget
  };

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const data = await getBudgetById(budgetId);
        if (data) {
          console.log("Budget data:", data);
          setKeepTrack(data.keep_track);
          setBudgetYear(data.year || "");
          setBudgetName(data.budget_name || "");
          setBudgetPlan(data.plan || "");

          const monthNames = [
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
      <div className="m-5 flex h-16 w-full gap-2 px-24">
        {/* Name and Plan */}
        <div className="flex grow items-center justify-start gap-2 rounded-lg border-2 bg-white px-5 py-5 text-left">
          <h1 className="font-manrope text-2xl font-bold">{budgetName}</h1>
          <span className="h-5 w-0.5 bg-gray-700"></span>
          <p className="mt-0.5 text-sm text-gray-500">{budgetPlan}</p>
        </div>

        {/* Changing Month and Year */}
        <div className="flex items-center justify-center gap-5 rounded-lg border-2 bg-white p-5">
          <div className="flex items-center justify-center">
            <select
              value={budgetMonth}
              onChange={(e) => setBudgetMonth(e.target.value)}
              className="rounded border border-gray-300 bg-white p-2 text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
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
          </div>
          <div className="flex items-center justify-center">
            <select
              value={budgetYear}
              onChange={(e) => setBudgetYear(e.target.value)}
              className="rounded border border-gray-300 bg-white p-2 text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <FaSave
              onClick={handleUpdateBudget}
              className="cursor-pointer text-[#D9D9D9] hover:text-[#3A405A]"
              size={24} // Adjust size as needed
              title="Save Changes"
            />
          </div>
        </div>

        {/* Experimental Parser */}
        <div
          className="flex cursor-pointer items-center justify-center"
          onClick={handleParserModal}
        >
          <div className="group relative rounded-lg p-[1px]">
            {/* Animated gradient border (only on hover) */}
            <div className="absolute inset-0 rounded-lg border bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>

            {/* Button content */}
            <div className="relative flex items-center justify-center rounded-lg bg-white p-5">
              <span className="text-sm font-semibold text-sky-500">
                Experimental Parser
              </span>
            </div>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <UploadPdf />
        </Modal>

        {/* Button for Keeping Track */}
        <button
          onClick={handleUpdateKeepTrack}
          className={`flex items-center space-x-2 rounded-lg border-2 p-5 ${
            keepTrack
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          {keepTrack ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <span>Keep Track</span>
        </button>
      </div>

      <main className="flex w-full gap-2 px-20">
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
      </main>
    </PageLayout>
  );
}

export default StatementInput;
