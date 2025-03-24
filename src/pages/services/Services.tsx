// import Header from "../../components/header/Header";

// const Services = () => {
//     return (
//         <div className="w-full">
//             <Header title="Services" />
//             <div className="w-full bg-white">
//                 <div className="p-10 flex flex-col gap-4">
//                     <div className="w-full bg-white hover:bg-primary hover:bg-opacity-5 border hover:border-primary duration-150 flex justify-between p-5">
//                         <div className="flex gap-8">
//                             <img
//                                 src="https://chinaglobalsouth.com/dev/wp-content/uploads/2023/11/BYD-Thailand-768x464.jpg"
//                                 alt=""
//                                 className="cursor-pointer h-[150px] object-cover"
//                                 width={200}
//                             />

//                             <div className="flex flex-col gap-4">
//                                 <h1 className="font-normal text-primary text-lg cursor-pointer">
//                                     BYD Dynasty Ruipeng Hongda Pingsan Store
//                                 </h1>
//                                 <p className="text-[#666666] text-sm">
//                                     Main brands: {"BYD"}{" "}
//                                     {"A total of 97 models on sale"}
//                                 </p>
//                                 <p className="text-[#666666] text-sm">
//                                     electricity talk: {"77 269 47 77"}
//                                 </p>
//                                 <p className="text-[#666666] text-sm">
//                                     landsite: 1st-2nd Floor, Building 3, Xingye
//                                     Road, Donggaocun
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="flex flex-col gap-2">
//                             <button className="border border-primary bg-[#F6F9FC] text-primary w-[105px] p-2 rounded hover:bg-primary hover:bg-opacity-55 hover:text-white duration-150 text-sm text-left pl-4">
//                                 Enter the store
//                             </button>
//                             <button className="border bg-primary w-[105px] p-2 rounded hover:bg-primary-hover duration-150 text-sm text-white text-left pl-4">
//                                 Get the reserve price
//                             </button>
//                         </div>
//                     </div>
//                     <div className="w-full bg-white p-5 hover:bg-primary hover:bg-opacity-5 border hover:border-primary duration-150 flex justify-between">
//                         <div className="flex gap-8">
//                             <img
//                                 src="https://chinaglobalsouth.com/dev/wp-content/uploads/2023/11/BYD-Thailand-768x464.jpg"
//                                 alt=""
//                                 className="cursor-pointer h-[150px] object-cover"
//                                 width={200}
//                             />

//                             <div className="flex flex-col gap-4">
//                                 <h1 className="font-normal text-primary text-lg cursor-pointer">
//                                     BYD Dynasty Ruipeng Hongda Pingsan Store
//                                 </h1>
//                                 <p className="text-[#666666] text-sm">
//                                     Main brands: {"BYD"}{" "}
//                                     {"A total of 97 models on sale"}
//                                 </p>
//                                 <p className="text-[#666666] text-sm">
//                                     electricity talk: {"77 269 47 77"}
//                                 </p>
//                                 <p className="text-[#666666] text-sm">
//                                     landsite: 1st-2nd Floor, Building 3, Xingye
//                                     Road, Donggaocun
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="flex flex-col gap-2">
//                             <button className="border border-primary bg-[#F6F9FC] text-primary w-[105px] p-2 rounded hover:bg-primary hover:bg-opacity-55 hover:text-white duration-150 text-sm text-left pl-4">
//                                 Enter the store
//                             </button>
//                             <button className="border bg-primary w-[105px] p-2 rounded hover:bg-primary-hover duration-150 text-sm text-white text-left pl-4">
//                                 Get the reserve price
//                             </button>
//                         </div>
//                     </div>
//                     <div className="w-full bg-white p-5 hover:bg-primary hover:bg-opacity-5 border hover:border-primary duration-150 flex justify-between">
//                         <div className="flex gap-8">
//                             <img
//                                 src="https://chinaglobalsouth.com/dev/wp-content/uploads/2023/11/BYD-Thailand-768x464.jpg"
//                                 alt=""
//                                 className="cursor-pointer h-[150px] object-cover"
//                                 width={200}
//                             />

//                             <div className="flex flex-col gap-4">
//                                 <h1 className="font-normal text-primary text-lg cursor-pointer">
//                                     BYD Dynasty Ruipeng Hongda Pingsan Store
//                                 </h1>
//                                 <p className="text-[#666666] text-sm">
//                                     Main brands: {"BYD"}{" "}
//                                     {"A total of 97 models on sale"}
//                                 </p>
//                                 <p className="text-[#666666] text-sm">
//                                     electricity talk: {"77 269 47 77"}
//                                 </p>
//                                 <p className="text-[#666666] text-sm">
//                                     landsite: 1st-2nd Floor, Building 3, Xingye
//                                     Road, Donggaocun
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="flex flex-col gap-2">
//                             <button className="border border-primary bg-[#F6F9FC] text-primary w-[105px] p-2 rounded hover:bg-primary hover:bg-opacity-55 hover:text-white duration-150 text-sm text-left pl-4">
//                                 Enter the store
//                             </button>
//                             <button className="border bg-primary w-[105px] p-2 rounded hover:bg-primary-hover duration-150 text-sm text-white text-left pl-4">
//                                 Get the reserve price
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default Services;

import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import BrandsFilter from "../../utility/filter/BrandsFilter";
import ServiceImg from "../../assets/dealer-default-img.png";
import { MdLocationPin, MdOutlineDirectionsCar } from "react-icons/md";

type LabelsType = {
    label: string[];
};

type ServiceIdType = {
    id: string;
    img: string;
    title: string;
    carInfo: string;
    address: string;
    labels: LabelsType[];
};

const Services = () => {
    const serviceData: ServiceIdType[] = [
        {
            id: "service-1",
            img: ServiceImg,
            title: "Attorney official have real attention necessary spring great safe say care would professor worker guy part wide include weight player.",
            carInfo:
                "Attorney official have real attention necessary spring great safe say care would professor worker guy part wide include weight player.",
            address: "Namangan City 122-uy",
            labels: [
                {
                    label: ["Selling in this city", "11 years in business"],
                },
            ],
        },
        {
            id: "service-2",
            img: ServiceImg,
            title: "Store own himself what early share rich challenge organization.",
            carInfo:
                "Store own himself what early share rich challenge organization.",
            address: "Tashkent City 22-uy",
            labels: [
                {
                    label: ["Selling multiple locations"],
                },
            ],
        },
        {
            id: "service-3",
            img: ServiceImg,
            title: "Manager quite risk wonder young mention cup traditional black movement pull candidate important feeling out economy.",
            carInfo:
                "Manager quite risk wonder young mention cup traditional black movement pull candidate important feeling out economy.",
            address: "New York City street 22",
            labels: [
                {
                    label: ["Selling in this city", "Opened for less than"],
                },
            ],
        },
    ];

    return (
        <div className="w-full">
            <Header title="Services" />
            <div className="flex gap-10">
                <BrandsFilter />
                <div className="w-full bg-white">
                    <div className="flex flex-col gap-4 p-10">
                        {serviceData.map((item) => (
                            <Link
                                to={`/services/${item.id}`}
                                state={item}
                                key={item.id}
                                className="w-full bg-white p-5 hover:bg-primary hover:bg-opacity-5 border hover:border-primary duration-150 flex gap-8 relative"
                            >
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="h-[150px] object-cover"
                                    width={200}
                                />

                                <div className="flex flex-col gap-2">
                                    <h1 className="font-normal text-lg cursor-pointer leading-5">
                                        {item.title}
                                    </h1>
                                    <div>
                                        {item.labels.map((l, inx) => (
                                            <div
                                                key={inx}
                                                className="flex gap-2 mb-2"
                                            >
                                                {l.label.map((text, index) => (
                                                    <button
                                                        key={index}
                                                        className="bg-grey px-3 py-1 rounded text-xs"
                                                    >
                                                        {text}
                                                    </button>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm flex items-center gap-1">
                                        <MdOutlineDirectionsCar className="text-2xl text-gray-500" />
                                        <p>
                                            {item.carInfo.length > 30
                                                ? item.carInfo.slice(0, 30) +
                                                  "..."
                                                : item.carInfo}
                                        </p>
                                    </div>
                                    <div className="text-sm flex items-center gap-1">
                                        <MdLocationPin className="text-2xl text-gray-500" />
                                        <p>{item.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 absolute bottom-4 right-4">
                                    <button className="border border-black p-2 text-sm">
                                        Free consultation
                                    </button>
                                    <button className="border border-primary p-2 text-sm text-primary hover:bg-primary hover:text-white duration-150">
                                        Check the quotation
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Services;
