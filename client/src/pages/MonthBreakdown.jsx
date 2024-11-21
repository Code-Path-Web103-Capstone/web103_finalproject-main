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
      <div className="grid h-[490px] w-full grid-cols-2 items-center justify-center gap-2 p-10">
        <div className="px-5">
          <h1 className="text-3xl font-semibold">
            Breakdown for {month.charAt(0).toUpperCase() + month.slice(1)}{" "}
            {year}
          </h1>
        </div>
        <div className="px-5">
          <h1 className="text-3xl font-semibold"></h1>
        </div>
        <Breakdown setLoadingChart={setLoadingCharts} />
        <PieBreakdown setLoadingChart={setLoadingCharts} />
      </div>
    </PageLayout>
  );
}

export default MonthBreakdown;
