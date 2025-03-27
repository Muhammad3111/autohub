type PhoneInputProps = {
    value: string;
    onChange: (value: string) => void;
};

const PhoneInput = ({ value, onChange }: PhoneInputProps) => {
    const formatUzbekNumber = (input: string) => {
        const cleanNumber = input.replace(/\D/g, "").slice(0, 9);

        let formatted = "";
        if (cleanNumber.length > 0) {
            formatted = ` ${cleanNumber.slice(0, 2)}`;
        }
        if (cleanNumber.length > 2) {
            formatted += ` ${cleanNumber.slice(2, 5)}`;
        }
        if (cleanNumber.length > 5) {
            formatted += ` ${cleanNumber.slice(5, 7)}`;
        }
        if (cleanNumber.length > 7) {
            formatted += ` ${cleanNumber.slice(7, 9)}`;
        }

        return formatted;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatUzbekNumber(e.target.value);
        onChange(formatted);
    };

    return (
        <div className="flex flex-col items-start">
            <div className="flex items-center w-full ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300 h-10 text-sm rounded">
                <label
                    htmlFor="phone-number-input"
                    className="text-primary font-medium pl-3 text-lg"
                >
                    +998
                </label>
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    maxLength={14}
                    className="w-full bg-transparent indent-1 outline-none text-lg"
                    placeholder="90 123 4567"
                    autoComplete="off"
                    name="phone-number-input"
                    id="phone-number-input"
                    autoFocus
                />
            </div>
        </div>
    );
};

export default PhoneInput;
