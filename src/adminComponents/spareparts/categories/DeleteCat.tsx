import { FaRegTrashCan } from "react-icons/fa6";
import { useDeleteSpareCatMutation } from "../../../features/spare-parts/spare-categories";

export default function DeleteCat({ id }: { id: number | null }) {
  const [deleteCat] = useDeleteSpareCatMutation();
  return (
    <button
      onClick={() => deleteCat(id)}
      className="rounded-full bg-red-600 text-white p-2 duration-300 z-40"
    >
      <FaRegTrashCan className="text-lg" />
    </button>
  );
}
