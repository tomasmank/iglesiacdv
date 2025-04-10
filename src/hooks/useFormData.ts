import { useState, useCallback } from 'react';
import { FormData } from '../interfaces/interfaces';

const getDefaultFormData = (): FormData => ({
  nombre: '',
  apellido: '',
  fechaNacimiento: null,
  nacionalidad: '',
  otraNacionalidad: '',
  direccion: '',
  telefono: '',
  mail: '',
  estadoCivil: '',
  nombreConyuge: '',
  cantidadHijos: 0,
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
  hijos: [],
});

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>(getDefaultFormData());
  const [showAdditionalActions, setShowAdditionalActions] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
  // Función para resetear el formulario
  const resetForm = useCallback((keepChildren = false) => {
    setFormData(prev => ({
      ...getDefaultFormData(),
      ...(keepChildren && {
        cantidadHijos: prev.cantidadHijos,
        hijos: prev.hijos
      })
    }));
    setShowAdditionalActions(false);
    setFormSubmitted(false);
  }, []);

  const handleAddAnother = () => {
    setShowAdditionalActions(formData.cantidadHijos > 0);
    if (formData.cantidadHijos <= 0) resetForm();
  };
  // Función para actualizar campos específicos
  const updateField = useCallback(<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  return {
    formData,
    setFormData,
    resetForm,
    updateField,
    showAdditionalActions,
    handleAddAnother,
    formSubmitted,
    setFormSubmitted,
    getDefaultFormData // Exportamos por si se necesita
  };
};