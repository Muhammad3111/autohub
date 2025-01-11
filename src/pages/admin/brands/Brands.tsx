import ReadBrands from "../../../adminComponents/brands/ReadBrands";
import Button from "../../../utility/button/Button";

export default function Brands() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Brandlar</h1>
        <Button
          className="mt-0 flex items-center gap-2 px-5"
          path="/admin/brands/add"
        >
          Brand Qo'shish
        </Button>
      </div>
      <ReadBrands />
    </div>
  );
}
