import React, { useCallback, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField } from '@mui/material';
import { DatosHijos, HijosModalProps } from '../interfaces/interfaces';

const HijosModal: React.FC<HijosModalProps> = React.memo(({ 
  openModal, 
  setOpenModal, 
  cantidadHijos, 
  hijos: hijosIniciales,
  handleHijosSave 
}) => {
  const [hijosTemp, setHijosTemp] = useState<DatosHijos[]>(hijosIniciales);
  
  const handleFieldChange = useCallback((index: number, field: string) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHijosTemp(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: e.target.value };
        return updated;
      });
    }, []);

  const handleClose = useCallback(() => setOpenModal(false), [setOpenModal]);
  
  const handleSave = useCallback(() => {
    handleHijosSave(hijosTemp);
    setOpenModal(false);
  }, [hijosTemp, handleHijosSave, setOpenModal]);

  const renderHijosFields = useCallback(() => {
    return Array.from({ length: cantidadHijos }).map((_, i) => (
      <Box key={i} sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          label={`Nombre ${i + 1}`}
          value={hijosTemp[i]?.nombre || ''}
          onChange={handleFieldChange(i, 'nombre')}
          fullWidth
        />
        <TextField
          label={`Edad ${i + 1}`}
          value={hijosTemp[i]?.edad || ''}
          onChange={handleFieldChange(i, 'edad')}
          fullWidth
          type="number"
          slotProps={{htmlInput:{ min: 0, max: 200 }}}
        />
      </Box>
    ));
  }, [cantidadHijos, hijosTemp, handleFieldChange]);

  return (
    <Dialog
    open={openModal}
    onClose={handleClose}
    slotProps={{transition:{
      onEnter: () => setHijosTemp(hijosIniciales)
    }}}
  >
      <DialogTitle>Datos de los hijos</DialogTitle>
      <DialogContent>{renderHijosFields()}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default HijosModal;