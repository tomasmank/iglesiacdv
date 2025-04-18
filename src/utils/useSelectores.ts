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
    { key: "1", value: "Ailén y Vanessa" },
    { key: "2", value: "Alejandra Kruber" },
    { key: "3", value: "Caro y Joaquín Casale" },
    { key: "4", value: "Isabella - Wanda" },
    { key: "5", value: "Joyce Pacheco" },
    { key: "6", value: "Mara Noya" },
    { key: "7", value: "Marisol González" },
    { key: "8", value: "Maru y Pedro Fernández" },
    { key: "9", value: "Micaela Diaz y Iara" },
    { key: "10", value: "Mónica Yacenko" },
    { key: "11", value: "Naiara Kittler" },
    { key: "12", value: "Natalia Reynoso" },
    { key: "13", value: "Walter Ángel Colman" },
    { key: "14", value: "Pablo y Cecilia Cuenca" },
    { key: "15", value: "Tomás y Lina Mankowski" }
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