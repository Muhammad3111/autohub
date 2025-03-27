import { Link } from "react-router-dom";
import Header from "../../components/header/Header";

type DealerIdType = {
    id: string;
    img: string;
    title: string;
    mainBrands: string;
    electricity: string;
    landsite: string;
};

const Dealers = () => {
    const dealerData: DealerIdType[] = [
        {
            id: "dealer-1",
            img: "https://chinaglobalsouth.com/dev/wp-content/uploads/2023/11/BYD-Thailand-768x464.jpg",
            title: "BYD Dynasty Ruipeng Hongda Pingsan Store",
            mainBrands: " Main brands: BYD A total of 97 models on sale",
            electricity: " electricity talk: 77 269 47 77",
            landsite:
                "landsite: 1st-2nd Floor, Building 3, Xingye Road, Donggaocun",
        },
        {
            id: "dealer-2",
            img: "https://chinaglobalsouth.com/dev/wp-content/uploads/2023/11/BYD-Thailand-768x464.jpg",
            title: "BYD Dynasty Ruipeng Hongda Pingsan Store",
            mainBrands: " Main brands: BYD A total of 97 models on sale",
            electricity: " electricity talk: 77 269 47 77",
            landsite:
                "landsite: 1st-2nd Floor, Building 3, Xingye Road, Donggaocun",
        },
        {
            id: "dealer-3",
            img: "https://chinaglobalsouth.com/dev/wp-content/uploads/2023/11/BYD-Thailand-768x464.jpg",
            title: "BYD Dynasty Ruipeng Hongda Pingsan Store",
            mainBrands: " Main brands: BYD A total of 97 models on sale",
            electricity: " electricity talk: 77 269 47 77",
            landsite:
                "landsite: 1st-2nd Floor, Building 3, Xingye Road, Donggaocun",
        },
    ];

    return (
        <div className="w-full">
            <Header title="Dealers" />
            <div className="w-full bg-white">
                <div className="flex flex-col gap-4 p-10">
                    {dealerData.map((item) => (
                        <Link
                            to={`/dealers/${item.id}`}
                            state={item}
                            key={item.id}
                            className="w-full bg-white p-5 hover:bg-primary hover:bg-opacity-5 border hover:border-primary duration-150 flex gap-8"
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="h-[150px] object-cover"
                                width={200}
                            />

                            <div className="flex flex-col gap-4">
                                <h1 className="font-normal text-primary text-lg cursor-pointer">
                                    {item.title}
                                </h1>
                                <p className="text-[#666666] text-sm">
                                    {item.mainBrands}
                                </p>
                                <p className="text-[#666666] text-sm">
                                    {item.electricity}
                                </p>
                                <p className="text-[#666666] text-sm">
                                    {item.landsite}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Dealers;
