import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import HijosModal from '../HijosModal';
import { DatosHijos } from '../../interfaces/interfaces';

interface FormularioHijosProps {
  cantidadHijos: number;
  hijos: DatosHijos[];
  onCantidadChange: (nuevaCantidad: number) => void;
  onHijosChange: (hijos: DatosHijos[]) => void;
}

const FormularioHijos: React.FC<FormularioHijosProps> = ({
  cantidadHijos,
  hijos,
  onCantidadChange,
  onHijosChange
}) => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleCambioCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(50, Math.max(0, Number(e.target.value)));
    
    if (!isNaN(value)) {
      onCantidadChange(value);

      if (value === 0 || value < hijos.length) {
        onHijosChange(value > 0 ? hijos.slice(0, value) : []);
      }
    }
  };

  return (
    <div>
      <TextField
        label="Cantidad de Hijos"
        value={cantidadHijos}
        onChange={handleCambioCantidad}
        type="number"
        fullWidth
        margin="normal"
        slotProps={{htmlInput:{min:0,max:50,step:1}}}
      />

      {cantidadHijos > 0 && (
        <>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setModalAbierto(true)}
            sx={{ 
              mt: 1, 
              mb: 2,
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Cargar datos de hijos ({cantidadHijos})
          </Button>

          <HijosModal
            openModal={modalAbierto}
            setOpenModal={setModalAbierto}
            cantidadHijos={cantidadHijos}
            handleHijosSave={onHijosChange}
            hijos={hijos}
          />
        </>
      )}
    </div>
  );
};

export default React.memo(FormularioHijos);