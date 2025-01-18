import { useState } from "react";
import UserProfile from "./UserProfile";
import UserLikedCars from "./UserLikedCars";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "../../features/auth/authSlice";
import DealerProfile from "./DealerProfile";
import MyCreateCar from "./MyCreateCar";
import { UserDataType } from "../../types";
import Loading from "../../components/loading/Loading";

const Profile = () => {
    const userData: UserDataType | null | undefined = useSelector(
        selectCurrentUserData
    );

    if (!userData) {
        return <Loading />;
    }

    const [activeTab, setActiveTab] = useState<
        "userProfile" | "likedCar" | "dealerProfile" | "myCreateCars"
    >(userData.role === "user" ? "userProfile" : "dealerProfile");

    return (
        <div className="my-container">
            <div className="my-10 font-medium text-2xl">
                {userData.name ? userData.name : userData.username}
            </div>
            <div className="flex justify-between gap-20">
                {userData.role === "user" ? (
                    <div className="w-[400px] flex flex-col gap-1">
                        <button
                            onClick={() => setActiveTab("userProfile")}
                            className={`w-full h-11  text-lg text-left pl-5 rounded ${
                                activeTab === "userProfile" ? "bg-[#ddd]" : ""
                            }`}
                        >
                            Ma'lumotlarim
                        </button>
                        <button
                            onClick={() => setActiveTab("likedCar")}
                            className={`w-full h-11  text-lg text-left pl-5 rounded ${
                                activeTab === "likedCar" ? "bg-[#ddd]" : ""
                            }`}
                        >
                            Sevimlilar
                        </button>
                    </div>
                ) : (
                    <div className="w-[400px] flex flex-col gap-1">
                        <button
                            onClick={() => setActiveTab("dealerProfile")}
                            className={`w-full h-11  text-lg text-left pl-5 rounded ${
                                activeTab === "dealerProfile" ? "bg-[#ddd]" : ""
                            }`}
                        >
                            Ma'lumotlarim
                        </button>
                        <button
                            onClick={() => setActiveTab("myCreateCars")}
                            className={`w-full h-11  text-lg text-left pl-5 rounded ${
                                activeTab === "myCreateCars" ? "bg-[#ddd]" : ""
                            }`}
                        >
                            Mening mashinalarim
                        </button>
                    </div>
                )}

                {activeTab === "userProfile" && userData.role === "user" ? (
                    <UserProfile userData={userData} />
                ) : activeTab === "dealerProfile" &&
                  userData.role === "dealer" ? (
                    <DealerProfile userData={userData} />
                ) : activeTab === "likedCar" && userData.role === "user" ? (
                    <UserLikedCars />
                ) : activeTab === "myCreateCars" &&
                  userData.role === "dealer" ? (
                    <MyCreateCar />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
export default Profile;
