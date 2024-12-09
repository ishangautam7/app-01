import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const successMessage = location.state?.successMessage;

    if (!successMessage) {
        return <Navigate to="/verify" replace />;
    }

    return children;
};

export default ProtectedRoute;
