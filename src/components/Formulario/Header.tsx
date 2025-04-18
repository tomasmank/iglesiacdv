import { Box, Typography } from "@mui/material";
import { useAssets } from "../../hooks/AssetsContext";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {

    const assets = useAssets();
    
    return(
    <Box sx={{ textAlign: 'center', p: 2.5, borderRadius: 1 }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
  <img
    src={assets.logo}
    alt="Logo"
    style={{ width: '150px', height: 'auto', marginBottom: '20px', cursor: 'pointer' }}
  />
</Link>
      
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
  }