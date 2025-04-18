import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import { PersonaResumen } from "../../interfaces/interfaces";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getAuth0Config } from "../../utils/getConfig";
const PersonasResumen = () => {
  const [personas, setPersonas] = useState<PersonaResumen[] | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const config = getAuth0Config();
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: config.authorizationParams.audience
          },
          cacheMode: 'on',
        }).catch((error)=>{
          if (error.error === 'login_required') {
            loginWithRedirect({
              authorizationParams: {
                audience: config.authorizationParams.audience,
                prompt: 'login'
              }
            });
          }
          throw error;
        });
        const res = await fetch("/api/personas/resumen", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPersonas(data);
      } catch (err) {
        console.error("Error fetching personas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonas();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: 2 }}>
      {/* Botón de volver arriba */}
      <Button 
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        Volver al inicio
      </Button>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 2, justifyContent: 'center' }}>
      {personas != null && personas!.map((p, i) => (
        <Card
          key={i}
          sx={{
            minWidth: 280,
            maxWidth: 350,
            flex: "1 1 auto",
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              {p.nombreCompleto}
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center" gap={1}>
              <PhoneIcon fontSize="small" />
              {p.telefonoPrincipal || "Sin teléfono"}
            </Typography>
            <Typography sx={{ wordBreak: 'break-word', overflowWrap: 'break-word' }} variant="body1" display="flex" alignItems="center" gap={1}>
              <EmailIcon fontSize="small" />
              {p.mailPrincipal || "Sin email"}
            </Typography>
            <Typography variant="body1" display="flex" alignItems="center" gap={1}>
              <LocationOnIcon fontSize="small" />
              {p.gpsNombre || "Sin GPS"}
            </Typography>
            {p.hijos?.length > 0 && (
              <Box mt={1}>
                <Typography variant="subtitle2">Hijos:</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {p.hijos.map((h, idx) => (
                    <Chip key={idx} label={h} size="small" />
                  ))}
                </Stack>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
    </Box>
  );
};

export default PersonasResumen;

