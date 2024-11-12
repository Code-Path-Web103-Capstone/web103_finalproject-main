import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/context";
import { createBudget } from "../services/api";

const CreateBudget = () => {
  const [plan, setPlan] = useState("");
  const [budgetName, setBudgetName] = useState("");
  const { user, setBudgetId } = useUser(); // Access user ID from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBudget = await createBudget(user.id, plan, budgetName);
      const budgetId = newBudget.id;
      setBudgetId(budgetId);

      navigate(`/actual-incomes-expenses`); // redirects to /user.id/budgetId (user logged in // last budget created)
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  return (
    <main className="flex h-auto w-full flex-grow flex-col items-center border-2 border-red-600 bg-[#D9D9D9]">
      <h1>USER ON THIS PAGE</h1>
      <p>{user?.id}</p>

      <div className="container flex w-1/3 flex-col items-center justify-center gap-4 rounded-lg border-2 bg-stone-400 p-10">
        <h1 className="font-anonymous text-4xl">Create Budget</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Budget Name:"
            type="text"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
            required
          />

          <input
            placeholder="Plan:"
            type="text"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            required
          />

          <button
            className="w-full rounded-md bg-[#3A405A] px-4 py-2 font-medium text-white hover:bg-[#292e40] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            type="submit"
          >
            Create Budget
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateBudget;
