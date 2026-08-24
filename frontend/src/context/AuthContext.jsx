import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

// Proveedor creado
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          return null;
        }
        return { id: decoded.id, role: decoded.role };
      } catch (err) {
        console.log("Token corrupto:", err.message);
        localStorage.removeItem("token");
        return null;
      }
    }
    return null;
  });

  // Inicio de sesion
  const login = (newToken) => {
    localStorage.setItem("token", newToken); // Guarda en memoria del navegador
    setToken(newToken);
    try {
      const decoded = jwtDecode(newToken);
      setUser({ id: decoded.id, role: decoded.role });
    } catch (err) {
      console.log("Error al leer el token en el login", err);
    }
  };

  // Cierre de sesion
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
