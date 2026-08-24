import { useState, useEffect } from "react";

export const useMissions = () => {
  const [missions, setMissions] = useState([]);
  const [pagination, setPagination] = useState({}); // Estado para la metadata
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para errores

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/missions`);

        // Verificamos si la respuesta del servidor es correcta (status 200)
        if (!response.ok) throw new Error("Error de red o servidor");

        const data = await response.json();
        setMissions(data.missions);
        setPagination(data.pagination);
      } catch (err) {
        console.error("Error conectado con el backend".err);
        setError(err.message);
      } finally {
        // finally se ejecuta siempre, haya error o exito
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  // Hook devuelve la informacion que el componente necesita
  return { missions, pagination, loading, error };
};
