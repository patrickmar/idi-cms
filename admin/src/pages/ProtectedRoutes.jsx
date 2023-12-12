/* eslint-disable */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const { user } = useSelector((state) => state.auth)
    const location = useLocation()

    return user != null ? <Outlet /> : <Navigate to="/" replace state={{ from: location?.pathname }} />;

};

export default ProtectedRoute;