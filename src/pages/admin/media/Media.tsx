import ReadMedia from "../../../adminComponents/media/ReadMedia";
import Button from "../../../utility/button/Button";

export default function Media() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Media</h1>
        <Button
          className="mt-0 flex items-center gap-2 px-5"
          path="/admin/media/add"
        >
          Media Qo'shish
        </Button>
      </div>
      <ReadMedia />
    </div>
  );
}
