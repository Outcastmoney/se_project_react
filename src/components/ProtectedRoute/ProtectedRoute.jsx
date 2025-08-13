import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, redirectPath = '/', children }) => {
  const location = useLocation();



  if (!isLoggedIn) {

    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }


  return children;
};

export default ProtectedRoute;
