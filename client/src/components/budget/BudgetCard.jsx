import React from "react";

const BudgetCard = ({ budget, variant = "default", onClick }) => {
  const handleClick = () => {
    if (variant === "new") {
      onClick(); // Open the create budget modal or page
    } else {
      onClick(budget.id); // Pass the budget id for navigation
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex h-[220px] w-[400px] cursor-pointer items-center justify-center rounded-lg border border-gray-300 ${
        variant === "new"
          ? "cursor-pointer bg-gray-100 hover:bg-gray-200"
          : "bg-white"
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
