import { FaRegTrashCan } from "react-icons/fa6";
import { useDeleteCarMutation } from "../../features/cars/carSlice";

export default function DeleteCar({ id }: { id: string }) {
  const [deleteCar] = useDeleteCarMutation();
  return (
    <button
      onClick={() => deleteCar(id)}
      className="group-hover:opacity-100 opacity-0 rounded-full absolute top-2 right-2 bg-red-600 text-white p-2 duration-300 z-40"
    >
      <FaRegTrashCan className="text-lg" />
    </button>
  );
}
