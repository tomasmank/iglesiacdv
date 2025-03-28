// interfaces.ts

// Interfaz para los datos de cada hijo
export interface DatosHijos {
    nombre: string;
    edad: number;
  }
 export interface HijosModalProps {
    openModal: boolean;
    setOpenModal: (param: boolean) => void;
    cantidadHijos: number;
    hijos: DatosHijos[];
    handleHijosSave: (hijos:DatosHijos[]) => void;
  }
  // Interfaz para el estado del formulario
  export interface FormData {
    nombre: string;
    apellido: string;
    fechaNacimiento: Date | null;
    nacionalidad: string;
    direccion: string;
    telefono: string;
    mail: string;
    estadoCivil: string;
    nombreConyuge: string;
    cantidadHijos: number;
    profesion: string;
    estudios: string;
    añoConocimientoCristo: string;
    teBautizaste: boolean;
    congregacionBautismo: string;
    añoBautismo: string;
    añoInicioIglesia: string;
    tieneGPS: boolean;
    gpsOption: string;
    seSienteAcompañado: boolean;
    comprometido: boolean;
    sirvioMinisterio: string;
    leGustariaSumarseMinisterio: string;
    sirviendoMinisterio: string;
    hijos: DatosHijos[];
  }
  
export {};