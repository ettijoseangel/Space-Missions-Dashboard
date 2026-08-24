import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

// Esquema recreado de Zod EXACTO
const missionSchema = z.object({
  nombre: z.string().min(3, "Mínimo 3 caracteres"),
  agencia: z.string().min(2, "Mínimo 2 caracteres"),
  destino: z.string().min(1, "El destino es obligatorio"),
  fecha_lanzamiento: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD"),
  estado: z.enum(["Exitoso", "En Progreso", "Fallido"]),
  // z.coerce fuerza a que el input (que siempre es texto en HTML) se convierta a número
  tripulacion: z.coerce.number().min(0, "No puede ser negativa"),
  descripcion: z.string().optional(),
});

const MissionModal = ({ isOpen, onClose, onMissionAdded }) => {
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(missionSchema),
    defaultValues: {
      estado: "En Progreso",
      tripulacion: 0,
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Toast de carga
    const toastId = toast.loading("Estableciendo conexión con el servidor...");

    try {
      const response = await fetch("http://localhost:5000/api/missions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al guardar la misión");
      }

      // Si todo fue exitoso, actualizamos el toast a estado "success"
      toast.success(`¡Misión "${data.nombre}" registrada con éxito!`, {
        id: toastId,
      });

      // Se limpia el formulario y modal cerrado
      reset();
      onMissionAdded(result); // se le avisa al Dashboard que hay una nueva mision
      onClose();
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false); //Desbloquea el boton
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border border-jpl-red/50 rounded-lg shadow-2xl shadow-jpl-red/20 w-full max-w-2xl overflow-hidden relative">
        {/* Cabecera del Modal */}
        <div className="bg-gray-950 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-jpl-red font-mono text-[10px] tracking-widest uppercase">
              Formulario de Registro
            </p>
            <h3 className="text-xl font-display text-white font-bold uppercase tracking-tight">
              Nueva Misión Espacial
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Nombre de la Misión
              </label>
              <input
                {...register("nombre")}
                className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white font-mono text-sm focus:border-jpl-red outline-none"
                placeholder="Ej. Artemis II"
              />
              {errors.nombre && (
                <p className="text-red-500 text-[10px] font-mono">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Agencia Responsable
              </label>
              <input
                {...register("agencia")}
                className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white font-mono text-sm focus:border-jpl-red outline-none"
                placeholder="Ej. NASA, ESA, SpaceX"
              />
              {errors.agencia && (
                <p className="text-red-500 text-[10px] font-mono">
                  {errors.agencia.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Destino
              </label>
              <input
                {...register("destino")}
                className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white font-mono text-sm focus:border-jpl-red outline-none"
                placeholder="Ej. Luna"
              />
              {errors.destino && (
                <p className="text-red-500 text-[10px] font-mono">
                  {errors.destino.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Fecha Lanzamiento
              </label>
              <input
                type="date"
                {...register("fecha_lanzamiento")}
                className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white font-mono text-sm focus:border-jpl-red outline-none"
              />
              {errors.fecha_lanzamiento && (
                <p className="text-red-500 text-[10px] font-mono">
                  {errors.fecha_lanzamiento.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Estado
              </label>
              <select
                {...register("estado")}
                className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white font-mono text-sm focus:border-jpl-red outline-none"
              >
                <option value="En Progreso">En Progreso</option>
                <option value="Exitoso">Exitoso</option>
                <option value="Fallido">Fallido</option>
              </select>
              {errors.estado && (
                <p className="text-red-500 text-[10px] font-mono">
                  {errors.estado.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Tripulación (Núm)
              </label>
              <input
                type="number"
                {...register("tripulacion")}
                className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white font-mono text-sm focus:border-jpl-red outline-none"
              />
              {errors.tripulacion && (
                <p className="text-red-500 text-[10px] font-mono">
                  {errors.tripulacion.message}
                </p>
              )}
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Descripción (Opcional)
              </label>
              <textarea
                {...register("descripcion")}
                rows="3"
                className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white font-mono text-sm focus:border-jpl-red outline-none"
                placeholder="Detalles de la misión..."
              ></textarea>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors border border-gray-700 hover:border-gray-500 rounded"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-jpl-red hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-6 py-2 rounded transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? "Transmitiendo..." : "Autorizar Lanzamiento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MissionModal;
