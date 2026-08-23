export const validateData = (schema) => {
  return (req, res, next) => {
    const validacion = schema.safeParse(req.body);

    if (!validacion.success) {
      // Blindamos el mapeo con encadenamiento opcional (?.) y arreglos vacíos de respaldo
      const issues = validacion.error?.errors || validacion.error?.issues || [];
      
      const errorMessages = issues.map((err) => ({
        campo: err.path && err.path.length > 0 ? err.path.join('.') : 'general',
        mensaje: err.message || 'Valor inválido'
      }));
      
      return res.status(400).json({ 
        message: 'Datos de telemetría inválidos', 
        errors: errorMessages 
      });
    }

    // Reasignamos los datos limpios y validados por Zod
    req.body = validacion.data;
    next();
  };
};