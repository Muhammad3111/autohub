import React, { useState, memo } from "react";
import Typewriter from "typewriter-effect";

type PropsType = {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const TypeWriterInput = ({ inputValue, setInputValue }: PropsType) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full h-12 px-4 rounded-full text-lg focus:outline-none"
            />

            {!isFocused && inputValue === "" && (
                <div className="absolute top-0 left-4 w-full h-full flex text-gray-500 items-center justify-start pointer-events-none">
                    <Typewriter
                        options={{
                            strings: ["Onix", "Tracker", "Malibu", "Equinox"],
                            autoStart: true,
                            loop: true,
                            delay: 75,
                            deleteSpeed: 50,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

const MemoizedTypeWriterInput = memo(TypeWriterInput);

export default MemoizedTypeWriterInput;
