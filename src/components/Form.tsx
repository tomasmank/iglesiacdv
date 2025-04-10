import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { es } from 'date-fns/locale/es';
import { useFormData } from '../hooks/useFormData';
import FormularioPersonal from './Formulario/FormularioPersonal';
import FormularioProfesional from './Formulario/FormularioProfesional';
import FormularioEspiritual from './Formulario/FormularioEspiritual';
import FormActions from './Formulario/FormActions';
import { FormProvider, useFormContext } from '../hooks/FormContext';

const Formulario: React.FC = () => {
  const {
    setFormSubmitted,
    formSubmitted,
    validateForm
  } = useFormContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Espera a que React actualice el estado (solución para asincronía)
    await new Promise(resolve => setTimeout(resolve, 0));
    
    const isValid = validateForm();
  
    if (isValid) {
      setFormSubmitted(true);
    }
  };
  return (
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
  );
};

export default Formulario; // Optimización para evitar re-renders innecesarios