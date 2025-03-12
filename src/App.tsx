import ScrollToTop from "./components/scroll-top/ScrollTop";
import { Slide, ToastContainer } from "react-toastify";
import Router from "./router/Router";

function App() {

    return (
        <div>
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
        </div>
    );
}

export default App;
