// HijosModal.tsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from '@mui/material';
import { DatosHijos, HijosModalProps } from '../interfaces/interfaces';

const renderHijosFields = (cantidad: number, handleHijosChange: (index: number, field: string, value: string) => void, hijos: DatosHijos[]) => {
  const fields = [];
  for (let i = 0; i < cantidad; i++) {
    fields.push(
      <Box key={i} sx={{ display: 'flex', gap: 2, marginTop:"10px" }}>
        <TextField
          label={`Nombre ${i + 1}`}
          variant="outlined"
          value={hijos[i]?.nombre || ''}
          onChange={(e) => handleHijosChange(i, 'nombre', e.target.value)}
          fullWidth
        />
        <TextField
          label={`Edad ${i + 1}`}
          variant="outlined"
          value={hijos[i]?.edad || ''}
          onChange={(e) => handleHijosChange(i, 'edad', e.target.value)}
          fullWidth
          type="number"
          slotProps={{
            htmlInput: {
              min: 0, // Prevenir valores negativos
              max: 200, // Prevenir valores superiores a 200
            },
          }}
        />
      </Box>
    );
  }
  return fields;
};

const HijosModal: React.FC<HijosModalProps> = ({ openModal, setOpenModal, cantidadHijos, hijos, handleHijosSave}) => {
  // Mantener un estado temporal para los hijos dentro del modal
  const [hijosTemp, setHijosTemp] = useState<DatosHijos[]>(hijos);

  // Función para manejar cambios en los campos dentro del modal
  const handleHijosChange = (index: number, field: string, value: string) => {
    const updatedHijos = [...hijosTemp];
    updatedHijos[index] = {
      ...updatedHijos[index],
      [field]: value,
    };
    setHijosTemp(updatedHijos);
  };

  // Función para manejar el cierre sin guardar (Cancelar)
  const handleCloseModal = (hijos: DatosHijos[]) => {
    setHijosTemp(hijos);
    setOpenModal(false); // Cerrar el modal sin hacer cambios
  };

  // Función para guardar los cambios
  const handleSave = () => {
    handleHijosSave(hijosTemp); // Guardamos los cambios y actualizamos el estado principal
    setOpenModal(false); // Cerrar el modal después de guardar
  };

  return (
    <Dialog open={openModal} onClose={()=>handleCloseModal(hijos)}>
      <DialogTitle>Datos de los hijos</DialogTitle>
      <DialogContent>
        {renderHijosFields(cantidadHijos, handleHijosChange, hijosTemp)} {/* Usamos hijosTemp aquí */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseModal(hijos)} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HijosModal;
