import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";

const Overview = () => {
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();

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

  const handleMonthClick = (month) => {
    navigate(`/breakdown/${selectedYear}/${month.toLowerCase()}`);
  };

  const handleYearChange = (increment) => {
    setSelectedYear((prevYear) => prevYear + increment);
  };

  const resetToCurrentYear = () => {
    setSelectedYear(currentYear);
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-xl border-2 border-red-500 p-5">
        {/* Year Selector */}
        <div className="relative mb-8 flex items-center justify-center">
          <button
            onClick={() => handleYearChange(-1)}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            ←
          </button>
          <span
            onClick={resetToCurrentYear}
            className="relative mx-4 cursor-pointer text-2xl font-bold text-gray-700 hover:underline"
          >
            <div className="group relative">
              {selectedYear}
              {selectedYear !== currentYear && (
                <div className="absolute left-1/2 top-full z-10 hidden w-max -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                  Reset to Current Year
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full border-x-[6px] border-b-[6px] border-t-0 border-x-transparent border-b-gray-800"></div>
                </div>
              )}
            </div>
          </span>
          <button
            onClick={() => handleYearChange(1)}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            →
          </button>
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {months.map((month, index) => (
            <button
              key={index}
              onClick={() => handleMonthClick(month)}
              className={`rounded-lg p-4 text-sm font-medium text-gray-700 hover:bg-blue-100 ${
                currentYear === selectedYear && new Date().getMonth() === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Overview;
