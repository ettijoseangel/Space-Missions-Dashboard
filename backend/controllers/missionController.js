export const getMissions = async (req, res) => {
  try {
    // Datos de prueba
    const mockMissions = [
      {
        id: 1,
        name: "Artemis II",
        status: "En Progreso",
        description:
          "Misión tripulada que orbitará la Luna para probar los sistemas de soporte vital.",
        date: "Noviembre 2024",
        destination: "Órbita Lunar",
        crew: 4,
      },
      {
        id: 2,
        name: "Apolo 11",
        status: "Exitoso",
        description: "Primera misión tripulada en aterrizar en la Luna.",
        date: "Julio 1969",
        destination: "Mar de la Tranquilidad",
        crew: 3,
      },
      {
        id: 3,
        name: "Mars Polar Lander",
        status: "Fallido",
        description:
          "Misión robótica para estudiar el clima marciano que perdió contacto.",
        date: "Diciembre 1999",
        destination: "Polo Sur Marciano",
        crew: 0,
      },
    ];

    // Respuesta con un JSON
    res.json(mockMissions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las misiones" });
  }
};
