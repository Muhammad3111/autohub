import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Admin sahifalar
import Login from "../pages/admin/login/Login";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import AdminCars from "../pages/admin/cars/Cars";
import Posts from "../pages/admin/posts/Posts";
import Users from "../pages/admin/users/Users";
import TestDrive from "../pages/admin/test-drive/TestDrive";
import Comments from "../pages/admin/comments/Commetns";
import AdminSpareParts from "../pages/admin/spare-parts/SpareParts";
import Media from "../pages/admin/media/Media";
import AddCar from "../adminComponents/cars/AddCar";
import UpdateCar from "../adminComponents/cars/UpdateCar";
import AddSpareParts from "../adminComponents/spareparts/AddSparePart";
import SpareCategories from "../pages/admin/spare-parts/SpareCategories";
import AddBlog from "../adminComponents/posts/AddBlog";
import AddMedia from "../adminComponents/media/AddMedia";
import Brands from "../pages/admin/brands/Brands";
import AddBrand from "../adminComponents/brands/AddBrand";
import UpdateBrand from "../adminComponents/brands/UpdateBrand";

// User sahifalar
import Home from "../pages/home/Home";
import AboutUs from "../pages/about-us/AboutUs";
import Cars from "../pages/cars/Cars";
import SpareParts from "../pages/spare-parts/SpareParts";
import Services from "../pages/services/Services";
import Dealers from "../pages/dealers/Dealers";
import News from "../pages/news/News";
import Contact from "../pages/contact/Contact";
import SignIn from "../pages/sign-in/SignIn";
import SignUp from "../pages/sign-up/SignUp";
import NotFound from "../pages/not-found/NotFound";
import Search from "../pages/search/Search";
import Profile from "../pages/profile/Profile";

// Layouts
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken } from "../features/auth/authSlice";

const Router = () => {
    const userToken = useSelector(selectCurrentAccessToken);

    return (
        <Routes>
            {/* user route */}
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element />
            <Route path="/spare-parts" element={<SpareParts />} />
            <Route path="/services" element={<Services />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route
                path="/sign-in"
                element={userToken ? <Navigate to="/" replace /> : <SignIn />}
            />
            <Route
                path="/sign-up"
                element={userToken ? <Navigate to="/" replace /> : <SignUp />}
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute requiredRole="user">
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {/* admin route */}

            <Route path="/admin/login" element={<Login />} />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute requiredRole="admin">
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="media" element={<Media />} />
                <Route path="media/add" element={<AddMedia />} />
                <Route path="brands" element={<Brands />} />
                <Route path="brands/add" element={<AddBrand />} />
                <Route
                    path="brands/update/:brandId"
                    element={<UpdateBrand />}
                />
                <Route path="cars" element={<AdminCars />} />
                <Route path="cars/add" element={<AddCar />} />
                <Route path="cars/update/:carId" element={<UpdateCar />} />
                <Route path="spare-parts" element={<AdminSpareParts />} />
                <Route path="spare-parts/add" element={<AddSpareParts />} />
                <Route
                    path="spare-parts/categories"
                    element={<SpareCategories />}
                />
                <Route path="posts" element={<Posts />} />
                <Route path="posts/add" element={<AddBlog />} />
                <Route path="users" element={<Users />} />
                <Route path="test-drive" element={<TestDrive />} />
                <Route path="comments" element={<Comments />} />
            </Route>

            <Route path="*" element={<Navigate to="/not-found" />} />
            <Route path="/not-found" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
