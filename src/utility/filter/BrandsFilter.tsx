import { useEffect, useRef, useState } from "react";
import data from "../../mock/data.json";

export default function BrandsFilter() {
    const brands: Brand[] = data.brands; // Mock fayldan brendlar
    const sortedBradns = brands.sort((a, b) => a.name.localeCompare(b.name));
    const brandSectionRef = useRef<HTMLDivElement | null>(null);
    const brandListRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeLetter, setActiveLetter] = useState(brands[0]?.name[0] || "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (brandSectionRef.current) {
            observer.observe(brandSectionRef.current);
        }

        return () => {
            if (brandSectionRef.current) {
                observer.unobserve(brandSectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!brandListRef.current) return;

            const scrollPosition = brandListRef.current.scrollTop;
            const brandItems =
                brandListRef.current.querySelectorAll("[data-letter]");

            for (let i = 0; i < brandItems.length; i++) {
                const item = brandItems[i] as HTMLElement;
                if (
                    item.offsetTop - brandListRef.current.offsetTop >
                    scrollPosition
                ) {
                    setActiveLetter(item.getAttribute("data-letter") || "");
                    break;
                }
            }
        };

        if (brandListRef.current) {
            brandListRef.current.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (brandListRef.current) {
                brandListRef.current.removeEventListener(
                    "scroll",
                    handleScroll
                );
            }
        };
    }, []);
    return (
        <div
            ref={brandSectionRef}
            className={`flex flex-col basis-1/4 bg-grey h-[90vh] ${
                isVisible ? "sticky top-[72px]" : ""
            }`}
        >
            <div className="flex  h-full border-gray-300">
                {/* Brendlar ro‘yxati */}
                <div className="flex flex-col w-full relative">
                    <div className="w-full text-center text-base font-bold py-1 border-b absolute top-0 z-10 border-gray-300 bg-grey">
                        {activeLetter}
                    </div>
                    <div
                        ref={brandListRef}
                        className="flex-1 overflow-y-auto border-gray-300 scrollbar-thin"
                    >
                        {sortedBradns.map((brand, index) => {
                            const prevLetter =
                                index > 0 ? brands[index - 1].name[0] : "";
                            const currentLetter = brand.name[0];
                            const showLetterHeader =
                                prevLetter !== currentLetter;

                            return (
                                <div
                                    key={brand.id}
                                    data-letter={currentLetter}
                                    className=""
                                >
                                    {showLetterHeader && (
                                        <div className="text-base font-bold mb-1 bg-grey border-y border-gray-300 px-2 py-1">
                                            {currentLetter}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-4 cursor-pointer hover:text-primary duration-300 px-2">
                                        <img
                                            src={brand.image}
                                            alt={brand.name}
                                            className="w-10 h-10 object-contain"
                                        />
                                        <h3 className="text-base font-semibold">
                                            {brand.name}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
