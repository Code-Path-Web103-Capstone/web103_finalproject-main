import React from "react";

const SkeletonCard = () => {
  return (
    <div className="flex animate-pulse items-center justify-center rounded-lg border border-gray-300 bg-gray-200 px-32 py-20">
      <div className="w-full space-y-4">
        <div className="mx-auto h-6 w-3/4 rounded bg-gray-300"></div>
        <div className="mx-auto h-4 w-1/2 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
