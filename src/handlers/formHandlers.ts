import { ChangeEvent, FormEvent } from 'react';
import { FormData, DatosHijos } from '../interfaces/interfaces';
import { SelectChangeEvent } from '@mui/material';

// Función para manejar cambios en los hijos
export const handleHijosChange = (setFormData: React.Dispatch<React.SetStateAction<FormData>>, hijos: DatosHijos[]) => {
  setFormData((prevData) => ({
    ...prevData,
    hijos: hijos,
  }));
};

// Función para manejar cambios generales en el formulario
export const handleFormChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  const { name, value } = e.target;
  console.log(name, value);
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// Función para manejar el submit del formulario
export const handleSubmit = (e: FormEvent<HTMLFormElement>, setFormData: React.Dispatch<React.SetStateAction<FormData>>,setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>) => {
  e.preventDefault();
  setFormSubmitted(true); // Mostrar la pregunta "¿Quieres cargar otra persona?"
  
};
