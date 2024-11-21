import React from "react";
import { twMerge } from "tailwind-merge";

const Summary = ({
  loading,
  error,
  totalSaved,
  YTDIncome,
  YTDExpenses,
  className,
}) => {
  return (
    <div className={twMerge("rounded-lg border-2 bg-white p-5", className)}>
      <h2 className="text-lg font-semibold text-gray-700">Summary</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-col justify-between gap-2">
          {/* Savings */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600">
              Total Savings
            </h3>
            <p className="text-5xl font-bold text-[#24B283]">
              ${totalSaved.toFixed(2)}
            </p>
          </div>
          {/* Income */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600">
              Total Income
            </h3>
            <p className="text-2xl font-bold text-[#23C436]">
              ${YTDIncome.toFixed(2)}
            </p>
          </div>
          {/* Expenses */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600">
              Total Expenses
            </h3>
            <p className="text-2xl font-bold text-[#FF5E5E]">
              ${YTDExpenses.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
