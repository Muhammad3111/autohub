import { CiBoxes } from "react-icons/ci";
import { IoCarSportOutline, IoChatbubblesOutline } from "react-icons/io5";
import { LuNotebookText, LuUsersRound } from "react-icons/lu";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { useGetCountsQuery } from "../../../features/counts/counts";

export default function Dashboard() {
    const { data, isLoading } = useGetCountsQuery({});

    if (isLoading)
        return (
            <div className="px-6 py-4">
                <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2 animate-pulse"
                        >
                            <div className="w-16 h-16 bg-gray-300 rounded-full" />
                            <div className="flex flex-col gap-2 w-full">
                                <div className="w-20 h-6 bg-gray-300 rounded" />
                                <div className="w-32 h-4 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    const counts: Counts = data;

    return (
        <div className="px-6 py-4">
            <div className="grid grid-cols-3 gap-4">
                <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
                    <div>
                        <IoCarSportOutline className="text-7xl" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <h1 className="text-2xl text-black">
                            {counts.vehicle}
                        </h1>
                        <p className="text-base text-gray-400">AVtomobillar</p>
                    </div>
                </div>
                <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
                    <div>
                        <CiBoxes className="text-7xl" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <h1 className="text-2xl text-black">
                            {counts.spare_part}
                        </h1>
                        <p className="text-base text-gray-400">
                            Ehtiyot qisimlar
                        </p>
                    </div>
                </div>
                <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
                    <div>
                        <MdOutlineSpeakerNotes className="text-7xl" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <h1 className="text-2xl text-black">
                            {counts.article}
                        </h1>
                        <p className="text-base text-gray-400">Bloglar</p>
                    </div>
                </div>
                <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
                    <div>
                        <LuNotebookText className="text-7xl" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <h1 className="text-2xl text-black">
                            {counts.test_drive}
                        </h1>
                        <p className="text-base text-gray-400">
                            Test Drive So'rovlar
                        </p>
                    </div>
                </div>
                <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
                    <div>
                        <IoChatbubblesOutline className="text-7xl" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <h1 className="text-2xl text-black">
                            {counts.reviews}
                        </h1>
                        <p className="text-base text-gray-400">
                            Commentariyalar
                        </p>
                    </div>
                </div>
                <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
                    <div>
                        <LuUsersRound className="text-7xl" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <h1 className="text-2xl text-black">{counts.user}</h1>
                        <p className="text-base text-gray-400">
                            Foydalanuvchilar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
