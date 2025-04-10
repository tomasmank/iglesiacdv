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
  export type SetFormData = React.Dispatch<React.SetStateAction<FormData>>;
  export interface FormData {
    nombre: string;
    apellido: string;
    fechaNacimiento: Date | null;
    nacionalidad: string;
    otraNacionalidad: string;
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