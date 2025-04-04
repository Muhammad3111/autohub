import { FaRegTrashCan } from "react-icons/fa6";

export default function DeleteMedia() {
  return (
    <button className="group-hover:opacity-100 opacity-0 rounded-full absolute top-2 right-2 bg-red-600 text-white p-2 duration-300">
      <FaRegTrashCan className="text-lg" />
    </button>
  );
}
