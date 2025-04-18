import React, { JSX } from 'react';
import { Container, Box, Typography, createTheme, ThemeProvider, CssBaseline, IconButton, useColorScheme, CircularProgress } from '@mui/material';
import Formulario from './components/Form';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { FormProvider } from './hooks/FormContext';
import PersonasResumen from './components/Resumen/PersonasResumen';
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { AppState, Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { AuthProvider } from './components/Auth/AuthProvider';
import { AssetProvider, useAssets } from './hooks/AssetsContext';
import LandingPage from './components/Landing';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const App: React.FC = () => {

  return (

    
    <ThemeProvider theme={theme}>
      <AssetProvider><>
      <CssBaseline />
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
                <Route path="/formulario" element={<><FormProvider>
                  <Formulario>
                  </Formulario>
                </FormProvider></>} />
          
          <Route path="/personas" element={
                <ProtectedRoute><PersonasResumen /></ProtectedRoute>
              } />
              <Route path="/" element={<LandingPage />} />
          </Route>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
      </>
      </AssetProvider>
    </ThemeProvider>

  );
}

const Layout: React.FC = () => {
  const {toggleDarkMode, isDarkMode, background} = useAssets();

  return (
    <>
      <IconButton
        onClick={toggleDarkMode}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
          borderRadius: '50%',
        }}
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <BackgroundImage image={background} />   
        <Outlet />
      </Box>
    </>
  );
}

const BackgroundImage: React.FC<{ image: string }> = ({ image }) => (
  <Box sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${image})`,
    backgroundSize: '80%',
    backgroundPosition: 'center',
    opacity: 0.1,
    backgroundAttachment: 'fixed',
    zIndex: -1,
  }} />
);



export default App;