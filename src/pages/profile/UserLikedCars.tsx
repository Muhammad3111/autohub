import { useTranslation } from "react-i18next";
import { useGetSavedItemsQuery } from "../../features/saved/saved";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import CardCar from "../../components/card/CardCar";

const UserLikedCars = () => {
    const { data } = useGetSavedItemsQuery();
    const { t } = useTranslation();
    const { data: carsData, isLoading } = useGetCarsQuery({ page: 1 });
    if (isLoading) return <h2>{t("loading")}</h2>;
    const carData = carsData?.items;

    const likedCars = carData?.filter((car) =>
        data?.some((savedItem) => savedItem.item_id === car.id)
    );

    return (
        <div className='w-full h-full border border-[#ccc] rounded-md p-10 flex flex-wrap gap-10'>
            <div className='grid grid-cols-4 gap-4'>
                {likedCars?.map((car) => (
                    <CardCar key={car.id} vehicle={car} />
                ))}
            </div>
        </div>
    );
};

export default UserLikedCars;
