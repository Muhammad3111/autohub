import { useNavigate } from "react-router-dom";

type ButtonType = {
  children: React.ReactNode;
  path?: string;
  className?: string;
  type?: "submit" | "reset" | "button";
};

const Button = ({ children, path, className, type }: ButtonType) => {
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
      type={type}
      onClick={handleClick}
      className={`bg-primary hover:bg-primary-hover duration-150 text-white py-2.5 shadow-custom shadow-gray-400 font-medium flex items-center gap-4 ${className}`}
    >
      {children}
      <div className="w-2 h-2 rounded-full bg-white"></div>
    </button>
  );
};

export default Button;
