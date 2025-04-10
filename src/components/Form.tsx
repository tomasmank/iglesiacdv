import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { es } from 'date-fns/locale/es';
import { useFormData } from '../hooks/useFormData';
import FormularioPersonal from './Formulario/FormularioPersonal';
import FormularioProfesional from './Formulario/FormularioProfesional';
import FormularioEspiritual from './Formulario/FormularioEspiritual';
import FormActions from './Formulario/FormActions';

const Formulario: React.FC = () => {
  const {
    formData,
    setFormSubmitted,
    formSubmitted,
    showAdditionalActions,
    resetForm,
    handleAddAnother,
    validateForm
  } = useFormData();

  const handleSubmit = () => {
    const isValid = validateForm(); // Validar al hacer click
    // Aquí podrías agregar validación antes de enviar

    if (isValid) {
      setFormSubmitted(true);
      // Enviar datos o continuar con el flujo
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <form autoComplete= 'off'>
        {!formSubmitted && (
          <>
            <FormularioPersonal />
            <FormularioProfesional />
            <FormularioEspiritual />
          </>
        )}
        <FormActions
          onSubmit={handleSubmit}
          onReset={resetForm}
          onAddAnother={handleAddAnother}
          onKeepChildren={(keep) => resetForm(keep)}
          isSubmitted={formSubmitted}
          showAdditionalActions={showAdditionalActions}
          hasChildren={formData.cantidadHijos > 0}
          submitButtonProps={{ fullWidth: true }}
          resetButtonProps={{ fullWidth: true }}
        />
      </form>
    </LocalizationProvider>
  );
};

export default React.memo(Formulario); // Optimización para evitar re-renders innecesarios