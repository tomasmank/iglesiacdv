import { useEffect, useState } from "react";
import { KeyValueDTO, SelectoresResponse } from "../interfaces/interfaces";

const SELECTORES_CACHE_KEY = "selectoresData";
const CACHE_DURATION_MS = 2 * 60 * 60 * 1000; // 2 horas

const MOCK_DATA = {
  nacionalidad: [
    { key: "Argentina", value: "Argentina" },
    { key: "Bolivia", value: "Bolivia" },
    { key: "Brasil", value: "Brasil" },
    { key: "Chile", value: "Chile" },
    { key: "Colombia", value: "Colombia" },
    { key: "CostaRica", value: "Costa Rica" },
    { key: "Cuba", value: "Cuba" },
    { key: "Ecuador", value: "Ecuador" },
    { key: "ElSalvador", value: "El Salvador" },
    { key: "Paraguay", value: "Paraguay" },
    { key: "Peru", value: "Perú" },
    { key: "Uruguay", value: "Uruguay" },
    { key: "Venezuela", value: "Venezuela" },
    { key: "Otra", value: "Otra" }
  ],
  estadoCivil: [
    { key: "Soltero", value: "Soltero/a" },
    { key: "Casado", value: "Casado/a" },
    { key: "Viudo", value: "Viudo/a" },
    { key: "Divorciado", value: "Divorciado/a" },
    { key: "Separado", value: "Separado/a" }
  ],
  gps: [
    { key: "Ailén y Vanessa", value: "Ailén y Vanessa" },
    { key: "Alejandra Kruber", value: "Alejandra Kruber" },
    { key: "Caro y Joaquín Casale", value: "Caro y Joaquín Casale" },
    { key: "Isabella - Wanda", value: "Isabella - Wanda" },
    { key: "Joyce Pacheco", value: "Joyce Pacheco" },
    { key: "Mara Noya", value: "Mara Noya" },
    { key: "Marisol González", value: "Marisol González" },
    { key: "Maru y Pedro Fernández", value: "Maru y Pedro Fernández" },
    { key: "Micaela Diaz y Iara", value: "Micaela Diaz y Iara" },
    { key: "Mónica Yacenko", value: "Mónica Yacenko" },
    { key: "Naiara Kittler", value: "Naiara Kittler" },
    { key: "Natalia Reynoso", value: "Natalia Reynoso" },
    { key: "Walter Ángel Colman", value: "Walter Ángel Colman" },
    { key: "Pablo y Cecilia Cuenca", value: "Pablo y Cecilia Cuenca" },
    { key: "Tomás y Lina Mankowski", value: "Tomás y Lina Mankowski" }
  ]
};

export function useSelectores() {
  const [data, setData] = useState<SelectoresResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verificar si estamos en un dominio que contiene "github"
        const isGithubDomain = window.location.hostname.includes('github');
        
        if (isGithubDomain) {
          const mockData = {
            data: MOCK_DATA,
            timestamp: Date.now()
          };
          sessionStorage.setItem(SELECTORES_CACHE_KEY, JSON.stringify(mockData));
          setData(MOCK_DATA);
          setLoading(false);
          return;
        }

        const cache = sessionStorage.getItem(SELECTORES_CACHE_KEY);
        if (cache) {
          const { data, timestamp } = JSON.parse(cache);
          const isExpired = Date.now() - timestamp > CACHE_DURATION_MS;
          if (!isExpired) {
            setData(data);
            setLoading(false);
            return;
          }
        }

        const response = await fetch("/api/selectores");
        if (!response.ok) throw new Error("No se pudo obtener los datos");

        const result: SelectoresResponse = await response.json();
        sessionStorage.setItem(
          SELECTORES_CACHE_KEY,
          JSON.stringify({ data: result, timestamp: Date.now() })
        );

        setData(result);
      } catch (err: any) {
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    error,
    loading,
    nacionalidad: data?.nacionalidad,
    gps: data?.gps,
    estadoCivil: data?.estadoCivil,
  };
}