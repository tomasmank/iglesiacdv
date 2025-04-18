import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Modal,
  Paper
} from '@mui/material';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const error = query.get('error');
    const errorDescription = query.get('error_description');

    if (error || errorDescription) {
      setErrorMessage(decodeURIComponent(errorDescription || 'Ocurrió un error.'));
    }
  }, [location]);

  const handleCloseModal = () => {
    setErrorMessage(null);
    // Limpia los query params al cerrar el modal
    navigate(location.pathname, { replace: true });
  };

  const handleNavigation = (path: string) => {
      navigate(path)
  };

  return (
    <Container maxWidth="sm">
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap={4}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sistema de Gestión de Personas
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width="100%">
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => handleNavigation('/personas')}
          >
            Ver Personas
          </Button>

          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={() => handleNavigation('/formulario')}
          >
            Cargar Persona
          </Button>
        </Stack>
      </Box>

      {/* Modal de error */}
      <Modal open={!!errorMessage} onClose={handleCloseModal}>
        <Box
          component={Paper}
          sx={{
            p: 4,
            maxWidth: 400,
            mx: 'auto',
            mt: '20vh',
            outline: 'none',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>Error de autenticación</Typography>
          <Typography>{errorMessage}</Typography>
          <Box mt={3}>
            <Button variant="contained" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default LandingPage;
