import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Buscamos al operador en la base de datos
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 2. Verificamos la password encriptada
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 3. Generamos el JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }, // El token expira en 8 horas
    );

    // 4. Respondemos con el token y datos basicos
    res.json({
      token,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error en el servidor de control",
        error: error.message,
      });
  }
};
