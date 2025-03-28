// src/App.tsx
import React from 'react';
import { Container, Box, Typography, createTheme, ThemeProvider, CssBaseline, IconButton, useColorScheme } from '@mui/material';
import Formulario from './components/Form';
import logo from './assets/logo.png'; // Ruta del logo
import logodark from './assets/logodark.png'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});
const App : React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <MyApp />
    </ThemeProvider>
  );
}


const MyApp: React.FC = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode){
    return null;
  }

  const toggleDarkMode = () => {
    setMode(isDarkMode() ? 'light' : 'dark');
  };

  const isDarkMode = () : boolean => {
    return mode === 'dark';
  }

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
          {isDarkMode() ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    <Box
      sx={{
        minHeight: '100vh', // Asegura que el fondo cubra toda la altura del contenido
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        flexDirection: 'column',
        overflow: 'hidden', // Evita el desbordamiento innecesario
      }}
    >
      {/* Fondo con PNG y opacidad, y background-attachment: fixed */}
      <Box
        sx={{
          position: 'absolute',
          top: '0', // Mantener el fondo siempre visible en la parte superior
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${process.env.PUBLIC_URL}/background${isDarkMode() ? 'dark' : ''}.png)`,
          backgroundSize: '80%', // Asegura que el fondo cubra toda la pantalla
          backgroundPosition: 'center', // Centra la imagen
          opacity: 0.1, // Aplica opacidad solo al fondo PNG
          backgroundAttachment: 'fixed', // Fondo fijo
          zIndex: -1, // Asegura que el fondo esté detrás del contenido
        }}
      />

      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', padding: '20px', borderRadius: '8px' }}>
          {/* Logo superior */}
          <img 
            src={isDarkMode()  ? logodark : logo} 
            alt="Logo" 
            style={{ width: '150px', height: 'auto', marginBottom: '20px' }} 
          />
          
          {/* Título principal "Bendiciones querido hermano/a" */}
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ fontWeight: 'bold', marginBottom: '10px' }}
          >
            Bendiciones, querido hermano/a!
          </Typography>

          {/* Texto intermedio */}
          <Typography 
            variant="body1" 
            gutterBottom 
            sx={{ marginBottom: '10px', fontWeight: 'normal' }}
          >
            Estamos buscando digitalizar nuestros datos, esto nos permitirá conocernos más
            y estar más cerca de vos.
          </Typography>

          {/* Texto más pequeño */}
          <Typography 
            variant="body1" 
            sx={{ marginBottom: '20px', fontStyle: 'italic' }}
          >
            Te agradecemos si te podés tomar unos minutos para completar este formulario,
            si tenés dudas comunicate con nosotros al 221 619-9150.
          </Typography>
          
          {/* Componente Formulario */}
          <Formulario/>
        </Box>
      </Container>
    </Box>
    </>
  );
}

export default App;
