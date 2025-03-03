const SkeletonByCars = () => {
    return Array.from({ length: 4 }).map((_, index) => (
        <div
            key={index}
            className="w-full min-h-[400px] bg-white flex flex-col duration-300 justify-between shadow-md border-2 animate-pulse"
        >
            <div className="absolute right-2 top-2 p-3 bg-gray-300 border-2 border-gray-400 rounded-full"></div>

            <div className="w-full h-60 bg-gray-300 flex items-center justify-center">
                <svg
                    className="w-20 h-20 text-gray-200 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                >
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
            </div>

            <div className="p-4 flex flex-col gap-4">
                <div className="bg-gray-300 w-1/3 h-5 rounded-md"></div>

                <div className="flex items-center">
                    <div className="bg-gray-300 h-6 w-1/2 rounded-md"></div>
                    <div className="bg-gray-300 h-6 w-1/3 rounded-md ml-auto"></div>
                </div>

                <div className="border-y-2 py-4 flex flex-col gap-2">
                    <div className="h-3 bg-gray-300 w-full rounded-md"></div>
                    <div className="h-3 bg-gray-300 w-4/5 rounded-md"></div>
                    <div className="h-3 bg-gray-300 w-3/5 rounded-md"></div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="bg-gray-300 h-5 w-16 rounded-md"></div>
                    <div className="bg-gray-300 h-5 w-16 rounded-md"></div>
                    <div className="bg-gray-300 h-5 w-16 rounded-md"></div>
                </div>
            </div>
        </div>
    ));
};

export default SkeletonByCars;
