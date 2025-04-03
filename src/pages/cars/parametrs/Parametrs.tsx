import { Element, scroller } from "react-scroll";
import { useState } from "react";
import { useGetCarByIdQuery } from "../../../features/cars/carSlice";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Parametrs() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetCarByIdQuery(id!);
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState<string | null>(`cat0`);

    const handleScrollToCategory = (id: string) => {
        setActiveCategory(id);
        scroller.scrollTo(id, {
            duration: 800,
            smooth: "easeInOutQuart",
            offset: -80,
            containerId: "tableContainer"
        });
    };

    if (isLoading) {
        return <h1>{t("loading")}...</h1>;
    }
    const carParam: ConfigurationItem[] = data?.configurations || [];

    return (
        <div className='flex h-screen'>
            {/* Sidebar */}
            <div className='w-64 bg-gray-100 px-4 py-6 overflow-y-auto h-full fixed scrollbar-thin'>
                <h2 className='text-xl font-bold mb-4'>Categories</h2>
                {carParam.map((category) => (
                    <button
                        key={category.id}
                        onClick={() =>
                            handleScrollToCategory(`cat${category.id}`)
                        }
                        className={`block w-full text-left p-2 cursor-pointer ${
                            activeCategory === `cat${category.id}`
                                ? "bg-primary text-white"
                                : "hover:bg-gray-200"
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Table Section */}
            <div
                id='tableContainer'
                className='w-full ml-64 p-6 overflow-auto h-screen'
            >
                <div className='mt-20'>
                    <h1 className='text-2xl font-semibold'>Car Parameters</h1>
                    <p className='text-gray-500'>
                        {" "}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                    </p>
                </div>
                {carParam.map((category) => (
                    <Element
                        key={category.id}
                        name={`cat${category.id}`}
                        className='mb-8'
                    >
                        <h2 className='text-xl font-semibold bg-gray-200 p-2'>
                            {category.name}
                        </h2>
                        <table className='w-full border-collapse border border-gray-300 mt-2'>
                            <tbody>
                                {category.children.map((sub, index) => (
                                    <tr key={index} className='border-b'>
                                        <td className='border border-gray-300 px-4 py-2'>
                                            {sub.ckey}
                                        </td>
                                        <td className='border border-gray-300 px-4 py-2'>
                                            {sub.cvalue}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Element>
                ))}
            </div>
        </div>
    );
}
