import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";

const Overview = () => {
  const navigate = useNavigate();

  // State for selected year
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // List of years to choose from (you can dynamically generate this if needed)
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  ); // Last 10 years

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
    // Navigate to the detailed breakdown for the selected month and year
    navigate(`/breakdown/${selectedYear}/${month.toLowerCase()}`);
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-700">
          Select a Month and Year
        </h1>

        {/* Year Selector */}
        <div className="mb-6 flex justify-center">
          <label
            htmlFor="year-select"
            className="mr-4 text-lg font-medium text-gray-700"
          >
            Year:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="rounded border-gray-300 p-2 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-3 gap-4">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => handleMonthClick(month)}
              className="rounded-lg bg-blue-500 p-4 text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
