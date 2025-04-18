import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Divider, Typography } from '@mui/material';
import { useFormContext } from '../../hooks/FormContext';

const NIVELES_ESTUDIO = [
  'Secundario incompleto',
  'Secundario completo',
  'Terciario incompleto',
  'Terciario completo',
  'Universitario incompleto', 
  'Universitario completo'
] as const;

interface FormularioProfesionalProps {
}

const FormularioProfesional: React.FC<FormularioProfesionalProps> = ({ 
}) => {
    const {
      handleChange,
      formData
      } = useFormContext();

  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Información Profesional
      </Typography>
      
      <TextField
        label="Profesión o Trabajo"
        name="profesion"
        value={formData.profesion}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Estudios (Mayor grado alcanzado)</InputLabel>
        <Select
          name="estudios"
          value={formData.estudios}
          onChange={handleChange}
          label="Estudios (Mayor grado alcanzado)"
          sx={{ textAlign: 'left' }}
        >
          {NIVELES_ESTUDIO.map(nivel => (
            <MenuItem key={nivel} value={nivel}>
              {nivel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default React.memo(FormularioProfesional) as typeof FormularioProfesional;