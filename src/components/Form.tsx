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
import { FormLabel } from '@mui/material';

const Formulario: React.FC = () => {
  const {
    setFormSubmitted,
    formSubmitted,
    validateForm,
    error
  } = useFormContext();

  const handleSubmit = async (e: FormEvent<Element>, formData: FormData) => {
    e.preventDefault();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const isValid = validateForm(formData);
  
    if (isValid) {
      setFormSubmitted(true);
    }
  };
  return (
    !error ?
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
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
  : <FormLabel>{error}</FormLabel>
  );
};

export default Formulario;