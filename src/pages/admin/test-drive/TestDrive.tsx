import ReadTestDrive from "../../../adminComponents/test-drive/ReadTestDrive";

export default function TestDrive() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Test Drive uchun so'rovlar</h1>
      </div>
      <ReadTestDrive />
    </div>
  );
}
