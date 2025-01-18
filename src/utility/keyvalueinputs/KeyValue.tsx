/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { UseFormRegister } from "react-hook-form";

type KeyValueInputsProps = {
  name: string;
  register: UseFormRegister<any>;
  defaultFields?: { key_uz: string; value_uz: string }[];
};

const KeyValueInputs: React.FC<KeyValueInputsProps> = ({
  name,
  register,
  defaultFields = [],
}) => {
  const [fields, setFields] = React.useState<
    { key_uz: string; value_uz: string }[]
  >([]);

  useEffect(() => {
    if (defaultFields.length > 0) {
      setFields(defaultFields);
    } else {
      setFields([{ key_uz: "", value_uz: "" }]);
    }
  }, [defaultFields]);

  const handleAddField = () => {
    setFields((prev) => [...prev, { key_uz: "", value_uz: "" }]);
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
            {...register(`${name}.${index}.key_uz`)}
            defaultValue={field.key_uz}
            placeholder="Nomi"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
          />
          <input
            {...register(`${name}.${index}.value_uz`)}
            defaultValue={field.value_uz}
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
