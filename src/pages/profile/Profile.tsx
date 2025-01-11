import { useState } from "react";
import MyInformation from "./MyInformation";
import MyFavouriteCars from "./MyFavouriteCars";

const Profile = () => {
    const [activeTab, setActiveTab] = useState<"profile" | "liked-car">(
        "profile"
    );

    return (
        <div className="container mx-auto w-full">
            <div className="my-10 font-medium text-2xl">
                Muhammadjon Tursunboyev
            </div>
            <div className="flex justify-between gap-20">
                <div className="w-[400px] flex flex-col gap-1">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`w-full h-11  text-lg text-left pl-5 rounded ${
                            activeTab === "profile" ? "bg-[#ddd]" : ""
                        }`}
                    >
                        Ma'lumotlarim
                    </button>
                    <button
                        onClick={() => setActiveTab("liked-car")}
                        className={`w-full h-11  text-lg text-left pl-5 rounded ${
                            activeTab === "liked-car" ? "bg-[#ddd]" : ""
                        }`}
                    >
                        Sevimlilar
                    </button>
                </div>

                {activeTab === "profile" ? (
                    <MyInformation />
                ) : (
                    <MyFavouriteCars />
                )}
            </div>
        </div>
    );
};
export default Profile;
