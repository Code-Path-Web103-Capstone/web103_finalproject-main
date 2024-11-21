const SkeletonChart = ({ className }) => (
  <div className={`animate-pulse rounded-lg border-2 bg-gray-200 ${className}`}>
    <div className="mx-auto my-4 h-12 w-3/4 bg-gray-300" />
    <div className="h-48 w-full bg-gray-300" />
  </div>
);

export default SkeletonChart;
