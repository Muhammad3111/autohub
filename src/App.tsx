import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import NotFound from "./pages/not-found/NotFound";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div className="pb-10">
            <Navbar />
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={10}
                toastOptions={{
                    duration: 2000,
                    style: {
                        fontSize: "18px",
                        borderRadius: "2px",
                    },
                }}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
        </div>
    );
}

export default App;
