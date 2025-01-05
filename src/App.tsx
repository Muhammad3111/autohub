import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import NotFound from "./pages/not-found/NotFound";
import { Slide, ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Cars from "./pages/cars/Cars";
import Posts from "./pages/posts/Posts";
import Users from "./pages/users/Users";
import TestDrive from "./pages/test-drive/TestDrive";
import Commetns from "./pages/comments/Commetns";
import SpareParts from "./pages/spare-parts/SpareParts";
import PostsCategory from "./pages/posts/PostsCategory";
import ScrollToTop from "./components/scroll-top/ScrollTop";
import AddCar from "./components/cars/AddCar";
import Media from "./pages/media/Media";

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin"); // Admin yo‘llarini aniqlash

  return (
    <div>
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
      <Routes>
        {/* Website yo‘llari */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/not-found" element={<NotFound />} />

        {/* Admin yo‘llari */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/media" element={<Media />} />
          <Route path="/admin/cars" element={<Cars />} />
          <Route path="/admin/cars/add" element={<AddCar />} />
          <Route path="/admin/spare-parts" element={<SpareParts />} />
          <Route path="/admin/posts" element={<Posts />} />
          <Route path="/admin/posts/category" element={<PostsCategory />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/test-drive" element={<TestDrive />} />
          <Route path="/admin/comments" element={<Commetns />} />
        </Route>

        {/* Not Found yo‘llari */}
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
}

export default App;
