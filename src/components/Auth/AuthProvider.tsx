import { AppState, Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import setupResponseInterceptors, { setAuth0Methods } from "../../utils/interceptor";
import { getAuth0Config } from '../../utils/getConfig';
type Auth0ProviderProps = {
  children: JSX.Element;
};
const AuthInterceptorSetup = () => {
    const { getAccessTokenSilently } = useAuth0();
    
    useEffect(() => {
      // Configura los métodos de Auth0 en el interceptor
      setAuth0Methods({ getAccessTokenSilently });
      
      // Inicializa el interceptor
      setupResponseInterceptors();
      
      return () => {
        setAuth0Methods(null);
      };
    }, [getAccessTokenSilently]);
    
    return null;
  };
  
export const AuthProvider = ({ children }:Auth0ProviderProps) => {
    const navigate = useNavigate();
    const onRedirectCallback = (appState: AppState | undefined) => {
      navigate(appState?.returnTo || window.location.pathname);
    };
    
  
    return (
        <Auth0Provider
        {...getAuth0Config()}
        onRedirectCallback={onRedirectCallback}
      >
        <AuthInterceptorSetup />
        {children}
      </Auth0Provider>
    );
};