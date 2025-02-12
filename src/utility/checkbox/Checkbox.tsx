import { useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const toggleCheck = () => setChecked(!checked);

  return (
    <label className="relative flex items-center cursor-pointer">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleCheck}
        className="hidden"
      />
      {/* Custom checkbox */}
      <div
        className={`w-5 h-5 rounded border-2 border-gray-400 flex items-center justify-center transition-all duration-200 ${
          checked ? "bg-red-500 border-red-500" : "bg-white"
        }`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </label>
  );
};

export default Checkbox;
