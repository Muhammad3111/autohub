import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { collection } from "../../mock/data.json";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { carIcons } from "../../utility/carIcons/carIcons";

const CarTypes = () => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isHovering, setIsHovering] = useState("");

    if (!context) {
        throw new Error(
            "Ushbu component context providerdan tashqarida ishlatilmoqda"
        );
    }

    const { setModel } = context;
    const rawCollection = collection.map((item) => {
        const value = item.value as CarType;
        return {
            ...item,
            icon: carIcons[value]
        };
    });

    return (
        <div>
            <div className='flex items-center justify-between mt-20 w-full bg-light p-6'>
                {rawCollection.slice(1).map((item, index) => (
                    <button
                        onClick={() => {
                            setModel(item.title);
                            navigate(`/cars/${item.title}`);
                        }}
                        key={index}
                        className='flex flex-col items-center gap-1'
                        onMouseEnter={() => setIsHovering(item.value)}
                        onMouseLeave={() => setIsHovering("")}
                    >
                        <img
                            src={
                                isHovering === item.value
                                    ? item.icon.hover
                                    : item.icon.white
                            }
                            alt=''
                            className='w-32 h-20 object-cover'
                        />
                        <p className='text-dark uppercase'>
                            {t(`home-page.brand-${item.value}`)}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};
export default CarTypes;
