import Button from "../../utility/button/Button";
import FileUploader from "../../utility/file-uploader/FileUploader";

export default function AddMedia() {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Fayl Qo'shish</h1>
        <Button
          path="/admin/media"
          className="mt-0 flex items-center gap-2 px-5"
        >
          Orqaga
        </Button>
      </div>
      <FileUploader />
    </div>
  );
}
