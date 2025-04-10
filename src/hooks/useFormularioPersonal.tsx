import { useState } from 'react';
import { FormData, SetFormData } from '../interfaces/interfaces';

export const useFormularioPersonal = (formData: FormData, setFormData: SetFormData) => {
  const [fieldInteracted, setFieldInteracted] = useState({
    nombreConyuge: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { name?: string; value: unknown } }) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
  
    if (!name) return;
  
    setFormData(prev => {
      const updates: Partial<FormData> = { [name]: value };
      
      // Lógica para switches
      if (name === 'teBautizaste') {
        updates.congregacionBautismo = target.checked ? prev.congregacionBautismo : '';
        updates.añoBautismo = target.checked ? prev.añoBautismo : '';
      }
      else if (name === 'tieneGPS') {
        updates.gpsOption = target.checked ? prev.gpsOption : '';
      }
      // Lógica para estado civil
      else if (name === 'estadoCivil') {
        const shouldClearConyuge = value !== "Casado";
        if (shouldClearConyuge) {
          updates.nombreConyuge = '';
          setFieldInteracted(f => ({ ...f, nombreConyuge: false }));
        }
      }
  
      return { ...prev, ...updates };
    });
  
    if (name === "nombreConyuge") {
      setFieldInteracted(prev => ({ ...prev, nombreConyuge: true }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, fechaNacimiento: date }));
  };

  const handleBlur = (field: string) => {
    setFieldInteracted(prev => ({ ...prev, [field]: true }));
  };

  // Validaciones
  const isConyugeRequired = formData.estadoCivil === 'Casado' && !formData.nombreConyuge;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail);
  const showConyugeError = fieldInteracted.nombreConyuge && isConyugeRequired;

  return {
    handleChange,
    handleDateChange,
    handleBlur,
    validations: {
      isEmailValid,
      showConyugeError
    }
  };
};