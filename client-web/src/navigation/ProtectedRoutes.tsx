import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const ProtectedRoutes = () => {
	const { isAuthenticated } = useAuth();
	return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
