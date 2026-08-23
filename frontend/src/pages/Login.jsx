import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";

// Reglas de Zod definidas para el form
const loginSchema = z.object({
  username: z.string().min(1, "El identificador es requerido"),
  password: z.string().min(1, "La clave de acceso es requerida"),
});

const Login = () => {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Funcion del contexto

  // Configuracion del react-hook-form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Funcion que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error en la autorización");
      }

      login(result.token);

      navigate("/");
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

return (
    <div className="min-h-screen bg-space-dark flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #E3000F 0%, transparent 40%)' }}>
      </div>

      {/* Tarjeta de Login */}
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-md border-t-4 border-jpl-red rounded-lg shadow-2xl p-8 border-x border-b">
        
        <div className="text-center mb-8">
          <p className="text-jpl-red font-mono text-sm tracking-[0.3em] uppercase mb-2">Protocolo de Seguridad</p>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Acceso Restringido</h1>
        </div>

        {/* Mensaje de error de la API */}
        {apiError && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 rounded flex items-center gap-2">
            <span className="text-red-500 font-mono text-sm uppercase tracking-wider">{'>'} ERROR: {apiError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo Usuario */}
          <div>
            <label className="block text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">
              Identificador de Operador
            </label>
            <input
              type="text"
              {...register('username')}
              className={`w-full bg-gray-950 border ${errors.username ? 'border-red-500' : 'border-gray-700'} rounded p-3 text-white focus:outline-none focus:border-jpl-red transition-colors font-mono`}
              placeholder="Ej. tulipano.smith.garcia"
              autoComplete="off"
            />
            {errors.username && <p className="text-red-500 text-xs font-mono mt-1">{errors.username.message}</p>}
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">
              Clave de Acceso
            </label>
            <input
              type="password"
              {...register('password')}
              className={`w-full bg-gray-950 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded p-3 text-white focus:outline-none focus:border-jpl-red transition-colors font-mono`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs font-mono mt-1">{errors.password.message}</p>}
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-jpl-red hover:bg-red-700 text-white font-mono uppercase tracking-widest font-bold py-3 px-4 rounded transition-colors mt-4 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Autenticando...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-wider">
            Solo personal autorizado. <br/>Toda actividad es monitoreada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;