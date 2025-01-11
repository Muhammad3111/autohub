import { FaRegTrashCan } from "react-icons/fa6";
import { useDeleteBrandMutation } from "../../features/brands/brands";

export default function DeleteBrand({ id }: { id: number }) {
  const [deleteBrand] = useDeleteBrandMutation();
  return (
    <button
      onClick={() => deleteBrand(id)}
      className="rounded-full bg-red-600 text-white p-2"
    >
      <FaRegTrashCan className="text-lg" />
    </button>
  );
}
