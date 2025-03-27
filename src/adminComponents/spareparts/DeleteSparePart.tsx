import { FaRegTrashCan } from "react-icons/fa6";
import { useDeleteSpareMutation } from "../../features/spare-parts/spare-parts";

export default function DeleteSparePart({ id }: { id: string }) {
  const [deleteSpare] = useDeleteSpareMutation();
  return (
    <button
      onClick={() => deleteSpare(id)}
      className="rounded-full bg-red-600 text-white p-2 hover:bg-red-400"
    >
      <FaRegTrashCan className="text-lg" />
    </button>
  );
}
