import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, FormControlLabel, SelectChangeEvent, Switch, Radio, RadioGroup} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useFormData } from '../hooks/useFormData';
import HijosModal from './HijosModal';
import { handleSubmit,handleFormChange,handleHijosChange } from '../handlers/formHandlers';



const Formulario: React.FC = () => {
  const handleAnotherPersonResponse = (response: boolean) => {
    if (response) {
      // Si se elige cargar otra persona
      if (formData.cantidadHijos > 0) {
        setShowAnotherForm(true); // Mostrar la opción de mantener o no mantener hijos
      } else {
        resetForm(); // Si no tiene hijos, simplemente resetear el formulario
      }
    }
  };
  const resetForm = (mantenerHjos?: boolean) => {
    setFormData({
      nombre: '',
      apellido: '',
      fechaNacimiento: null,
      nacionalidad: '',
      direccion: '',
      telefono: '',
      mail: '',
      estadoCivil: '',
      nombreConyuge: '',
      cantidadHijos: mantenerHjos ? formData.cantidadHijos : 0,
      profesion: '',
      estudios: '',
      añoConocimientoCristo: '',
      teBautizaste: false,
      congregacionBautismo: '',
      añoBautismo: '',
      añoInicioIglesia: '',
      tieneGPS: false,
      gpsOption: '',
      seSienteAcompañado: false,
      comprometido: false,
      sirvioMinisterio: '',
      leGustariaSumarseMinisterio: '',
      sirviendoMinisterio: '',
      hijos: mantenerHjos ? formData.hijos : [],
    });
    setFormSubmitted(false); // Vuelve al estado inicial
    setShowAnotherForm(false); // No mostrar la pregunta
  };
  const [formData, setFormData] = useFormData();
  const [openModal, setOpenModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showAnotherForm, setShowAnotherForm] = useState(false);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {!formSubmitted ? ( <form onSubmit={(e)=> handleSubmit(e,setFormData,setFormSubmitted)}>
        <TextField label="Nombre" variant="outlined" fullWidth margin="normal" name="nombre" value={formData.nombre} onChange={(e)=> handleFormChange(e,setFormData)} />
        <TextField label="Apellido" variant="outlined" fullWidth margin="normal" name="apellido" value={formData.apellido} onChange={(e)=> handleFormChange(e,setFormData)} />
        <FormControl fullWidth margin="normal">
        <DatePicker
          label="Fecha de Nacimiento"
          value={formData.fechaNacimiento}
          onChange={(newValue) => setFormData((prevData) => ({ ...prevData, fechaNacimiento: newValue }))}
          disableFuture
        />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Nacionalidad</InputLabel>
          <Select name="nacionalidad" value={formData.nacionalidad} onChange={(e)=> handleFormChange(e,setFormData)} label="Nacionalidad">
            <MenuItem value="Argentina">Argentina</MenuItem>
            <MenuItem value="Brasil">Brasil</MenuItem>
            <MenuItem value="Chile">Chile</MenuItem>
            <MenuItem value="Uruguay">Uruguay</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Dirección" variant="outlined" fullWidth margin="normal" name="direccion" value={formData.direccion} onChange={(e)=> handleFormChange(e,setFormData)} />
        <TextField label="Teléfono" variant="outlined" fullWidth margin="normal" name="telefono" value={formData.telefono} onChange={(e)=> handleFormChange(e,setFormData)} />
        <TextField label="Email" variant="outlined" fullWidth margin="normal" name="mail" value={formData.mail} onChange={(e)=> handleFormChange(e,setFormData)} />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Estado Civil</InputLabel>
          <Select name="estadoCivil" value={formData.estadoCivil} onChange={(e)=> handleFormChange(e,setFormData)} label="Estado Civil">
            <MenuItem value="Soltero">Soltero</MenuItem>
            <MenuItem value="Casado">Casado</MenuItem>
            <MenuItem value="Divorciado">Divorciado</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Nombre del Cónyuge" variant="outlined" fullWidth margin="normal" name="nombreConyuge" value={formData.nombreConyuge} onChange={(e)=> handleFormChange(e,setFormData)} />
        <TextField
  label="Cantidad de Hijos"
  variant="outlined"
  fullWidth
  margin="normal"
  name="cantidadHijos"
  value={formData.cantidadHijos}
  onChange={(e) => {
    const value = Number(e.target.value); // Convierte el valor a número
    // Validación para asegurarse de que el número esté entre 0 y 50
    if (!isNaN(value) && value >= 0 && value <= 50) {
      handleFormChange(e,setFormData);  // Solo actualiza el estado si el valor es válido
    }
  }}
  type="number"
  slotProps={{ htmlInput:{min: 0, max: 50 }}}
/>

{formData.cantidadHijos > 0 && (
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          Presione Aqui para cargar nombre y edad de sus hijos
        </Button>
      )}

      <HijosModal openModal={openModal} setOpenModal={setOpenModal} cantidadHijos={formData.cantidadHijos} handleHijosSave={()=> handleHijosChange(setFormData,formData.hijos)} hijos={formData.hijos}/>

        <TextField label="Profesión" variant="outlined" fullWidth margin="normal" name="profesion" value={formData.profesion} onChange={(e)=> handleFormChange(e,setFormData)} />
        <TextField label="Estudios" variant="outlined" fullWidth margin="normal" name="estudios" value={formData.estudios} onChange={(e)=> handleFormChange(e,setFormData)} />

        <FormControl fullWidth margin="normal">
  <TextField
    name="añoConocimientoCristo"
    value={formData.añoConocimientoCristo}
    onChange={(e)=> handleFormChange(e,setFormData)}
    type="number"
    inputProps={{ min: 1900, max: new Date().getFullYear() }}
    fullWidth
    variant="outlined"
    label="Año de Conocimiento de Cristo"
  />
</FormControl>
        
        <InputLabel>¿Te bautizaste?</InputLabel>
        <FormControl fullWidth margin="normal">
  {formData.teBautizaste !== null && (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span>No</span>
      <Switch
        name="teBautizaste"
        checked={formData.teBautizaste}
        onChange={(e) => {
          const newValue = e.target.checked;
          setFormData({
            ...formData,
            teBautizaste: newValue,
            // Si cambia a No, limpiamos los campos relacionados
            congregacionBautismo: newValue ? formData.congregacionBautismo : '',
            añoBautismo: newValue ? formData.añoBautismo : '',
          });
        }}
        color="primary"
      />
      <span>Sí</span>
    </div>
  )}
</FormControl>


  {formData.teBautizaste && (
    <FormControl fullWidth margin="normal">
    <TextField
      name="congregacionBautismo"
      value={formData.congregacionBautismo}
      onChange={(e)=> handleFormChange(e,setFormData)}
      fullWidth
      variant="outlined"
      label="Congregación del Bautismo"
      disabled={!formData.teBautizaste}
    />
    </FormControl>
  )}


  {formData.teBautizaste && (
            <FormControl fullWidth margin="normal">
    <TextField
      name="añoBautismo"
      value={formData.añoBautismo}
      onChange={(e)=> handleFormChange(e,setFormData)}
      type="number"
      inputProps={{ min: 1900, max: new Date().getFullYear() }}
      fullWidth
      variant="outlined"
      label="Año del Bautismo"
      disabled={!formData.teBautizaste}
    />
    </FormControl>
  )}

        <TextField inputProps={{ min: 1900, max: new Date().getFullYear() }} type="number" label="Año en que empezaste a venir a nuestra iglesia" variant="outlined" fullWidth margin="normal" name="añoInicioIglesia" value={formData.añoInicioIglesia} onChange={(e)=> handleFormChange(e,setFormData)} />

        <InputLabel>¿Tienes un GPS?</InputLabel>
<FormControl fullWidth margin="normal">
  {formData.tieneGPS !== null && (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span>No</span>
      <Switch
        name="tieneGPS"
        checked={formData.tieneGPS}
        onChange={(e) => {
          const newValue = e.target.checked;
          setFormData({
            ...formData,
            tieneGPS: newValue,
            // Limpiar gpsOption cuando tieneGPS se cambie a 'No'
            gpsOption: newValue ? formData.gpsOption : '', 
          });
        }}
        color="primary"
      />
      <span>Sí</span>
    </div>
  )}
</FormControl>
        {formData.tieneGPS && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Opciones de GPS</InputLabel>
            <Select name="gpsOption" value={formData.gpsOption} onChange={(e)=> handleFormChange(e,setFormData)} label="Opciones de GPS">
              <MenuItem value="Opción 1">Opción 1</MenuItem>
              <MenuItem value="Opción 2">Opción 2</MenuItem>
              <MenuItem value="Opción 3">Opción 3</MenuItem>
            </Select>
          </FormControl>
        )}
  <InputLabel>¿Te sientes acompañado?</InputLabel>
<FormControl fullWidth margin="normal">

  <RadioGroup
    name="seSienteAcompañado"
    value={formData.seSienteAcompañado}
    onChange={(e)=> handleFormChange(e,setFormData)}
    row
    sx={{ display: 'flex', justifyContent: 'center' }}
  >
    <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
    <FormControlLabel value="No" control={<Radio />} label="No" />
    <FormControlLabel value="No lo sé" control={<Radio />} label="No lo sé" />
  </RadioGroup>
</FormControl>

<InputLabel>¿Estás comprometido para con otros miembros?</InputLabel>
<FormControl fullWidth margin="normal">
  <RadioGroup
    name="comprometido"
    value={formData.comprometido}
    onChange={(e)=> handleFormChange(e,setFormData)}
    row
    sx={{ display: 'flex', justifyContent: 'center' }}
  >
    <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
    <FormControlLabel value="No" control={<Radio />} label="No" />
    <FormControlLabel value="No lo sé" control={<Radio />} label="No lo sé" />
  </RadioGroup>
</FormControl>

<FormControl fullWidth margin="normal">
  <TextField
    id="sirvioMinisterio"
    name="sirvioMinisterio"
    value={formData.sirvioMinisterio}
    onChange={(e)=> handleFormChange(e,setFormData)}
    fullWidth
    variant="outlined"
    label="¿Serviste en algún ministerio?"
  />
</FormControl>

<FormControl fullWidth margin="normal">
  <TextField
    id="leGustariaSumarseMinisterio"
    name="leGustariaSumarseMinisterio"
    value={formData.leGustariaSumarseMinisterio}
    onChange={(e)=> handleFormChange(e,setFormData)}
    fullWidth
    variant="outlined"
    label="¿Te gustaría sumarte a un ministerio?"
  />
</FormControl>

<FormControl fullWidth margin="normal">
  <TextField
    id="sirviendoMinisterio"
    name="sirviendoMinisterio"
    value={formData.sirviendoMinisterio}
    onChange={(e)=> handleFormChange(e,setFormData)}
    fullWidth
    variant="outlined"
    label="¿Estás sirviendo en algún ministerio?"
  />
</FormControl>

        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Guardar
          </Button>
        </Box>
      </form>) : !showAnotherForm && (
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={() => handleAnotherPersonResponse(true)}>
            Cargar otra Persona
          </Button>
        </Box>
      )}

      {showAnotherForm && (
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <h3>
            Si vas a cargar los datos de tu pareja, ¿quieres mantener los datos de tus hijos?
          </h3>
          <Button variant="contained" color="primary" onClick={() => resetForm(true)}>
            Mantener
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => resetForm(false)}>
            No Mantener
          </Button>
        </Box>
      )}

      {formSubmitted && !showAnotherForm && (
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <h3>Gracias por completar el formulario!</h3>
        </Box>
      )}
    </LocalizationProvider>
  );
};

export default Formulario;
