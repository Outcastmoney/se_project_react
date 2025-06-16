import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, redirectPath = '/' }) => {
  const location = useLocation();

  console.log('ProtectedRoute - isLoggedIn:', isLoggedIn);
  console.log('ProtectedRoute - Current location:', location);
  console.log('ProtectedRoute - JWT in localStorage:', !!localStorage.getItem('jwt'));

  if (!isLoggedIn) {
    console.log('ProtectedRoute - Not logged in, redirecting to', redirectPath);
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  console.log('ProtectedRoute - Access granted, rendering route content');
  return <Outlet />;
};

export default ProtectedRoute;
