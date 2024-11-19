import React from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";

const Breakdown = () => {
  const { year, month } = useParams();

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-700">
          Breakdown for {month.charAt(0).toUpperCase() + month.slice(1)} {year}
        </h1>
        {/* Add content here to display inflows and outflows */}
        <div className="rounded-lg bg-gray-100 p-4 shadow">
          <p className="text-center text-gray-600">
            Detailed data goes here...
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Breakdown;
