import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn, userRole }) => {
  
  if (!isLoggedIn || userRole !== 'superadmin') {
    // Redirect to home or another page if not authorized
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;