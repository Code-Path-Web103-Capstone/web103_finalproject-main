import React from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import Breakdown from "../components/overview/Breakdown";
import PieBreakdown from "../components/overview/PieBreakdown";

function MonthBreakdown() {
  const { year, month } = useParams();

  return (
    <PageLayout>
      <div className="my-10">
        <h1 className="text-3xl font-semibold">
          Breakdown for {month.charAt(0).toUpperCase() + month.slice(1)} {year}
        </h1>
      </div>
      <div className="flex gap-2">
        <Breakdown />
        <PieBreakdown />
      </div>
    </PageLayout>
  );
}

export default MonthBreakdown;
