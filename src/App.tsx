import { Route, Routes, Navigate } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import NotFound from "./pages/not-found/NotFound";
import { Slide, ToastContainer } from "react-toastify";
import Navbar2 from "./components/navbar/Navbar2";

function App() {
    return (
        <div>
            {/* <Navbar /> */}
            <Navbar2 />

            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="colored"
                transition={Slide}
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
