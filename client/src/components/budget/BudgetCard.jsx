import React from "react";

const BudgetCard = ({ budget, variant = "default", onClick }) => {
  return (
    <div
      onClick={variant === "new" ? onClick : undefined}
      className={`flex items-center justify-center rounded-lg border border-gray-300 p-4 ${
        variant === "new"
          ? "cursor-pointer bg-gray-100 hover:bg-gray-200"
          : "bg-white shadow-md"
      }`}
    >
      {variant === "new" ? (
        <span className="text-3xl font-bold text-gray-600">+</span>
      ) : (
        <div>
          <h3 className="text-lg font-semibold">{budget.budget_name}</h3>
          <p className="text-gray-600">{budget.plan}</p>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
