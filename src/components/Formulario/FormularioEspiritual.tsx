import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Divider,
  Box,
  FormHelperText
} from '@mui/material';
import { useFormContext } from '../../hooks/FormContext';
import { useSelectores } from '../../utils/useSelectores';
import { KeyValueDTO, SelectoresResponse } from '../../interfaces/interfaces';

interface FormularioEspiritualProps {
}
const OPCIONES = [
  { value: 'Si', label: 'Sí' },
  { value: 'No', label: 'No' },
  { value: 'NoSe', label: 'No lo sé' }
];
const FormularioEspiritual: React.FC<FormularioEspiritualProps> = () => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
const {
  handleChange,
  formData,
  fieldInteractions,
  handleBlur,
  errors,
  gps,
  error,
  loading
  } = useFormContext();
  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Información Espiritual
      </Typography>

      <TextField
        name="añoConocimientoCristo"
        label="Año en el que conociste a Cristo"
        value={formData.añoConocimientoCristo}
        onChange={handleChange}
        type="number"
        slotProps={{htmlInput:{min:1900, max: new Date().getFullYear()}}}
        fullWidth
        margin="normal"
      />
            <InputLabel>¿Te bautizaste?</InputLabel>
              <FormControl fullWidth margin="normal">
                {(
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <span>No</span>
                    <Switch
                      name="teBautizaste"
                      checked={formData.teBautizaste}
                      onChange={handleChange}
                      color="primary"
                    />
                    <span>Sí</span>
                  </Box>
                )}
              </FormControl>

      {formData.teBautizaste && (
        <>
          <TextField
            name="congregacionBautismo"
            label="Nombre de la iglesia donde te bautizaste"
            value={formData.congregacionBautismo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            slotProps={{
              inputLabel: {
                sx: {
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  textAlign: 'left',
                  marginTop:{xs:'-10px',sm:'0'}
                },
              }
            }}
          />
          <TextField
            name="añoBautismo"
            label="Año del Bautismo"
            value={formData.añoBautismo}
            onChange={handleChange}
            type="number"
            slotProps={{htmlInput:{min:1900, max: new Date().getFullYear()}}}
            fullWidth
            margin="normal"
          />
        </>
      )}

      <TextField
        name="añoInicioIglesia"
        label="Año en que empezaste a venir a nuestra iglesia"
        value={formData.añoInicioIglesia}
        onChange={handleChange}
        type="number"
        fullWidth
        margin="normal"
        slotProps={{
          inputLabel: {
            sx: {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              textAlign: 'left',
              marginTop:{xs:'-10px',sm:'0'}
            },
          },
          htmlInput:{min:1900, max: new Date().getFullYear()}
        }}
      />
        <InputLabel>¿Participás de un GPS?</InputLabel>
      <FormControl fullWidth margin="normal">

        <Box display="flex" justifyContent="center" alignItems="center">
          <span>No</span>
          <Switch
            name="tieneGPS"
            checked={formData.tieneGPS}
            onChange={handleChange}
            color="primary"
            sx={{ mx: 1 }}
          />
          <span>Sí</span>
        </Box>
      </FormControl>

      {formData.tieneGPS && (
  <FormControl
    fullWidth
    margin="normal"
    required
    error={!!errors.gpsOption && fieldInteractions.gpsOption}
  >
    <InputLabel id="gpsOption-label">Nombre del líder de GPS</InputLabel>
    <Select
      labelId="gpsOption-label"
      name="gpsOption"
      value={formData.gpsOption}
      onChange={handleChange}
      
      label="Nombre del líder de GPS"
      sx={{ textAlign: 'left' }}
      inputProps={{
        onBlur:() => handleBlur('gpsOption'),
        required: false,
        'aria-required': 'true'
      }}
    >
                {!loading && !error && gps!
            .map(gps => (
              <MenuItem key={gps.key} value={gps.key}>{gps.value}</MenuItem>
            ))}
          {!loading && error && <MenuItem key={error} value={error}>Ocurrio un error cargando las opciones.</MenuItem> }
          {loading && <MenuItem key="Cargando" value="Cargando">Cargando...</MenuItem>}
              </Select>
    {fieldInteractions.gpsOption && errors.gpsOption && (
      <FormHelperText>{errors.gpsOption}</FormHelperText>
    )}
  </FormControl>
)}

      <InputLabel sx={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}>¿Vivís a la iglesia como tu familia de fe donde crecés y sos acompañado?</InputLabel>
      <FormControl fullWidth margin="normal">

        <RadioGroup
          name="seSienteAcompañado"
          value={formData.seSienteAcompañado}
          onChange={handleChange}
          row
          sx={{ justifyContent: 'center', mt: 1 }}
        >
{OPCIONES.map(opcion => (
    <FormControlLabel 
      key={opcion.value}
      value={opcion.value}
      control={<Radio />}
      label={opcion.label}
    />
  ))}
        </RadioGroup>
      </FormControl>

      <InputLabel sx={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}>¿Estás comprometido/a a ser familia para otros miembros?</InputLabel>
      <FormControl fullWidth margin="normal">

        <RadioGroup
          name="comprometido"
          value={formData.comprometido}
          onChange={handleChange}
          row
          sx={{ justifyContent: 'center', mt: 1 }}
        >
{OPCIONES.map(opcion => (
    <FormControlLabel 
      key={opcion.value}
      value={opcion.value}
      control={<Radio />}
      label={opcion.label}
    />
  ))}
        </RadioGroup>
      </FormControl>

      <Divider sx={{ my: 3 }} />
      <Typography variant="subtitle1" gutterBottom>
        Participación en Ministerios
      </Typography>

      <TextField
        name="sirvioMinisterio"
        label={
          focusedInput === "sirvioMinisterio" || formData.sirvioMinisterio
            ? "Ministerios: ¿Serviste?" 
            : "¿Serviste en algún ministerio alguna vez en esta u otra congregación? ¿En cuál?"
        }
        value={formData.sirvioMinisterio}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        onFocus={() => setFocusedInput("sirvioMinisterio")}
        onBlur={() => setFocusedInput(null)}
        slotProps={{
          inputLabel: {
            sx: {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              textAlign: 'left',
              marginTop:{xs:'-10px',sm:'0'}
            },
          }
        }}
      />

      <TextField
        name="sirviendoMinisterio"
        label={
          focusedInput === "sirviendoMinisterio" || formData.sirviendoMinisterio
            ? "Ministerios: ¿Estás sirviendo?" 
            : "¿Estás sirviendo en algún ministerio? ¿En cuál?"
        }
        value={formData.sirviendoMinisterio}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        onFocus={() => setFocusedInput("sirviendoMinisterio")}
        onBlur={() => setFocusedInput(null)}
        slotProps={{
          inputLabel: {
            sx: {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              textAlign: 'left',
              marginTop:{xs:'-10px',sm:'0'}
            },
          }
        }}
      />

      <TextField
        name="leGustariaSumarseMinisterio"
        label={
          focusedInput === "leGustariaSumarseMinisterio" || formData.leGustariaSumarseMinisterio
            ? "Ministerios: ¿Te sumarías?" 
            : "¿Te gustaría sumarte a un ministerio? ¿A cuál?"
        }
        value={formData.leGustariaSumarseMinisterio}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        onFocus={() => setFocusedInput("leGustariaSumarseMinisterio")}
        onBlur={() => setFocusedInput(null)}
        slotProps={{
          inputLabel: {
            sx: {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              textAlign: 'left',
              marginTop:{xs:'-10px',sm:'0'}
            },
          }
        }}
      />
    </>
  );
};

export default React.memo(FormularioEspiritual) as typeof FormularioEspiritual;