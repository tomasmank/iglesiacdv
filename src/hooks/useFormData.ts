import { useState, useCallback } from 'react';
import {FormData, FormErrors} from '../interfaces/interfaces';
import { useSelectores } from '../utils/useSelectores';


const getDefaultFormData = (): FormData => ({
  nombre: '',
  apellido: '',
  fechaNacimiento: null,
  nacionalidad: '',
  otraNacionalidad: null,
  direccion: '',
  telefono: '',
  mail: '',
  estadoCivil: '',
  nombreConyuge: null,
  cantidadHijos: 0,
  profesion: null,
  estudios: null,
  añoConocimientoCristo: null,
  teBautizaste: false,
  congregacionBautismo: null,
  añoBautismo: null,
  añoInicioIglesia: null,
  tieneGPS: false,
  gpsOption: null,
  seSienteAcompañado: null,
  comprometido: null,
  sirvioMinisterio: null,
  leGustariaSumarseMinisterio: null,
  sirviendoMinisterio: null,
  hijos: [],
});

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>(getDefaultFormData());
  const [fieldInteractions, setFieldInteractions] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [showAdditionalActions, setShowAdditionalActions] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {nacionalidad, estadoCivil, gps,loading, error} = useSelectores();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const requiredFields: (keyof FormData)[] = [
    'nombre', 'apellido', 'fechaNacimiento', 
    'nacionalidad', 'direccion', 'telefono', 
    'mail', 'estadoCivil'
  ];


  const validateField = useCallback((name: keyof FormData, value: any): string | undefined => {
    switch (name) {
      case 'nombre':
      case 'apellido':
        return !value?.trim() ? 'Este campo es obligatorio' : undefined;
      
      case 'fechaNacimiento':
        return !value ? 'Debe seleccionar una fecha de nacimiento' : undefined;
      
      case 'mail':
        if (!value?.trim()) return 'Email es obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
        return undefined;
      
      case 'telefono':
        if (!value?.trim()) return 'Teléfono es obligatorio';
        if (value?.replace(/\D/g, '').length < 10) return 'Teléfono inválido';
        return undefined;
      
      case 'nombreConyuge':
        if (formData.estadoCivil === 'Casado' && !value?.trim()) {
          return 'Nombre completo del cónyuge es obligatorio para casados';
        }
        return undefined;
      
      case 'estadoCivil':
        return !value ? 'Seleccione un estado civil' : undefined;
        case 'gpsOption':
          return !value ? 'Seleccione un lider de GPS' : undefined;
      case 'direccion':
      case 'nacionalidad':
        return !value?.trim() ? 'Este campo es obligatorio' : undefined;
      case 'otraNacionalidad':
          if (formData.nacionalidad === 'Otra' && !value?.trim()) {
            return 'Por favor especifica tu nacionalidad';
          }
          return undefined;
      default:
        return undefined;
    }
  }, [formData.estadoCivil, formData.nacionalidad]);

  const normalizeForm = (formData: FormData): FormData => {
    const normalized: FormData = { ...formData };
  
    Object.entries(formData).forEach(([key, value]) => {
      // Solo aplicamos a los campos que permiten null y no son obligatorios
      if (
        value === "" ||
        value === undefined
      ) {
        // Usamos type assertion para evitar que explote el TS con el indexado dinámico
        (normalized as any)[key] = null;
      }
    });
  
    return normalized;
  };

  const validateForm = useCallback((rawFormData : FormData): boolean => {
    const formData = normalizeForm(rawFormData); // 👈 normalizamos primero
    let isValid = true;
    const newErrors: FormErrors = {};

    requiredFields.forEach(field => {
      const value = formData[field];
      const error = validateField(field, value);
      
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
      
      setFieldInteractions(prev => ({ ...prev, [field]: true }));
    });

    if (formData.estadoCivil === 'Casado' && !formData.nombreConyuge?.trim()) {
      newErrors.nombreConyuge = 'Nombre completo del cónyuge es obligatorio para casados';
      isValid = false;
      setFieldInteractions(prev => ({ ...prev, nombreConyuge: true }));
    }
    if (formData.nacionalidad === 'Otra' && !formData.otraNacionalidad?.trim()) {
      newErrors.otraNacionalidad = 'Por favor especifica tu nacionalidad';
      isValid = false;
      setFieldInteractions(prev => ({ ...prev, otraNacionalidad: true }));
    }
    setErrors(newErrors);
    return isValid;
  }, []);
  const handleDateChange = (date: Date | null, field: string = 'fechaNacimiento') => {
    if (field === 'fechaNacimiento' && date != null && date?.getTime() > Date.now()){
      date = null;
    }
    setFormData(prev => ({ ...prev, [field]: date }));
    setFieldInteractions(prev => ({ ...prev, [field]: true }));
      const error = validateField(field as keyof FormData, date);
      setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { 
      target: { name?: string; value: any, type?: string } 
    }) => {
      const target = e.target as HTMLInputElement;
      const name = target.name as keyof FormData;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      if (!name) return;

      setFormData(prev => {
        const updates: Partial<FormData> = { [name]: value };
        

        if (name === 'teBautizaste') {
          updates.congregacionBautismo = value ? prev.congregacionBautismo : null;
          updates.añoBautismo = value ? prev.añoBautismo : null;
        }
        else if (name === 'tieneGPS') {
          updates.gpsOption = value ? prev.gpsOption : null;
        }

        else if (name === 'estadoCivil') {
          const shouldClearConyuge = value !== "Casado";
          if (shouldClearConyuge) {
            updates.nombreConyuge = null;
            setFieldInteractions(prev => ({ ...prev, nombreConyuge: false }));
          }
        }else if (name === 'nacionalidad') {
          const shouldClearotraNacionalidad = value !== "Otra";
          if (shouldClearotraNacionalidad) {
            updates.otraNacionalidad = '';
            setFieldInteractions(prev => ({ ...prev, otraNacionalidad: false }));
          }
        }

        return { ...prev, ...updates };
      });
      setFieldInteractions(prev => ({ ...prev, [name]: true }));
      
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    },
    [validateField]
  );


  const handleBlur = (field: string) => {
    setFieldInteractions(prev => ({ ...prev, [field]: true }));
    const value = formData[field as keyof FormData];
    const error = validateField(field as keyof FormData, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const resetForm = useCallback((keepChildren = false) => {
    setFormData(prev => ({
      ...getDefaultFormData(),
      ...(keepChildren && {
        cantidadHijos: prev.cantidadHijos,
        hijos: prev.hijos
      })
    }));
    setFieldInteractions({});
    setErrors({});
    setShowAdditionalActions(false);
    setFormSubmitted(false);
  }, [getDefaultFormData]);

  const handleAddAnother = useCallback(() => {
    setShowAdditionalActions(formData.cantidadHijos > 0);
    if (formData.cantidadHijos <= 0) resetForm();
  }, [formData.cantidadHijos, resetForm]);

  return {
    formData,
    setFormData,
    errors,
    fieldInteractions,
    handleChange,
    handleBlur,
    resetForm,
    showAdditionalActions,
    handleAddAnother,
    formSubmitted,
    setFormSubmitted,
    getDefaultFormData,
    handleDateChange,
    validateForm,
    validateField,
    error,
    loading,
    nacionalidad,
    gps,
    estadoCivil,
    isLoading,
    setIsLoading,
    formError,
    setFormError
  };
};