import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen fixed top-0 left-0 bg-black bg-opacity-20 backdrop-blur-sm z-50">
            <div className="w-16 h-16 border-4 border-solid rounded-full border-primary border-t-transparent animate-spin"></div>
        </div>
    );
};

export default Loading;
