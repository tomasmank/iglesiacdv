import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Divider, Typography } from '@mui/material';
import { FormData, SetFormData } from '../../interfaces/interfaces';
import { DatePicker } from '@mui/x-date-pickers';
import { useFormularioPersonal } from '../../hooks/useFormularioPersonal';
import FormularioHijos from './FormularioHijos';

interface FormularioPersonalProps {
  formData: FormData;
  setFormData: SetFormData;
}

const FormularioPersonal: React.FC<FormularioPersonalProps> = ({ formData, setFormData }) => {
    const {
      handleChange,
      handleBlur,
      validations: { isEmailValid, showConyugeError }
    } = useFormularioPersonal(formData, setFormData);
  return (
    <>
      {/* Sección Datos Personales */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Datos Personales</Typography>
      
      <TextField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      
      <TextField
        label="Apellido"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <FormControl fullWidth margin="normal" required>
        <DatePicker
          label="Fecha de Nacimiento"
          value={formData.fechaNacimiento}
          onChange={(newValue) => setFormData(prev => ({ ...prev, fechaNacimiento: newValue }))}
          disableFuture
        />
      </FormControl>

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Nacionalidad</InputLabel>
        <Select
          name="nacionalidad"
          value={formData.nacionalidad}
          onChange={handleChange}
          label="Nacionalidad"
          sx={{ textAlign: 'left' }}
        >
          {['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 
            'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 
            'Paraguay', 'Perú', 'Uruguay', 'Venezuela', 'Otra']
            .map(pais => (
              <MenuItem key={pais} value={pais}>{pais}</MenuItem>
            ))}
        </Select>
      </FormControl>
      
      {formData.nacionalidad === 'Otra' && (
        <TextField
          name="otraNacionalidad"
          label="Especifica tu nacionalidad"
          value={formData.otraNacionalidad}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
      )}

      <Divider sx={{ my: 3 }} />

      {/* Sección Contacto */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Información de Contacto</Typography>
      
      <TextField
        label="Dirección"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
    
      <TextField
        label="Teléfono"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        type="tel"
      />
    
      <TextField
        label="Email"
        name="mail"
        value={formData.mail}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        type="email"
        error={!!formData.mail && !isEmailValid}
        helperText={!!formData.mail && !isEmailValid ? "Ingrese un email válido" : ""}
      />

      <Divider sx={{ my: 3 }} />

      {/* Sección Estado Familiar */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Estado Familiar</Typography>
      
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Estado Civil</InputLabel>
        <Select
          name="estadoCivil"
          value={formData.estadoCivil}
          onChange={handleChange}
          label="Estado Civil"
          sx={{ textAlign: 'left' }}
        >
          {['Soltero', 'Casado', 'Divorciado', 'Viudo']
            .map(estado => (
              <MenuItem key={estado} value={estado}>{estado}/a</MenuItem>
            ))}
        </Select>
      </FormControl>

      {formData.estadoCivil === 'Casado' && (
        <TextField
        label="Nombre completo del Cónyuge"
        name="nombreConyuge"
        value={formData.nombreConyuge}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={showConyugeError}
        helperText={showConyugeError ? "Este campo es requerido para casados" : ""}
        onBlur={() => handleBlur("nombreConyuge")}
        />
      )}
      <FormularioHijos
        cantidadHijos={formData.cantidadHijos}
        hijos={formData.hijos}
        onCantidadChange={(nuevaCantidad) => 
          setFormData(prev => ({ ...prev, cantidadHijos: nuevaCantidad }))
        }
        onHijosChange={(nuevosHijos) => 
          setFormData(prev => ({ ...prev, hijos: nuevosHijos }))
        }
      />
    </>
  );
};

export default FormularioPersonal;