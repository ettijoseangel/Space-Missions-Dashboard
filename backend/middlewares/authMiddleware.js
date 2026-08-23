import jwt from "jsonwebtoken";

// Guardia 1: Token valido?
export const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      // Extraemos el token del string "Bearer <token>"
      token = token.split(" ")[1];

      // Desencriptamos y verificamos
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Guardamos la informacion del usuario en la request
      req.user = decoded;
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Acceso denegado: Token inválido o expirado" });
    }
  } else {
    res
      .status(401)
      .json({
        message: "Acceso denegado: No se proporcionó un token de autorización",
      });
  }
};

// Guardia 2: Es administrador?
export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acceso restringido: Se requiere autorización de Nivel Administrador'});
    }
}