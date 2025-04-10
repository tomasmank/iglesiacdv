import { useState, useCallback } from 'react';
import {FormData} from '../interfaces/interfaces';
interface FormErrors {
  nombre?: string;
  apellido?: string;
  fechaNacimiento?: string;
  nacionalidad?: string;
  direccion?: string;
  telefono?: string;
  mail?: string;
  estadoCivil?: string;
  nombreConyuge?: string;
  otraNacionalidad?:string;
  [key: string]: string | undefined;
}

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
  const [fieldInteractions, setFieldInteractions] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [showAdditionalActions, setShowAdditionalActions] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const requiredFields: (keyof FormData)[] = [
    'nombre', 'apellido', 'fechaNacimiento', 
    'nacionalidad', 'direccion', 'telefono', 
    'mail', 'estadoCivil'
  ];


  const validateField = useCallback((name: keyof FormData, value: any): string | undefined => {
    switch (name) {
      case 'nombre':
      case 'apellido':
        return !value.trim() ? 'Este campo es obligatorio' : undefined;
      
      case 'fechaNacimiento':
        return !value ? 'Debe seleccionar una fecha' : undefined;
      
      case 'mail':
        if (!value.trim()) return 'Email es obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
        return undefined;
      
      case 'telefono':
        if (!value.trim()) return 'Teléfono es obligatorio';
        if (value.replace(/\D/g, '').length < 8) return 'Teléfono inválido';
        return undefined;
      
      case 'nombreConyuge':
        if (formData.estadoCivil === 'Casado' && !value.trim()) {
          return 'Nombre del cónyuge es obligatorio para casados';
        }
        return undefined;
      
      case 'estadoCivil':
        return !value ? 'Seleccione un estado civil' : undefined;
        case 'gpsOption':
          return !value ? 'Seleccione un lider de GPS' : undefined;
      case 'direccion':
      case 'nacionalidad':
        return !value.trim() ? 'Este campo es obligatorio' : undefined;
      case 'otraNacionalidad':
          if (formData.nacionalidad === 'Otra' && !value.trim()) {
            return 'Por favor especifica tu nacionalidad';
          }
          return undefined;
      default:
        return undefined;
    }
  }, [formData.estadoCivil, formData.nacionalidad]);


  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};
    console.log("validate", formData)
    // Validar campos requeridos
    requiredFields.forEach(field => {
      const value = formData[field];
      const error = validateField(field, value);
      
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
      
      // Marcar como interactuado para mostrar errores
      setFieldInteractions(prev => ({ ...prev, [field]: true }));
    });

    // Validación condicional para cónyuge
    if (formData.estadoCivil === 'Casado' && !formData.nombreConyuge.trim()) {
      newErrors.nombreConyuge = 'Nombre del cónyuge es obligatorio para casados';
      isValid = false;
      setFieldInteractions(prev => ({ ...prev, nombreConyuge: true }));
    }
    if (formData.nacionalidad === 'Otra' && !formData.otraNacionalidad.trim()) {
      newErrors.otraNacionalidad = 'Por favor especifica tu nacionalidad';
      isValid = false;
      setFieldInteractions(prev => ({ ...prev, otraNacionalidad: true }));
    }
    setErrors(newErrors);
    return isValid;
  }, []);
  const handleDateChange = (date: Date | null, field: string = 'fechaNacimiento') => {
    setFormData(prev => ({ ...prev, [field]: date }));
    setFieldInteractions(prev => ({ ...prev, [field]: true }));
      const error = validateField(field as keyof FormData, date);
      setErrors(prev => ({ ...prev, [field]: error }));
  };
  // Manejador de cambios unificado
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
        
        // Lógica para switches
        if (name === 'teBautizaste') {
          updates.congregacionBautismo = value ? prev.congregacionBautismo : '';
          updates.añoBautismo = value ? prev.añoBautismo : '';
        }
        else if (name === 'tieneGPS') {
          updates.gpsOption = value ? prev.gpsOption : '';
        }
        // Lógica para estado civil
        else if (name === 'estadoCivil') {
          const shouldClearConyuge = value !== "Casado";
          if (shouldClearConyuge) {
            updates.nombreConyuge = '';
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
      console.log("formData", formData)
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

  // Función para resetear el formulario
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
    validateField
  };
};