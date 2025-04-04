import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbPropeller, TbSteeringWheelFilled } from "react-icons/tb";
import { PiGasCan } from "react-icons/pi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../../utility/rating/Rating";
import { useGetBrandyIdQuery } from "../../features/brands/brands";
import { useTranslation } from "react-i18next";
import Image from "../image/Image";

type Props = {
    vehicle: CarObject;
};

const ShopCard = ({ vehicle }: Props) => {
    const [isSaved, setIsSaved] = useState(false);
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [rating, setRating] = useState(vehicle.rating || 0);
    const toggleSave = () => setIsSaved((prev) => !prev);
    const { data: brands, isLoading } = useGetBrandyIdQuery(
        vehicle.brand_id || 7
    );
    const { t } = useTranslation();
    if (isLoading) {
        return <h1>{t("loading")}...</h1>;
    }
    const brand: Brand = brands;
    return (
        <div
            onClick={() => navigate(`/cars/${slug}/${vehicle.id}`)}
            className='overflow-hidden w-full min-h-[400px] bg-white flex flex-col duration-300 justify-between group relative shadow-md hover:shadow-lg border-2 cursor-pointer hover:border-primary'
        >
            {/* Save Button */}
            <button
                className='absolute right-2 top-2 p-1 bg-gray-300 border-2 border-gray-400 rounded-full'
                onClick={(e) => {
                    e.stopPropagation();
                    toggleSave();
                }}
            >
                {isSaved ? (
                    <AiFillHeart className='text-xl text-red-500 ' />
                ) : (
                    <AiOutlineHeart className='text-xl text-gray-500 hover:text-primary duration-300' />
                )}
            </button>
            <div>
                <Image
                    src={vehicle.cover_image!}
                    alt={vehicle.name_uz}
                    className='w-full h-48 object-cover'
                />
            </div>
            <div className='p-4 flex flex-col gap-2 group-hover:bg-primary group-hover:text-white h-full'>
                <div className='flex justify-between items-center'>
                    <span className='bg-green-600/20 px-2 py-1 rounded-md text-center text-[12px] text-black w-max group-hover:bg-white'>
                        {brand.name}
                    </span>
                </div>
                <div className='flex items-center'>
                    <h1 className='text-base font-semibold truncate'>
                        {vehicle.name_uz}
                    </h1>
                </div>
                <div className='border-y-2 py-4 flex flex-col gap-2 h-28'>
                    <div className='flex items-end gap-2'>
                        <Rating rating={rating} setRating={setRating} />
                        <sup>{vehicle.rating}+Reviews</sup>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        <TbSteeringWheelFilled className='text-base' />
                        <span className='text-sm truncate text-ellipsis'>
                            {vehicle.drive_type}
                        </span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <TbPropeller className='text-base' />
                        <span className='text-sm truncate text-ellipsis'>
                            {vehicle.transmission}
                        </span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <PiGasCan className='text-base' />
                        <span className='text-sm truncate text-ellipsis'>
                            {vehicle.engine_type}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopCard;
