import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import NotFound from "./pages/not-found/NotFound";
import { Slide, ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/admin/login/Login";
import Layout from "./layout/Layout";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Cars from "./pages/admin/cars/Cars";
import Posts from "./pages/admin/posts/Posts";
import Users from "./pages/admin/users/Users";
import TestDrive from "./pages/admin/test-drive/TestDrive";
import Commetns from "./pages/admin/comments/Commetns";
import SpareParts from "./pages/admin/spare-parts/SpareParts";
import ScrollToTop from "./components/scroll-top/ScrollTop";
import AddCar from "./adminComponents/cars/AddCar";
import Search from "./pages/search/Search";
import GlobalLoading from "./components/loading/GlobalLoading";
import Profile from "./pages/profile/Profile";
import Media from "./pages/admin/media/Media";
import UpdateCar from "./adminComponents/cars/UpdateCar";
import AddSpareParts from "./adminComponents/spareparts/AddSparePart";
import SpareCategories from "./pages/admin/spare-parts/SpareCategories";
import AddBlog from "./adminComponents/posts/AddBlog";
import AddMedia from "./adminComponents/media/AddMedia";

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin"); // Admin yo‘llarini aniqlash

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
      <Routes>
        {/* Website yo‘llari */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin yo‘llari */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/media" element={<Media />} />
          <Route path="/admin/media/add" element={<AddMedia />} />
          <Route path="/admin/cars" element={<Cars />} />
          <Route path="/admin/cars/add" element={<AddCar />} />
          <Route path="/admin/cars/update/:carId" element={<UpdateCar />} />
          <Route path="/admin/spare-parts" element={<SpareParts />} />
          <Route path="/admin/spare-parts/add" element={<AddSpareParts />} />
          <Route
            path="/admin/spare-parts/categories"
            element={<SpareCategories />}
          />
          <Route path="/admin/posts" element={<Posts />} />
          <Route path="/admin/posts/add" element={<AddBlog />} />
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
