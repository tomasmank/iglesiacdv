import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

// src/api/authInterceptor.ts
let auth0Methods: { getAccessTokenSilently: (options:GetTokenSilentlyOptions) => Promise<string> } | null = null;

export const setAuth0Methods = (methods: typeof auth0Methods) => {
  auth0Methods = methods;
};

const setupResponseInterceptors = () => {
  const originalFetch = window.fetch;
  
  window.fetch = async (input, init) => {
    // Primera ejecución
    let response = await originalFetch(input, init);
    
    // Si hay error 401
    if (response.status === 401 && auth0Methods) {
      try {
        // Renovar el token usando los métodos de Auth0
        const newToken = await auth0Methods.getAccessTokenSilently({ cacheMode: 'off' });
        
        // Reintentar la petición con nuevo token
        const newInit = init ? { ...init } : {};
        newInit.headers = {
          ...newInit.headers,
          'Authorization': `Bearer ${newToken}`
        };
        response = await originalFetch(input, newInit);
      } catch (error) {
        // Redirigir a login si no se puede renovar
        window.location.href = '/login';
        throw error;
      }
    }
    
    return response;
  };
};

export default setupResponseInterceptors;