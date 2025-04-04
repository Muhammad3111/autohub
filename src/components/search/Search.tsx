import React, { useContext, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Context } from "../../context/Context";
import { useLazyGetSearchDataQuery } from "../../features/search/search";
import { FiX } from "react-icons/fi";

const Search = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const context = useContext(Context);
    if (!context) {
        throw new Error(
            "Ushbu component context providerdan tashqarida ishlatilmoqda"
        );
    }

    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { setSelected } = context;

    const [searchTrigger, { data, isLoading }] = useLazyGetSearchDataQuery();
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(e.target as Node) &&
            resultsRef.current &&
            !resultsRef.current.contains(e.target as Node)
        ) {
            setIsFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            if (e.target.value.trim().length) {
                searchTrigger({ query: e.target.value, page: 1, type: null });
            }
        }, 3000);

        setTimer(newTimer);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const handleItemClick = (itemName: string) => {
        navigate(`/cars/${itemName}`);
        setSelected({ name: itemName, value: itemName });
        setInputValue(itemName);
        setIsFocused(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex items-center w-[550px] relative'
        >
            <div className='w-full relative'>
                <input
                    ref={inputRef}
                    type='text'
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    className='w-full h-10 px-4 focus:outline-none text-black border-2 border-primary'
                />

                {!isFocused && inputValue === "" && (
                    <div className='absolute top-0 left-4 w-full h-full flex text-gray-500 items-center justify-start pointer-events-none'>
                        <Typewriter
                            options={{
                                strings: [
                                    "Onix",
                                    "Tracker",
                                    "Malibu",
                                    "Equinox"
                                ],
                                autoStart: true,
                                loop: true,
                                delay: 75,
                                deleteSpeed: 50
                            }}
                        />
                    </div>
                )}

                {inputValue.trim().length > 0 && (
                    <FiX
                        className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-primary'
                        onClick={() => {
                            setInputValue("");
                            setIsFocused(false);
                        }}
                    />
                )}
            </div>

            {isLoading && inputValue.trim().length > 0 && (
                <div className='absolute top-full left-0 w-full bg-white border-2 border-primary shadow-lg mt-1 z-10 p-2 text-center text-gray-500'>
                    {t("loading")}...
                </div>
            )}

            {data &&
                data.length === 0 &&
                inputValue.trim().length > 0 &&
                !isLoading && (
                    <div className='absolute top-full left-0 w-full bg-white border-2 border-primary shadow-lg mt-1 z-10 p-2 text-center text-gray-500'>
                        {t("not-found")}
                    </div>
                )}

            {data &&
                data.length > 0 &&
                !isLoading &&
                inputValue.trim().length > 0 &&
                isFocused && (
                    <div
                        ref={resultsRef}
                        className='absolute top-full left-0 w-full bg-white border-2 border-primary shadow-lg mt-1 z-10'
                    >
                        {data.map(
                            (item: any) =>
                                item && (
                                    <div
                                        key={item.id}
                                        className='p-2 hover:bg-gray-200 cursor-pointer'
                                        onClick={() =>
                                            handleItemClick(
                                                item.name_uz || item.title_uz
                                            )
                                        }
                                    >
                                        {item.name_uz || item.title_uz}
                                    </div>
                                )
                        )}
                    </div>
                )}

            <button
                type='submit'
                className='bg-primary active:bg-primary-hover duration-150 text-white h-10 px-2'
            >
                {t("navbar.search")}
            </button>
        </form>
    );
};

export default Search;
