import React, { FormEvent } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { es } from 'date-fns/locale/es';
import {FormData} from '../interfaces/interfaces';
import FormularioPersonal from './Formulario/FormularioPersonal';
import FormularioProfesional from './Formulario/FormularioProfesional';
import FormularioEspiritual from './Formulario/FormularioEspiritual';
import FormActions from './Formulario/FormActions';
import { useFormContext } from '../hooks/FormContext';
import { Box, CircularProgress, Container, FormLabel, Typography } from '@mui/material';
import { Header } from './Formulario/Header';
type FormularioProps = {
  children?: React.ReactNode;
};
const Formulario: React.FC<FormularioProps> = ({children}) => {
  const {
    setIsLoading,
    formSubmitted,
    validateForm,
    error,
    setFormError,
    setFormSubmitted,
    formError,
    isLoading
  } = useFormContext();
  const toApiFormat = (data: FormData) => {
    return {
      nombre: data.nombre,
      apellido: data.apellido,
      fechaNacimiento: data.fechaNacimiento,
      direccion: data.direccion,
      profesion: data.profesion,
      estudios: data.estudios,
      añoConocimientoCristo: data.añoConocimientoCristo,
      teBautizaste: data.teBautizaste,
      congregacionBautismo: data.congregacionBautismo,
      añoBautismo: data.añoBautismo,
      añoInicioIglesia: data.añoInicioIglesia,
      tieneGPS: data.tieneGPS,
      gpsOptionId: data.gpsOption ? parseInt(data.gpsOption) : null,
      seSienteAcompañado: data.seSienteAcompañado,
      comprometido: data.comprometido,
      sirvioMinisterio: data.sirvioMinisterio,
      leGustariaSumarseMinisterio: data.leGustariaSumarseMinisterio,
      sirviendoMinisterio: data.sirviendoMinisterio,
      nacionalidad: Number(data.nacionalidad),
      otraNacionalidad: data.otraNacionalidad,
      estadoCivil: Number(data.estadoCivil),
      nombreConyuge: data.nombreConyuge,
      cantidadHijos: data.cantidadHijos,
      telefonos: [{ numero: data.telefono }],
      mails: [{ email: data.mail }],
      hijos: data.hijos,
    };
  };
  const handleSubmit = async (e: FormEvent<Element>, formData: FormData, captchaToken: string) => {
    e.preventDefault();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    // Validación del formulario
    const isValid = validateForm(formData);
    if (!isValid) {
      return;
    }
  
    setIsLoading(true);
    setFormError(null);
  
    try {
      // Configuración del body y headers para la solicitud POST
      const response = await fetch('/api/personas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Captcha-Token': captchaToken, // Enviamos el token del captcha en el header
        },
        body: JSON.stringify(toApiFormat(formData)), // Enviamos los datos del formulario en el cuerpo de la solicitud
      });
  
      if (response.ok) {
        const data = await response.json();
        // Aquí puedes hacer algo con la respuesta si la persona fue creada correctamente
        console.log('Persona creada', data);
        setFormSubmitted(true);
      } else {
        // Aquí manejamos el error, puede ser un error de validación o de otro tipo
        const errorData = await response.json();
        setFormError(errorData.message || 'Hubo un problema al crear la persona');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setFormError('Hubo un error de conexión. Intenta nuevamente.');
    } finally {
      // Detener el indicador de carga
      setIsLoading(false);
    }
  };
  return (
    !error ? (
      isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <CircularProgress />
          <div>Cargando...</div>
        </div>
      ) : (
        <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
        <Header />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          {children}
          {formError && <div className="error">{formError}</div>}
          {!formSubmitted && (
            <>
              <FormularioPersonal />
              <FormularioProfesional />
              <FormularioEspiritual />
            </>
          )}
          <FormActions
            onSubmit={handleSubmit}
            isSubmitted={formSubmitted}
            submitButtonProps={{ fullWidth: true }}
            resetButtonProps={{ fullWidth: true }}
          />
        </LocalizationProvider>
        </Container>
      )
    ) : (
      <FormLabel>{error}</FormLabel>
    )
  );
};

export default Formulario;