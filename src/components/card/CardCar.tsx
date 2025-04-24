import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbPropeller, TbSteeringWheelFilled } from "react-icons/tb";
import { PiGasCan } from "react-icons/pi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../../utility/rating/Rating";
import Image from "../image/Image";
import {
    useAddSavedItemsMutation,
    useRemoveSavedItemMutation,
    useGetSavedItemsQuery,
} from "../../features/saved/saved";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "../../features/auth/authSlice";
import { MdCompareArrows } from "react-icons/md";
import { toast } from "react-toastify";
import {
    useAddComparisonMutation,
    useDeleteComparisonMutation,
    useGetComparisonsQuery,
} from "../../features/compare/compare";

type Props = {
    vehicle: CarObject;
};

const CardCar = ({ vehicle }: Props) => {
    const [savedVehicle] = useAddSavedItemsMutation();
    const [removeSavedVehicle] = useRemoveSavedItemMutation();
    const userData = useSelector(selectCurrentUserData);
    const { data: comparedData } = useGetComparisonsQuery(
        {},
        { skip: !!userData }
    );
    const comparedCars: CarObject[] = comparedData || [];
    const { data } = useGetSavedItemsQuery();
    const [isSaved, setIsSaved] = useState(false);
    const [rating, setRating] = useState(vehicle.rating || 0);
    const [addCompare] = useAddComparisonMutation();
    const [deleteFromCompare] = useDeleteComparisonMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.some((item) => item.item_id === vehicle.id)) {
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    }, [data, vehicle.id]);

    const handleSaveOrRemove = async (
        e: React.MouseEvent<HTMLButtonElement>,
        item_id: string,
        item_type: string
    ) => {
        e.stopPropagation();

        if (isSaved) {
            setIsSaved(false);

            const favorite = data?.find((item) => item.item_id === item_id);
            if (favorite) {
                await removeSavedVehicle({ favorite_id: favorite.item_id });
            }
        } else {
            setIsSaved(true);

            await savedVehicle({
                item_id,
                item_type,
            });
        }
    };

    const isCompared = comparedCars.some(
        (car: CarObject) => car.id === vehicle.id
    );

    const handleCompare = async (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.stopPropagation();
        try {
            if (isCompared) {
                await deleteFromCompare(id);
                toast.error("Taqqoslashdan olib tashlandi");
            } else {
                const response = await addCompare([id]).unwrap();
                if (response) {
                    toast.success("Taqqoslashga qo'shildi!");
                }
            }
        } catch (error) {
            console.error("Compare xatolik:", error);
            toast.error("Amaliyot bajarilmadi. Iltimos, qayta urinib ko‘ring.");
        }
    };
    return (
        <div
            onClick={() => navigate(`/cars/${vehicle.name_uz}/${vehicle.id}`)}
            className="w-full min-h-[400px] bg-white flex flex-col duration-300 justify-between group relative shadow-md hover:shadow-lg border-2 cursor-pointer hover:border-primary"
        >
            {userData && (
                <button
                    className="absolute right-2 top-2 p-1 bg-gray-300 border-2 border-gray-400 rounded-full"
                    onClick={(e) =>
                        handleSaveOrRemove(e, vehicle.id!, "vehicle")
                    }
                >
                    {isSaved ? (
                        <AiFillHeart className="text-2xl text-red-500 " />
                    ) : (
                        <AiOutlineHeart className="text-2xl text-gray-500 hover:text-primary duration-300" />
                    )}
                </button>
            )}

            {userData && (
                <button
                    className="absolute right-12 top-2 p-1 bg-gray-300 border-2 border-gray-400 rounded-full"
                    onClick={(e) => handleCompare(e, vehicle.id!)}
                >
                    {isCompared ? (
                        <MdCompareArrows className="text-2xl text-primary" />
                    ) : (
                        <MdCompareArrows className="text-2xl text-gray-500 hover:text-primary duration-300" />
                    )}
                </button>
            )}

            <div>
                <Image
                    src={vehicle.cover_image!}
                    alt={vehicle.name_uz}
                    className="w-full h-60 object-cover"
                />
            </div>
            <div className="p-4 flex flex-col gap-4 group-hover:bg-primary group-hover:text-white h-full">
                <div className="flex items-center">
                    <h1 className="text-2xl font-semibold truncate basis-1/2">
                        {vehicle.name_uz}
                    </h1>
                </div>
                <div className="border-y-2 py-4 flex flex-col gap-2 h-32">
                    <div className="flex items-end gap-2">
                        <Rating rating={rating} setRating={setRating} />
                        <sup>{vehicle.rating}+Reviews</sup>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TbSteeringWheelFilled className="text-xl" />
                        <span>{vehicle.drive_type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TbPropeller className="text-xl" />
                        <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <PiGasCan className="text-xl" />
                        <span>{vehicle.engine_type}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCar;
