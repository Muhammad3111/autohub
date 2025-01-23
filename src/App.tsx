import { useLocation } from "react-router-dom";
import GlobalLoading from "./components/loading/GlobalLoading";
import Navbar from "./components/navbar/Navbar";
import ScrollToTop from "./components/scroll-top/ScrollTop";
import { Slide, ToastContainer } from "react-toastify";
import Router from "./router/Router";
import Footer from "./components/footer/Footer";

function App() {
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith("/admin");

    return (
        <div>
            <GlobalLoading />
            {!isAdminPath && <Navbar />}
            <ScrollToTop />
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
            <Router />
            <Footer />
        </div>
    );
}

export default App;
