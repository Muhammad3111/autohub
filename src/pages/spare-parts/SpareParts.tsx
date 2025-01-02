import ReadParts from "../../components/spareparts/ReadParts";
import Button from "../../utility/button/Button";

export default function SpareParts() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Ehtiyot Qisimlar</h1>
        <Button
          className="mt-0 flex items-center gap-2 px-5"
          path="/admin/spare-parts/add"
        >
          Ehtiyot Qisim Qo'shish
        </Button>
      </div>
      <ReadParts />
    </div>
  );
}
