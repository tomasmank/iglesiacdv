import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Divider, Typography, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import FormularioHijos from './FormularioHijos';
import { useFormData } from '../../hooks/useFormData';
import { useFormContext } from '../../hooks/FormContext';

interface FormularioPersonalProps {}

const FormularioPersonal: React.FC<FormularioPersonalProps> = () => {
  const {
    handleChange,
    handleBlur,
    handleDateChange, // Asegúrate de incluir esto
    errors,
    fieldInteractions,
    formData,
    setFormData,
    validateField
  } = useFormContext();

  return (
    <>
      {/* Sección Datos Personales */}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Datos Personales</Typography>
      
      <TextField
        label="Nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        onBlur={() => handleBlur('nombre')}
        error={!!errors.nombre && fieldInteractions.nombre}
        helperText={fieldInteractions.nombre && errors.nombre}
        fullWidth
        margin="normal"
        required
        inputProps={{
          required: false,  // Desactiva la validación HTML5
          'aria-required': 'true'  // Mantiene accesibilidad
        }}
      />
      
      <TextField
        label="Apellido"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        onBlur={() => handleBlur('apellido')}
        error={!!errors.apellido && fieldInteractions.apellido}
        helperText={fieldInteractions.apellido && errors.apellido}
        fullWidth
        margin="normal"
        required
        inputProps={{
          required: false,  // Desactiva la validación HTML5
          'aria-required': 'true'  // Mantiene accesibilidad
        }}
      />

<FormControl 
  fullWidth 
  margin="normal"
  error={!!errors.fechaNacimiento && fieldInteractions.fechaNacimiento}
>
  <DatePicker
    label="Fecha de Nacimiento *" // Agregamos el asterisco manualmente
    value={formData.fechaNacimiento}
    onChange={(newValue) => handleDateChange(newValue, 'fechaNacimiento')}
    onClose={() => {
      validateField('fechaNacimiento', formData.fechaNacimiento);
    }}
    disableFuture
    slotProps={{
      textField: {
        onBlur:() => handleBlur('fechaNacimiento'),
        required: false, // Desactivamos validación HTML5
        'aria-required': 'true', // Mantenemos accesibilidad
        error: !!errors.fechaNacimiento && fieldInteractions.fechaNacimiento,
        helperText: fieldInteractions.fechaNacimiento && errors.fechaNacimiento,
      },
    }}
  />
</FormControl>
<FormControl 
  fullWidth 
  margin="normal" 
  required
  error={!!errors.nacionalidad && fieldInteractions.nacionalidad}
>
  <InputLabel>Nacionalidad</InputLabel>
  <Select
    name="nacionalidad"
    value={formData.nacionalidad}
    onChange={handleChange}
    label="Nacionalidad"
    sx={{ textAlign: 'left' }}
    inputProps={{
      onBlur:()=>handleBlur('nacionalidad'),
      required: false, // Desactiva validación HTML nativa
      'aria-required': 'true' // Mantiene accesibilidad
    }}
  >
    {['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 
      'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador',
      'Paraguay', 'Perú', 'Uruguay', 'Venezuela', 'Otra']
      .map(pais => (
        <MenuItem key={pais} value={pais}>{pais}</MenuItem>
      ))}
  </Select>
  {fieldInteractions.nacionalidad && errors.nacionalidad && (
    <FormHelperText error>
      {errors.nacionalidad}
    </FormHelperText>
  )}
</FormControl>
      
      {formData.nacionalidad === 'Otra' && (
        <TextField
        name="otraNacionalidad"
        label="Especifica tu nacionalidad"  // Asterisco manual para required
        value={formData.otraNacionalidad}
        onChange={handleChange}
        onBlur={() => handleBlur('otraNacionalidad')}
        error={!!errors.otraNacionalidad && fieldInteractions.otraNacionalidad}
        helperText={fieldInteractions.otraNacionalidad && errors.otraNacionalidad}
        fullWidth
        required
        margin="normal"
        inputProps={{
          required: false,  // Desactiva validación HTML nativa
          'aria-required': 'true'  // Mantiene accesibilidad
        }}
        sx={{
          display: formData.nacionalidad === 'Otra' ? 'block' : 'none'  // Solo muestra si nacionalidad es "Otra"
        }}
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
  onBlur={() => handleBlur('direccion')}
  error={!!errors.direccion && fieldInteractions.direccion}
  helperText={fieldInteractions.direccion && errors.direccion}
  fullWidth
  margin="normal"
  required
  inputProps={{
    required: false, // Desactiva la validación HTML5
    'aria-required': 'true' // Mantiene accesibilidad
  }}
/>

    
<TextField
  label="Teléfono"
  name="telefono"
  value={formData.telefono}
  onChange={handleChange}
  onBlur={() => handleBlur('telefono')}
  error={!!errors.telefono && fieldInteractions.telefono}
  helperText={fieldInteractions.telefono && errors.telefono}
  fullWidth
  margin="normal"
  required
  type="tel"
  inputProps={{
    required: false, // Desactiva la validación HTML5
    'aria-required': 'true' // Mantiene accesibilidad
  }}
/>
    
<TextField
  label="Email"
  name="mail"
  value={formData.mail}
  onChange={handleChange}
  onBlur={() => handleBlur('mail')}
  error={!!errors.mail && fieldInteractions.mail}
  helperText={fieldInteractions.mail && errors.mail}
  fullWidth
  margin="normal"
  required
  type="email"
  inputProps={{
    required: false, // Desactiva validación HTML5
    'aria-required': 'true' // Accesibilidad
  }}
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
          onBlur={() => handleBlur('nombreConyuge')} // Solo usa onBlur
          error={!!errors.nombreConyuge && fieldInteractions.nombreConyuge}
          helperText={fieldInteractions.nombreConyuge && errors.nombreConyuge}
          fullWidth
          margin="normal"
          required
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