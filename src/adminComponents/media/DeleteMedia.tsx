import { FaRegTrashCan } from "react-icons/fa6";
import { useDeleteUrlMutation } from "../../features/media/mediaSlice";

export default function DeleteMedia({ url }: { url: string }) {
  const [deleteMedia] = useDeleteUrlMutation();
  return (
    <button
      onClick={() => deleteMedia(url)}
      className="group-hover:opacity-100 opacity-0 rounded-full absolute top-2 right-2 bg-red-600 text-white p-2 duration-300"
    >
      <FaRegTrashCan className="text-lg" />
    </button>
  );
}
