import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import Breakdown from "../components/overview/Breakdown";
import PieBreakdown from "../components/overview/PieBreakdown";
import SkeletonChart from "../components/dashboard/SkeletonChart";

function MonthBreakdown() {
  const { year, month } = useParams();

  // State for loading charts
  const [loadingCharts, setLoadingCharts] = useState(true);

  return (
    <PageLayout>
      <div className="my-10">
        <h1 className="text-3xl font-semibold">
          Breakdown for {month.charAt(0).toUpperCase() + month.slice(1)} {year}
        </h1>
      </div>
      <div className="flex h-[490px] w-full items-center justify-center gap-2">
        <Breakdown setLoadingChart={setLoadingCharts} />
        <PieBreakdown setLoadingChart={setLoadingCharts} />
      </div>
    </PageLayout>
  );
}

export default MonthBreakdown;
