import ReadCars from "../../../adminComponents/cars/ReadCars";
import Button from "../../../utility/button/Button";

export default function Cars() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Avtomobillar</h1>
        <Button
          className="mt-0 flex items-center gap-2 px-5"
          path="/admin/cars/add"
        >
          Avtomobil Qo'shish
        </Button>
      </div>
      <ReadCars />
    </div>
  );
}
