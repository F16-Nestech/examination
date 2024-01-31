const ProgressBar = ({ percent }) => {
  const bg =
    percent >= 80
      ? "bg-green-500"
      : percent >= 60
        ? "bg-blue-500"
        : percent >= 40
          ? "bg-yellow-500"
          : "bg-red-500";
  const commonStyles = "h-3 w-full rounded-full";
  const progressBarStyles = `absolute left-0 right-0 top-0 h-3 w-full ${bg} rounded-full`;

  return (
    <div className="relative h-3 w-full overflow-hidden rounded-full">
      <div className={`${commonStyles} bg-gray-300`}></div>
      <div
        className={progressBarStyles}
        style={{ transform: `translateX(-${100 - percent}%)` }}
      ></div>
      <p
        className={`${commonStyles} absolute left-0 right-0 top-0 text-center text-xs leading-3`}
      >
        {percent.toFixed(2)}%
      </p>
    </div>
  );
};
export default ProgressBar;
