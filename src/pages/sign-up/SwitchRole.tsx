import React from "react";

type SwitchRoleProps = {
    role: "user" | "dealer";
    setRole: React.Dispatch<React.SetStateAction<"user" | "dealer">>;
};

const SwitchRole: React.FC<SwitchRoleProps> = ({ role, setRole }) => {
    return (
        <div className="flex justify-center items-center mb-4">
            <ul className="flex gap-1 relative p-1 bg-gray-200 rounded-sm w-full">
                <li className="w-full">
                    <input
                        type="radio"
                        id="radio-user"
                        name="radio-switch"
                        className="sr-only"
                        checked={role === "user"}
                        onChange={() => setRole("user")}
                    />
                    <label
                        htmlFor="radio-user"
                        className={`flex items-center justify-center w-full h-10 font-semibold rounded-sm cursor-pointer ${
                            role === "user"
                                ? "text-white bg-primary"
                                : "text-gray-700 bg-white"
                        }`}
                    >
                        Foydalanuvchi
                    </label>
                </li>
                <li className="w-full">
                    <input
                        type="radio"
                        id="radio-dealer"
                        name="radio-switch"
                        className="sr-only"
                        checked={role === "dealer"}
                        onChange={() => setRole("dealer")}
                    />
                    <label
                        htmlFor="radio-dealer"
                        className={`flex items-center justify-center w-full h-10 font-semibold rounded-sm cursor-pointer ${
                            role === "dealer"
                                ? "text-white bg-primary"
                                : "text-gray-700 bg-white"
                        }`}
                    >
                        Diller
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default SwitchRole;
