import ReadCategory from "../../../adminComponents/spareparts/categories/ReadCategory";

export default function SpareCategories() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Ehtiyot Qisim bo'limlari</h1>
      </div>
      <ReadCategory />
    </div>
  );
}
