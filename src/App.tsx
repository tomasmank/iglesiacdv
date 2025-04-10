import React from 'react';
import { Container, Box, Typography, createTheme, ThemeProvider, CssBaseline, IconButton, useColorScheme } from '@mui/material';
import Formulario from './components/Form';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Assets
import logo from './assets/logo.png';
import logodark from './assets/logodark.png';
import { FormProvider } from './hooks/FormContext';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

const Layout: React.FC = () => {
  const { mode, setMode } = useColorScheme();
  const isDarkMode = mode === 'dark';

  if (!mode) return null;

  const toggleDarkMode = () => setMode(isDarkMode ? 'light' : 'dark');
  const assets = {
    logo: isDarkMode ? logodark : logo,
    background: `${process.env.PUBLIC_URL}/background${isDarkMode ? 'dark' : ''}.png`
  };

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
        <BackgroundImage image={assets.background} />
        
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Header logo={assets.logo} isDarkMode={isDarkMode} />
          <FormProvider><Formulario /></FormProvider>
          
        </Container>
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

const Header: React.FC<{ logo: string; isDarkMode: boolean }> = ({ logo, isDarkMode }) => (
  <Box sx={{ textAlign: 'center', p: 2.5, borderRadius: 1 }}>
    <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto', marginBottom: '20px' }} />
    
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 1.25 }} color="text.primary">
      ¡Bendiciones, querido hermano/a!
    </Typography>

    <Typography variant="body1" gutterBottom sx={{ mb: 1.25 }} color="text.primary">
    Estamos buscando digitalizar nuestros datos, esto nos permitirá conocernos más
    y estar más cerca de vos.
    </Typography>

    <Typography variant="body1" sx={{ mb: 2.5, fontStyle: 'italic' }} color="text.primary">
    Te agradecemos si te podés tomar unos minutos para completar este formulario.
    Si tenés dudas, comunicate con nosotros al 221 619-9150.
    </Typography>
  </Box>
);

export default App;