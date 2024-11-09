import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateBudget = () => {
  const [budgetName, setBudgetName] = useState("");
  const [plan, setPlan] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const budgetData = {
      user_id: userId,
      plan,
      budget_name: budgetName,
    };

    try {
      const response = await fetch("http://localhost:3000/api/budget/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(budgetData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newBudget = await response.json();
      const budgetId = newBudget.id; // Assuming the response contains the new budget ID

      navigate(`/actual-incomes-expenses/${userId}/${budgetId}`);
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  return (
    <main className="flex h-auto w-full flex-col items-center border-2 border-red-600 bg-[#D9D9D9]">
      <h2>Create Budget</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Budget Name:
          <input
            type="text"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
            required
          />
        </label>
        <label>
          Plan:
          <input
            type="text"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Budget</button>
      </form>
    </main>
  );
};

export default CreateBudget;