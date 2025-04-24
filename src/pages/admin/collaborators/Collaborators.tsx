import ReadColl from "../../../adminComponents/collaborators/ReadColl";

export default function Collaborators() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Hamkorlik Arizalari</h1>
      </div>
      <ReadColl />
    </div>
  );
}
