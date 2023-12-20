import { FunctionComponent } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FaCloudDownloadAlt } from 'react-icons/fa';

interface ActiveButtonProps {
  isEnabled: boolean;
  isLoading: boolean;
  text: string;
  onClick: () => void;
  size?: 'small' | 'medium' | 'large'; // Optional size prop with specific allowed values
  isDownload?: false | true;
}

export const ActiveButton: FunctionComponent<ActiveButtonProps> = ({
  isEnabled,
  isLoading,
  text,
  onClick,
  size = 'large', // Default value set to 'medium'
  isDownload = false,
}) => {
  const sizeClasses = {
    small: 'py-1 px-3 text-sm w-15 h-5',
    medium: 'py-3 px-5 text-sm w-[150px] h-9 font-normal ',
    large: 'py-3 px-5 text-sm w-[150px] h-9 font-normal ',
  };

  // Constant size-related classes
  const sizeClass = sizeClasses[size];

  // Classes that change based on isEnabled and isLoading
  const stateClasses = isEnabled
    ? 'hover:bg-blue-700 active:bg-blue-800 cursor-pointer'
    : 'opacity-50 cursor-not-allowed';

  const buttonClasses = `flex rounded justify-center items-center bg-[#306BF3] text-white focus:outline-none space-x-4 ${sizeClass} ${stateClasses}`;

  const handleClick = () => {
    if (!isEnabled || isLoading) return;
    onClick();
  };

  return (
    <div
      className={buttonClasses}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      style={{width:isDownload?"100%":""}}
    >
      {isLoading && <FaSpinner className="rounded animate-spin mr-2" />}
      {isDownload && <FaCloudDownloadAlt />}
      <div>{text}</div>
    </div>
  );
};
