import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../services/context";
import { createBudget } from "../../services/api";

const CreateBudgetForm = ({ onClose }) => {
  const [plan, setPlan] = useState("");
  const [budgetName, setBudgetName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const { user, setBudgetId } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBudget = await createBudget(
        user.id,
        plan,
        budgetName,
        month,
        year
      );
      const budgetId = newBudget.id;
      setBudgetId(budgetId);

      navigate(`/statement-input`); // Redirects to statement input page
      onClose(); // Close the modal after navigating
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  const months = [
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

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="mb-4 font-anonymous text-2xl">Create Budget</h1>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <input
          placeholder="Budget Name:"
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 p-2"
        />

        <input
          placeholder="Plan:"
          type="text"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 p-2"
        />

        {/* Month Selector */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 p-2"
        >
          <option value="" disabled>
            Select Month
          </option>
          {months.map((m, index) => (
            <option key={index} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Year Input */}
        <input
          placeholder="Year:"
          type="number"
          min="2000"
          max="2100"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 p-2"
        />

        <button
          className="w-full rounded-md bg-[#3A405A] px-4 py-2 font-medium text-white hover:bg-[#292e40] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          type="submit"
        >
          Create Budget
        </button>
      </form>
    </div>
  );
};

export default CreateBudgetForm;
