import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="" />;

  return <Outlet />;
};

export default ProtectedRoute;
