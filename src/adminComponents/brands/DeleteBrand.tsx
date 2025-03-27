import { FaRegTrashCan } from "react-icons/fa6";
import { useDeleteBrandMutation } from "../../features/brands/brands";
import { toast } from "react-toastify";

export default function DeleteBrand({ id }: { id: number }) {
  const [deleteBrand] = useDeleteBrandMutation();

  const DeleteBarnd = async () => {
    try {
      await deleteBrand(id);
      toast.success("Brand muvaffaqiyatli o'chirildi");
    } catch (error) {
      toast.error(`Brand o'chirishda xatolik: ${error}`);
    }
  };

  return (
    <button
      onClick={() => DeleteBarnd()}
      className="rounded-full bg-red-600 text-white p-2"
    >
      <FaRegTrashCan className="text-lg" />
    </button>
  );
}
