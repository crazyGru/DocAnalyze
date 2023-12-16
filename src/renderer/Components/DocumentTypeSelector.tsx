import { FunctionComponent, useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

interface DocumentTypeSelectorProps {
  options: string[];
  changeDocType: (newDocType: string) => void;
  idx : number;
}

export const DocumentTypeSelector: FunctionComponent<DocumentTypeSelectorProps> = ({
  options,
  changeDocType,
  idx,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[idx] || '');

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    changeDocType(option);
  };
  return (
    <div className="flex" style={{ alignItems: 'center' }}>
      <div className="text-base mr-10">Document Type:</div>
      <div className="relative inline-block w-96">
        <div
          className="flex justify-between items-center form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 bg-clip-padding bg-no-repeat border border-solid border-gray-300 dark:border-gray-700 rounded-full transition ease-in-out m-0 focus:text-gray-700 dark:focus:text-gray-300 focus:bg-white dark:focus:bg-gray-800 focus:border-blue-600 focus:outline-none cursor-pointer"
          onClick={toggleDropdown}
        >
          {selectedOption}
          <FaChevronDown />
        </div>
        {isOpen && (
          <div className="absolute mt-1 w-full rounded-3xl bg-white dark:bg-gray-800 shadow-lg border border-gray-800">
            <ul className="text-base overflow-auto text-gray-700 dark:text-gray-300">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-full dark:hover:border border-blue-600"
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
