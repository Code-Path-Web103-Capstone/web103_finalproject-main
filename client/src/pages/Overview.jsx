import React from "react";
import BudgetCalendar from "../components/budget/BudgetCalendar";

const Overview = () => {
  return (
    <main className="flex h-auto w-full flex-col items-center border-2 border-red-600 bg-[#D9D9D9]">
      <BudgetCalendar />
    </main>
  );
};

export default Overview;
