import { Mission } from "../models/Mission.js";

// @desc    Obtener todas las misiones (Paginado)
// @route   GET /api/missions

export const getMissions = async (req, res) => {
  try {
    // Obtenemos la pagina y el limite desde la URL (o usamos valores por defecto)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const status = req.query.status;

    const query = {}; // Filtro vacio

    if (status && status !== "Todas") {
      query.estado = status;
    }

    // Calculamos cuantos registros saltarnos
    const skip = (page - 1) * limit;

    // Contamos el total de documentos para saber cuantas paginas hay en total
    const total = await Mission.countDocuments(query);

    // Buscamos las misiones aplicando el salto y el limite
    const missions = await Mission.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

    // Devolvemos los datos junto con la metadata de la paginacion
    res.json({
      missions,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Houston. Tenemos un problema.", error: error.message });
  }
};

// @desc    Obtener una sola misión por ID
// @route   GET /api/missions/:id
export const getMissionByID = async (req, res) => {
  try {
    const { id } = req.params;
    const mission = await Mission.findById(id);

    if (!mission) {
      res.status(404).json({ message: "Misión no encontrada en los registros." });
    }
    res.json(mission);
    
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al acceder a los archivos de la misión", error: error.message });
  }
};

// @desc    Crear una nueva misión
// @route   POST /api/missions
export const createMission = async (req, res) => {
  try {
    // Extraemos los datos que nos enviará el frontend o cliente HTTP
    const {
      nombre,
      agencia,
      fecha_lanzamiento,
      estado,
      tripulacion,
      destino,
      descripcion,
    } = req.body;

    // Creamos la instancia en la BD
    const mission = await Mission.create({
      nombre,
      agencia,
      fecha_lanzamiento,
      estado,
      tripulacion,
      destino,
      descripcion,
    });

    res.status(201).json(mission);
  } catch (error) {
    res.status(400).json({
      message: "Error al crear la misión. Verifica los datos enviados.",
      error: error.message,
    });
  }
};

// @desc    Actualizar una sola mision por ID
// @route   PUT /api/missions/:id
export const updateMission = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMission = await Mission.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // Fuerza a Mongoose a respetar el enum de los 5 estados
    });

    if (!updatedMission) {
      return res.status(404).json({
        message: "La misión especificada no existe en los registros.",
      });
    }

    res.status(200).json(updatedMission);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la telemetría.",
      error: error.message,
    });
  }
};

// @desc    Eliminar una sola mision por ID
// @route   DELETE /api/missions/:id

export const deleteMission = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMission = await Mission.findByIdAndDelete(id);

    if (!deletedMission) {
      return res
        .status(404)
        .json({
          message: "La misión especificada no existe en los registros.",
        });
    }

    res
      .status(200)
      .json({ message: "Misión purgada de la base de datos exitosamente." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al purgar la misión.", error: error.message });
  }
};
