import React from "react";

interface FormProps {
  checkboxes: { [key: string]: boolean };
  radio: string;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form: React.FC<FormProps> = ({
  checkboxes,
  radio,
  handleCheckboxChange,
  handleRadioChange,
}) => {
  return (
    <form>
      <div className="flex gap-4 px-2 py-6 text-white">
        <div className="flex flex-col gap-4">
          {/* Checkbox labels */}
          {["kr", "cn", "gb", "jp"].map((label, index) => {
            const value = label.toLowerCase();
            return (
              <label
                key={index}
                className="relative inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={value}
                  checked={checkboxes[value] || false}
                  onChange={handleCheckboxChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 "></div>
                <span className="ml-3 text-sm font-medium  dark:text-gray-300">
                  {label === "kr" && "Manhwa"}
                  {label === "cn" && "Manhua"}
                  {label === "gb" && "Webtoon"}
                  {label === "jp" && "Manga"}
                </span>
              </label>
            );
          })}
        </div>

        <div>
          {/* Radio buttons */}
          {["Trending", "All"].map((label, index) => {
            const value = label;
            return (
              <div key={index} className="flex items-center mb-4">
                <input
                  id={`default-radio-${index}`}
                  type="radio"
                  value={value}
                  checked={radio === value}
                  onChange={handleRadioChange}
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`default-radio-${index}`}
                  className="ml-2 text-sm font-medium  dark:text-gray-300"
                >
                  {label} Comics
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default Form;
