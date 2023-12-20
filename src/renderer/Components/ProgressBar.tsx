type ProgressBarProps = {
  value: number;
  max: number;
  overview : string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, overview }) => {
  // Calculate the width of the progress ba
  const width = Math.min(100, (value / max) * 100);

  return (
    <div className="rounded w-full h-full">
      <div className="rounded flex justify-between">
        <div className="rounded font-mono text-[#C2C1C8] font-[normal] text-[14px]">
          {overview}
        </div>
        <div className="rounded text-[16px] font-light	">{`${width.toFixed(0)}%`}</div>
      </div>
      <div className="rounded w-full h-[7px] bg-white rounded-full dark:bg-gray-700">
        <div
          className="rounded bg-[#306BF3] h-[7px] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};
