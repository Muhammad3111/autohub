import React, { useState } from "react";
import * as xlsx from "xlsx";
import { UseFormRegister, UseFormSetValue } from "react-hook-form"; // Typelarni import qilish

type ExcelUploaderProps = {
  register: UseFormRegister<CarObject>;
  setValue: UseFormSetValue<CarObject>;
};

const ExcelUploader: React.FC<ExcelUploaderProps> = ({
  register,
  setValue,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      if (!e.target?.result) return;

      const workbook = xlsx.read(e.target.result, { type: "buffer" });

      let configurations: ConfigurationItem[] = [];

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];

        // ✅ To‘g‘ri `header` berish
        const sheetData = xlsx.utils.sheet_to_json(worksheet, {
          header: ["A", "B", "C", "D"], // 🔹 A -> ckey, B -> cvalue
          range: 0, // 1-qatorni olib tashlamaymiz
        }) as { A: string; B: string; C: string; D: string }[];
        // ✅ Konsolda tekshirish uchun

        const parsedData: ConfigurationItem[] = sheetData.map((row) => ({
          ckey_uz: row.A?.toString() || "", // 🔹 A ustunni ckey sifatida olamiz
          cvalue_uz: row.B?.toString() || "",
          ckey_ru: row.C?.toString() || "",
          cvalue_ru: row.D?.toString() || "", // 🔹 A ustunni ckey sifatida olamiz           // 🔹 B ustunni cvalue sifatida olamiz
          category: sheetName, // 🔹 Sheet nomini category sifatida yozamiz
        }));

        configurations = [...configurations, ...parsedData];
      });

      setValue(
        "configurations",
        configurations.length > 0 ? configurations : []
      );
    };
  };

  return (
    <div className="col-span-2">
      <p className="text-base">Konfiguratsiya</p>
      <label className="block w-full border-gray-300 rounded-md p-2 border">
        {!fileName ? (
          "File Tanlang"
        ) : (
          <p className="text-sm text-gray-600">Yuklangan fayl: {fileName}</p>
        )}
        <input
          type="file"
          accept=".xlsx, .xls"
          {...register("configurations")}
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ExcelUploader;
