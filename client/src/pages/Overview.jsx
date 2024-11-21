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
      {/* Year Selector */}
      <div className="flex items-center justify-between gap-1 px-10 py-5">
        <button
          onClick={() => handleYearChange(-1)}
          className="flex size-8 items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          ←
        </button>
        <span
          onClick={resetToCurrentYear}
          className="cursor-pointer text-3xl font-bold text-gray-800 hover:underline"
        >
          {selectedYear}
        </span>
        <button
          onClick={() => handleYearChange(1)}
          className="flex size-8 items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          →
        </button>
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-6 gap-6 px-10">
        {months.map((month, index) => (
          <button
            key={index}
            onClick={() => handleMonthClick(month)}
            className={`flex size-32 items-center justify-center rounded-xl border-2 p-5 text-base font-semibold transition-transform duration-200 hover:scale-105 ${
              currentYear === selectedYear && new Date().getMonth() === index
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </PageLayout>
  );
};

export default Overview;
