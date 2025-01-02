import { useNavigate } from "react-router-dom";

type ButtonType = {
    children: React.ReactNode;
    path?: string;
    className?: string;
};

const Button = ({ children, path, className }: ButtonType) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (path) {
            navigate(path);
        } else {
            console.error("Path is undefined or invalid.");
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`bg-primary text-white py-2.5 shadow-custom shadow-gray-400 font-medium rounded-sm flex items-center gap-4 ${className}`}
        >
            {children}
            <div className="w-2 h-2 rounded-full bg-white"></div>
        </button>
    );
};

export default Button;
