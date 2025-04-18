import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress } from '@mui/material';
import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  if (isLoading) return <CircularProgress />;

  if (!isAuthenticated) {
    loginWithRedirect({ appState: { returnTo: location.pathname } });
    return null; // mientras redirige, no renderiza nada
  }

  return children;
};

export default ProtectedRoute;
