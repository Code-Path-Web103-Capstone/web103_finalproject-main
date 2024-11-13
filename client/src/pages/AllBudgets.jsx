import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/context";
import useBudgets from "../hooks/useBudgets";
import BudgetCard from "../components/budget/BudgetCard";

function AllBudgets() {
  const { user } = useUser();
  const { budgets } = useBudgets(user.id);
  const navigate = useNavigate();

  // Navigate to the create budget page
  const handleCreateBudget = () => {
    navigate(`/create-budget`);
  };

  return (
    <main className="flex h-auto w-full flex-grow flex-col items-center border-2 border-red-600 bg-[#D9D9D9]">
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Budgets</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Card for creating a new budget */}
          <BudgetCard variant="new" onClick={handleCreateBudget} />

          {/* Budget cards */}
          {budgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default AllBudgets;
