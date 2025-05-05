import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useDeleteAdsMutation } from "../../features/ads/ads";

export default function DeleteAds({ id }: { id: number }) {
  const [deleteAds] = useDeleteAdsMutation();

  const DeleteBarnd = async () => {
    try {
      await deleteAds(id);
      toast.success("Reklama muvaffaqiyatli o'chirildi");
    } catch (error) {
      toast.error(`Reklama o'chirishda xatolik: ${error}`);
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
