import { createContext, JSX, useContext } from 'react';
import { useColorScheme } from '@mui/material';
import logo from '../assets/logo.png';
import logodark from '../assets/logodark.png';
interface AssetContext{
    logo: string,
    background: string,
    toggleDarkMode: ()=>void,
    isDarkMode: boolean
}
// Crear el contexto
const AssetsContext = createContext<AssetContext | undefined>(undefined);

// Proveedor del contexto
export function AssetProvider({ children }: {children:JSX.Element}) {
    const { mode, setMode } = useColorScheme();
  const isDarkMode = mode === 'dark';

  if (!mode) return null;

  const toggleDarkMode = () => setMode(isDarkMode ? 'light' : 'dark');
  const assets = {
    logo: isDarkMode ? logodark : logo,
    background: `${process.env.PUBLIC_URL}/background${isDarkMode ? 'dark' : ''}.png`,
    toggleDarkMode: toggleDarkMode,
    isDarkMode: isDarkMode
  };

  return (
    <AssetsContext.Provider value={assets}>
      {children}
    </AssetsContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAssets() {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error('useAssets debe usarse dentro de un AssetProvider');
  }
  return context;
}