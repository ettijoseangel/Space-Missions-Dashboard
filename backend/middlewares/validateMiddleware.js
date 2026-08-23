export const validateData = (schema) => {
  return (req, res, next) => {
    try {
      // Intenta validar el cuerpo de la peticion contra el esquema Zod
      schema.parse(req.body);
      // Si todo sale bien, pasa al siguiente middleware o controlador
      next();
    } catch (error) {
      // Si detecta un error, formateamos la respuesta para el frontend
      const errorMessages = error.errors.map((err) => ({
        campo: err.path[0],
        mensaje: err.message,
      }));

      return res.status(400).json({
        message: "Datos de telemetría inválidos",
        errors: errorMessages,
      });
    }
  };
};
