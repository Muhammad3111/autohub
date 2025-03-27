import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUserData } from "../features/auth/authSlice";

type ProtectedRouteProps = {
    children: React.ReactNode;
    requiredRole: string;
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const userData = useSelector(selectCurrentUserData);
    const isAuthenticated = !!userData;

    const hasRequiredRole = userData?.role === requiredRole;

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (requiredRole === "admin" && !hasRequiredRole) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
