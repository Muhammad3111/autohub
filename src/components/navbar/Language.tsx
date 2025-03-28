import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
import UzIcon from "../../assets/uzbekistan-flag.png";
import RuIcon from "../../assets/russian-flag.png";
import {
    selectCurrentLanguage,
    changeLanguage,
} from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";

const Language = () => {
    const language = useSelector(selectCurrentLanguage);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { i18n } = useTranslation();

    const handleLanguageChange = (lang: "uz" | "ru") => {
        dispatch(changeLanguage(lang));
        setIsOpen(false);
        i18n.changeLanguage(lang);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 py-1 rounded-sm"
            >
                <img
                    src={language === "uz" ? UzIcon : RuIcon}
                    width={30}
                    alt="language icon"
                />
                <FaChevronDown
                    className={`duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                />
            </button>

            <div
                className={`absolute top-14 -left-[22px] w-40 bg-white text-black border border-gray-300 rounded shadow-lg p-2 z-10 ${
                    isOpen ? "animate-fade-in-down" : "hidden"
                }`}
            >
                <div
                    onClick={() => handleLanguageChange("uz")}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                    <img src={UzIcon} width={30} alt="Uzbek" />
                    <p>O'zbekcha</p>
                </div>
                <div
                    onClick={() => handleLanguageChange("ru")}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                    <img src={RuIcon} width={30} alt="Russian" />
                    <p>Русский</p>
                </div>
            </div>
        </div>
    );
};

export default Language;
