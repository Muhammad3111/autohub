import { useState } from "react";
import SearchInput from "../../utility/search-input/SearchInput";
import CarImg from "../../assets/car-category.png";

const Categories = () => {
    const [search, setSearch] = useState<string>("");

    const [isOpenAllCarsNames, setIsOpenAllCarsNames] =
        useState<boolean>(false);

    const carEngineTypes = [
        {
            name: "Gaz",
            img: CarImg,
        },
        {
            name: "Benzin",
            img: CarImg,
        },
        {
            name: "Elektr",
            img: CarImg,
        },
        {
            name: "Gibrid",
            img: CarImg,
        },
        {
            name: "Dizel",
            img: CarImg,
        },
    ];

    const carBrands = [
        "Acura",
        "AITO",
        "Alfa Romeo",
        "Alpina",
        "Alpine",
        "AMC",
        "ARO",
        "Asia",
        "Aston Martin",
        "Audi",
        "Austin",
        "Autozam",
        "Avatr",
        "Avia",
        "BAC",
        "BAIC",
        "Barkas",
        "BCC",
        "Belgee",
        "Bentley",
        "Bertone",
        "BMW",
        "Bogdan",
        "Brilliance",
        "Bugatti",
        "Buick",
        "BYD",
        "Cadillac",
        "Caterham",
        "Changan",
        "Chery",
        "Chevrolet",
        "Chrysler",
        "Citroen",
        "Cobra AC",
        "Cord",
        "Cupra",
        "Dacia",
        "Dadi",
        "Daewoo",
        "Daihatsu",
        "Daimler",
        "Datsun",
        "de Tomaso",
        "DeLorean",
        "Derways",
        "Dodge",
        "Dongfeng",
        "DS",
        "Eagle",
        "Efini",
        "Eunos",
        "Evolute",
        "Exeed",
        "FAW",
        "Ferrari",
        "FIAT",
        "Ford",
        "Forthing",
        "Foton",
        "FSO",
        "GAC",
        "Geely",
        "Genesis",
        "GMC",
        "Great Wall",
        "Hafei",
        "Haima",
        "Haval",
        "Hawtai",
        "Holden",
        "Honda",
        "Hongqi",
        "Huanghai",
        "Hummer",
        "Hyundai",
        "Infiniti",
        "Iran Khodro",
        "Isuzu",
        "Iveco",
        "JAC",
        "Jaecoo",
        "Jaguar",
        "Jeep",
        "Jetour",
        "Jetta",
        "KAIYI",
        "KIA",
        "Knewstar",
        "KTM",
        "Lada",
        "Lamborghini",
        "Lancia",
        "Land Rover",
        "LDV",
        "Lexus",
        "Li Auto",
        "Lifan",
        "Ligier",
        "Lincoln",
        "Livan",
        "Lotus",
        "Luxgen",
        "Lynk & Co",
        "Marussia",
        "Maserati",
        "Maybach",
        "Mazda",
        "Mercedes-Benz",
        "Mercury",
        "Merkur",
        "MG",
        "MINI",
        "Mitsubishi",
        "Morgan",
        "Morris",
        "NIO",
        "Nissan",
        "Noble",
        "Nysa",
        "Oldsmobile",
        "Omoda",
        "Opel",
        "Ora",
        "Oting",
        "Peugeot",
        "Plymouth",
        "Polestar",
        "Pontiac",
        "Porsche",
        "Proton",
        "RAM",
        "Ravon",
        "Renault",
        "Rivian",
        "Rolls-Royce",
        "Rover",
        "Saab",
        "Samsung",
        "Saturn",
        "Scion",
        "SEAT",
        "Seres",
        "Simca",
        "Skoda",
        "Skywell",
        "SMA",
        "Smart",
        "Solaris",
        "Sollers",
        "Soueast",
        "SsangYong",
        "Subaru",
        "Suzuki",
        "Talbot",
        "Tank",
        "Tata",
        "Tatra",
        "Tesla",
        "Toyota",
        "Trabant",
        "Vauxhall",
        "Volkswagen",
        "Volvo",
        "Voyah",
        "Wartburg",
        "Weltmeister",
        "WEY",
        "Wiesmann",
        "Willys",
        "Xcite",
        "Xiaomi",
        "Xpeng",
        "Zeekr",
        "Zotye",
        "ZX",
        "Автокам",
        "ВИС",
        "ГАЗ",
        "ЕрАЗ",
        "ЗАЗ",
        "ЗИЛ",
        "ИЖ",
        "КАМАЗ",
        "ЛуАЗ",
        "Москвич",
        "РАФ",
        "СеАЗ",
        "ТагАЗ",
        "УАЗ",
        "Другие",
        "Самоделки",
    ];

    return (
        <div className="container mx-auto w-full">
            <div
                className={`bg-white p-6 rounded ${
                    isOpenAllCarsNames ? "min-h-[730px]" : "h-[730px]"
                } overflow-hidden relative`}
            >
                <h1 className="text-xl font-semibold">Nom bo'yicha izlang</h1>
                <SearchInput search={search} setSearch={setSearch} />

                <div className="flex items-center justify-between mt-10">
                    <div></div>
                    <h1 className="text-xl font-semibold">
                        Brend bo'yicha tanlang
                    </h1>

                    <div className="flex items-center bg-grey rounded-full p-1.5">
                        <button
                            className={`${
                                isOpenAllCarsNames ? "" : "bg-white"
                            } rounded-full p-1 px-3`}
                            onClick={() => setIsOpenAllCarsNames(false)}
                        >
                            Mashxurlar
                        </button>
                        <button
                            className={`${
                                isOpenAllCarsNames ? "bg-white" : ""
                            } rounded-full p-1 px-3`}
                            onClick={() => setIsOpenAllCarsNames(true)}
                        >
                            Barchasi
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-around mt-10">
                    {carEngineTypes.map((item, index) => (
                        <button
                            key={index}
                            className="hover:bg-grey duration-150 px-6 py-2 rounded"
                        >
                            <img src={item.img} alt="" />
                            <p>{item.name}</p>
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-5 gap-2 mt-5">
                    {carBrands.map((item, index) => (
                        <button
                            key={index}
                            className="w-full hover:bg-grey duration-150 py-2 rounded"
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {!isOpenAllCarsNames && (
                    <div className="absolute bottom-3 left-0 w-full px-6 bg-white">
                        <button
                            onClick={() => setIsOpenAllCarsNames(true)}
                            className="w-full bg-grey h-10 text-lg rounded"
                        >
                            Barchasini ko'rish
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
