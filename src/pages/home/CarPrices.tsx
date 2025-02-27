import { useState } from "react";

import jeep from "../../assets/jeep.png";
import audi from "../../assets/audi.png";
import tesla from "../../assets/tesla.png";

type CarTypes = {
    name: string;
    price: number;
    img: string;
};

const CarPrices = () => {
    const [selectedPrice, setSelectedPrice] = useState(0);

    const cars: CarTypes[] = [
        {
            name: "Audi",
            price: 10000,
            img: audi,
        },
        {
            name: "Jeep",
            price: 20000,
            img: jeep,
        },
        {
            name: "Tesla",
            price: 30000,
            img: tesla,
        },
        {
            name: "Audi X",
            price: 150000,
            img: audi,
        },
        {
            name: "Jeep Y",
            price: 240000,
            img: jeep,
        },
        {
            name: "Tesla Z",
            price: 450000,
            img: tesla,
        },
        {
            name: "Tesla New",
            price: 350000,
            img: tesla,
        },
        {
            name: "Audi New Car",
            price: 90000,
            img: audi,
        },
        {
            name: "Jeep New",
            price: 110000,
            img: jeep,
        },
    ];

    const filteredCars = cars.filter((car) => {
        switch (selectedPrice) {
            case 1:
                return car.price < 80000;
            case 2:
                return car.price >= 80000 && car.price <= 120000;
            case 3:
                return car.price > 120000 && car.price <= 180000;
            case 4:
                return car.price > 180000 && car.price <= 250000;
            case 5:
                return car.price > 250000 && car.price <= 400000;
            case 6:
                return car.price > 400000;
            default:
                return true;
        }
    });

    return (
        <div className="w-full min-h-[300px] border">
            <div className="w-full h-10 border-b flex items-center bg-grey">
                {[
                    "Popular",
                    "Less than 80 000",
                    "80 000 - 120 000",
                    "120 000 - 180 000",
                    "180 000 - 250 000",
                    "250 000 - 400 000",
                    "More than 400 000",
                ].map((label, index) => (
                    <button
                        key={index}
                        className={`px-6 h-full ${
                            selectedPrice === index
                                ? "bg-primary text-white"
                                : ""
                        }`}
                        disabled={selectedPrice === index}
                        onClick={() => setSelectedPrice(index)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="p-4 flex flex-wrap gap-4">
                {filteredCars.length > 0 ? (
                    filteredCars.map((item, index) => (
                        <button
                            key={index}
                            className="border p-2 text-center hover:border-primary duration-300 group"
                        >
                            <img
                                width={150}
                                src={item.img}
                                alt={item.name}
                                className="group-hover:scale-105 duration-300"
                            />
                            <p>{item.name}</p>
                            <p>${item.price.toLocaleString()}</p>
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500">
                        No cars found for this price range.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CarPrices;
