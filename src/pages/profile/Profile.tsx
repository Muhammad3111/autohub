import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logOut());
        navigate("/");
    };

    return (
        <div
            style={{ height: "calc(100vh - 154px)" }}
            className="container mx-auto w-full pb-2"
        >
            <h1 className="text-2xl">Profile sahifasi tayyorlanmoqda...</h1>
            <div className="flex items-end justify-center h-full">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 h-10 w-full text-white rounded"
                >
                    Chiqish
                </button>
            </div>
        </div>
    );
};
export default Profile;
