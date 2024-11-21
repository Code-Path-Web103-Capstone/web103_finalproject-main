import { Navigate } from "react-router-dom";
import { useUser } from "../services/context"; // Adjust the import based on your context location

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUser();

  // Redirect to login if the user is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
