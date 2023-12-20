import { FunctionComponent, useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface DocumentTypeSelectorProps {
  options: string[];
  changeDocType: (newDocType: string) => void;
  idx: number;
}

export const DocumentTypeSelector: FunctionComponent<
  DocumentTypeSelectorProps
> = ({ options, changeDocType, idx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[idx] || '');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    changeDocType(option);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component is mounted
    document.addEventListener('click', handleClickOutside);

    // Detach the event listener when the component is unmounted
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component is mounted

  return (
    <div className="rounded flex items-center pl-4">
      <div className="rounded text-sm mr-10">Document Type:</div>
      <div className="rounded relative inline-block w-96" ref={dropdownRef}>
        <div
          className="rounded rounded text-sm flex justify-between items-center form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 bg-clip-padding bg-no-repeat border border-solid border-gray-300 dark:border-gray-700 transition ease-in-out m-0 focus:text-gray-700 dark:focus:text-gray-300 focus:bg-white dark:focus:bg-gray-800 focus:border-blue-600 focus:outline-none cursor-pointer"
          onClick={toggleDropdown}
        >
          {selectedOption}
          <FaChevronDown />
        </div>
        {isOpen && (
          <div className="rounded rounded absolute mt-0 w-full bg-white dark:bg-gray-800 shadow-lg border border-slate-800 z-99">
            <ul className="rounded rounded text-sm overflow-auto text-gray-700 dark:text-gray-300">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="rounded rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer dark:hover:border border-blue-600"
                  onClick={() => selectOption(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
