import { ChangeEvent, FormEvent } from 'react';
import { FormData, DatosHijos } from '../interfaces/interfaces';
import { SelectChangeEvent } from '@mui/material';

export const handleHijosChange = (setFormData: React.Dispatch<React.SetStateAction<FormData>>, hijos: DatosHijos[]) => {
  setFormData((prevData) => ({
    ...prevData,
    hijos: hijos,
  }));
};

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

export const handleSubmit = (
  formData: FormData,
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Validaciones aquí si es necesario
  console.log('Datos enviados:', formData);
  setFormSubmitted(true);
};
