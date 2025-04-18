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
  export interface FormData {
    nombre: string;
    apellido: string;
    fechaNacimiento: Date | null;
    nacionalidad: string;
    otraNacionalidad: string | null;
    direccion: string;
    telefono: string;
    mail: string;
    estadoCivil: string;
    nombreConyuge: string | null;
    cantidadHijos: number;
    profesion: string | null;
    estudios: string | null;
    añoConocimientoCristo: number |null;
    teBautizaste: boolean;
    congregacionBautismo: string | null;
    añoBautismo: number | null;
    añoInicioIglesia: number | null;
    tieneGPS: boolean;
    gpsOption: string | null;
    seSienteAcompañado: string |null;
    comprometido: string | null;
    sirvioMinisterio: string |null;
    leGustariaSumarseMinisterio: string | null;
    sirviendoMinisterio: string | null;
    hijos: DatosHijos[];
  }
  export interface FormErrors {
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
  // types/KeyValueDTO.ts
export interface KeyValueDTO {
  key: string;
  value: string;
}

export interface SelectoresResponse {
  nacionalidad: KeyValueDTO[];
  gps: KeyValueDTO[];
  estadoCivil: KeyValueDTO[];
}
export type SelectorKey = keyof SelectoresResponse; 
export interface PersonaResumen{
  nombreCompleto: string,
  telefonoPrincipal: string,
  mailPrincipal: string,
  hijos: string[],
  gpsNombre: string,
}
export interface AuthConfig {
  domain: string;
  clientId: string;
  authorizationParams: {
    audience: string;
    redirect_uri: string;
    scope: string; // Aunque es string, tiene formato específico
  };
  useRefreshTokens?: boolean; // Opcional según la versión de Auth0
  cacheLocation?: 'memory' | 'localstorage'; // Solo estos valores son válidos
}
export { };