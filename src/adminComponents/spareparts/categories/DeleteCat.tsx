import { FaRegTrashCan } from "react-icons/fa6";
import { useDeleteSpareCatMutation } from "../../../features/spare-parts/spare-categories";
import { toast } from "react-toastify";

export default function DeleteCat({ id }: { id: number | null }) {
  const [deleteCat] = useDeleteSpareCatMutation();

  const DeleteSparePartCat = async () => {
    try {
      await deleteCat(id);
      toast.success("Bo'lim muvaffaqyiatli o'chirildi");
    } catch (error) {
      toast.error(`Bo'lim o'chirishda xatolik: ${error}`);
    }
  };
  return (
    <button
      onClick={() => DeleteSparePartCat()}
      className="rounded-full bg-red-600 text-white p-2 duration-300 z-40"
    >
      <FaRegTrashCan className="text-lg" />
    </button>
  );
}
