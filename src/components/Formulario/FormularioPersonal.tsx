import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Divider, Typography, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import FormularioHijos from './FormularioHijos';
import { useFormContext } from '../../hooks/FormContext';
import { useSelectores } from '../../utils/useSelectores';
import { SelectoresResponse } from '../../interfaces/interfaces';

interface FormularioPersonalProps {}
const FormularioPersonal: React.FC<FormularioPersonalProps> = () => {
  const {
    handleChange,
    handleBlur,
    handleDateChange,
    errors,
    fieldInteractions,
    formData,
    setFormData,
    validateField,
    nacionalidad,
    estadoCivil,
    error,
    loading,
  } = useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Datos Personales</Typography>
      
      <TextField
        label="Nombre"
        name="nombre123"
        value={formData.nombre}
        onChange={handleChange}
        onBlur={() => handleBlur('nombre')}
        error={!!errors.nombre && fieldInteractions.nombre}
        helperText={fieldInteractions.nombre && errors.nombre}
        fullWidth
        margin="normal"
        required
        slotProps={{htmlInput:{required:false,'aria-required': 'true' }}}
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
        slotProps={{htmlInput:{required:false,'aria-required': 'true' }}}
      />

<FormControl 
  fullWidth 
  margin="normal"
  error={!!errors.fechaNacimiento && fieldInteractions.fechaNacimiento}
>
  <DatePicker
    label="Fecha de Nacimiento *"
    value={formData.fechaNacimiento}
    onChange={(newValue) => handleDateChange(newValue, 'fechaNacimiento')}
    onClose={() => {
      validateField('fechaNacimiento', formData.fechaNacimiento);
    }}
    disableFuture
    slotProps={{
      textField: {
        onBlur:() => handleBlur('fechaNacimiento'),
        required: false,
        'aria-required': 'true',
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
      required: false, 
      'aria-required': 'true' 
    }}
  >
    {!loading && !error && nacionalidad!
      .map(pais => (
        <MenuItem key={pais.key} value={pais.key}>{pais.value}</MenuItem>
      ))}
    {!loading && error && <MenuItem key={error} value="ERROR">Ocurrio un error cargando las opciones.</MenuItem> }
    {loading && <MenuItem key="Cargando" value="Cargando">Cargando...</MenuItem>}
  </Select>
  {fieldInteractions.nacionalidad && errors.nacionalidad && (
    <FormHelperText error>
      {errors.nacionalidad}
    </FormHelperText>
  )}
</FormControl>
      
      {formData.nacionalidad == nacionalidad?.find(x => x.value == "Otra")?.key && (
        <TextField
        name="otraNacionalidad"
        label="Especifica tu nacionalidad"
        value={formData.otraNacionalidad}
        onChange={handleChange}
        onBlur={() => handleBlur('otraNacionalidad')}
        error={!!errors.otraNacionalidad && fieldInteractions.otraNacionalidad}
        helperText={fieldInteractions.otraNacionalidad && errors.otraNacionalidad}
        fullWidth
        required
        margin="normal"
        slotProps={{htmlInput:{required:false,'aria-required': 'true' }}}
        sx={{
          display: formData.nacionalidad == nacionalidad?.find(x => x.value == "Otra")?.key ? 'block' : 'none'
        }}
      />
      )}

      <Divider sx={{ my: 3 }} />

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
  slotProps={{htmlInput:{required:false,'aria-required': 'true' }}}
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
  slotProps={{htmlInput:{required:false,'aria-required': 'true' }}}
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
  slotProps={{htmlInput:{required:false,'aria-required': 'true' }}}
/>


      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Estado Familiar</Typography>
      
      <FormControl error={!!errors.estadoCivil && fieldInteractions.estadoCivil} fullWidth margin="normal" required>
        <InputLabel>Estado Civil</InputLabel>
        <Select
          name="estadoCivil"
          value={formData.estadoCivil}
          onChange={handleChange}
          label="Estado Civil"
          sx={{ textAlign: 'left' }}
          inputProps={{
            onBlur:()=>handleBlur('estadocivil'),
            required: false, 
            'aria-required': 'true' 
          }}
        >
          {!loading && !error && estadoCivil!
      .map(estadoCivil => (
        <MenuItem key={estadoCivil.key} value={estadoCivil.key}>{estadoCivil.value}</MenuItem>
      ))}
    {!loading && error && <MenuItem key={error} value={error}>Ocurrio un error cargando las opciones.</MenuItem> }
    {loading && <MenuItem key="Cargando" value="Cargando">Cargando...</MenuItem>}
        </Select>
        {fieldInteractions.estadoCivil && errors.estadoCivil && (
    <FormHelperText error>
      {errors.estadoCivil}
    </FormHelperText>
  )}
      </FormControl>

      {formData.estadoCivil === estadoCivil?.find(x=> x.value == 'Casado')?.key && (
        <TextField
          label="Nombre completo del Cónyuge"
          name="nombreConyuge"
          value={formData.nombreConyuge}
          onChange={handleChange}
          onBlur={() => handleBlur('nombreConyuge')}
          error={!!errors.nombreConyuge && fieldInteractions.nombreConyuge}
          helperText={fieldInteractions.nombreConyuge && errors.nombreConyuge}
          fullWidth
          margin="normal"
          required
          sx={{
            display: formData.estadoCivil === estadoCivil?.find(x=> x.value == 'Casado')?.key ? 'block' : 'none'
          }}
          slotProps={{htmlInput:{required:false,'aria-required': 'true' }}}
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