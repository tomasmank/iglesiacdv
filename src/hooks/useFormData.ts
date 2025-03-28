// useFormData.ts

import { useState } from 'react';
import { FormData } from '../interfaces/interfaces'; // Asegúrate de tener la interfaz importada desde el archivo de interfaces

// Función para obtener los valores predeterminados
const getDefaultFormData = (): FormData => ({
  nombre: '',
  apellido: '',
  fechaNacimiento: null,
  nacionalidad: '',
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

// Hook personalizado para manejar el estado de FormData
export const useFormData = () => {
  return useState<FormData>(getDefaultFormData());
};

export {};