import { FaRegTrashCan } from "react-icons/fa6";
import { useDeleteFromS3Mutation } from "../../features/media/mediaSlice";
import { toast } from "react-toastify";

type DeleteMediaProps = {
  keyName: string | null;
};

export default function DeleteMedia({ keyName }: DeleteMediaProps) {
  const [deleteFromS3] = useDeleteFromS3Mutation();

  const handleDeleteFromS3 = async () => {
    try {
      const bucket = "autohub";

      if (!keyName) {
        toast.warning("Fayl manzili topilmadi!!!");
        return;
      }

      const res = await deleteFromS3({ bucket, key: keyName }).unwrap();

      if (res?.success) {
        toast.success("Fayl muvaffaqiyatli o‘chirildi");
      }
    } catch (error) {
      console.error("S3 delete error:", error);
      toast.error("Faylni o‘chirishda xatolik yuz berdi");
    }
  };

  return (
    <button
      onClick={handleDeleteFromS3}
      className="group-hover:opacity-100 opacity-0 rounded-full absolute top-2 right-2 bg-red-600 text-white p-2 duration-300"
    >
      <FaRegTrashCan className="text-lg" />
    </button>
  );
}
