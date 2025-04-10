import React, { useState } from 'react';
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
    setFormData, 
    resetForm,
    showAdditionalActions,
    handleAddAnother,
    setFormSubmitted,
    formSubmitted
  } = useFormData();





  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <form onSubmit={(e) => {
        e.preventDefault();
        setFormSubmitted(true);
      }}>
        {
        !formSubmitted && <>
        <FormularioPersonal formData={formData} setFormData={setFormData} />
        <FormularioProfesional formData={formData} setFormData={setFormData} />
        <FormularioEspiritual formData={formData} setFormData={setFormData} />
        </>
        }
        <FormActions
          onSubmit={() => setFormSubmitted(true)}
          onReset={() => resetForm()}
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

export default Formulario;