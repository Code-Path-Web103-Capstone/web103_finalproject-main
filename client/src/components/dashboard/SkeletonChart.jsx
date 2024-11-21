import React from "react";
import { IoBarChartSharp } from "react-icons/io5";

const SkeletonChart = ({ className }) => {
  return (
    <div
      className={`flex h-full animate-pulse items-center justify-center rounded-lg bg-gray-200 ${className}`}
    >
      <IoBarChartSharp className="text-5xl text-gray-400" />
    </div>
  );
};

export default SkeletonChart;
