/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { UseFormRegister } from "react-hook-form";

type KeyValueInputsProps = {
  name: string;
  register: UseFormRegister<any>;
};

const KeyValueInputs: React.FC<KeyValueInputsProps> = ({ name, register }) => {
  const [fields, setFields] = React.useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);

  const handleAddField = () => {
    setFields((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleRemoveField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="col-span-full">
      <p className="text-sm font-medium text-gray-700">Xususiyatlar</p>

      {fields.map((field, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            {...register(`${name}.${index}.key`)}
            placeholder="Nomi"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
          />
          <input
            {...register(`${name}.${index}.value`)}
            placeholder="Qiymati"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
          />
          <button
            type="button"
            onClick={() => handleRemoveField(index)}
            className="bg-red-500 text-white rounded-md px-3 py-1 hover:bg-red-600 cursor-pointer"
          >
            -
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddField}
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
      >
        + Yangi xususiyat qo'shish
      </button>
    </div>
  );
};

export default KeyValueInputs;
