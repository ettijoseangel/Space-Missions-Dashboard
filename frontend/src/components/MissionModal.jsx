import { useEffect, useState } from "react";
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
  estado: z.enum([
    "Activa",
    "En Progreso",
    "Completada",
    "Fallida",
    "Cancelada",
  ]),
  // z.coerce fuerza a que el input (que siempre es texto en HTML) se convierta a número
  tripulacion: z.coerce.number().min(0, "No puede ser negativa"),
  descripcion: z
    .string()
    .max(1000, "El reporte no puede exceder los 1000 caracteres")
    .optional(),
  imagen_url: z
    .string()
    .url("Debe ser una URL válida")
    .optional()
    .or(z.literal("")),
});

const MissionModal = ({ isOpen, onClose, onMissionAdded, missionToEdit }) => {
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

  useEffect(() => {
    if (missionToEdit) {
      const formattedDate = missionToEdit.fecha_lanzamiento
        ? new Date(missionToEdit.fecha_lanzamiento).toISOString().split("T")[0]
        : "";

      reset({
        ...missionToEdit,
        fecha_lanzamiento: formattedDate,
      });
    } else {
      reset({
        nombre: "",
        agencia: "",
        destino: "",
        fecha_lanzamiento: "",
        estado: "En Progreso",
        tripulacion: 0,
        descripcion: "",
      });
    }
  }, [missionToEdit, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const isEditing = Boolean(missionToEdit);

    // Toast dinámico
    const toastMessage = isEditing
      ? "Actualizando misión..."
      : "Estableciendo conexión con el servidor...";
    const toastId = toast.loading(toastMessage);

    try {
      const url = isEditing
        ? `${import.meta.env.VITE_API_URL}/api/missions/${missionToEdit._id}`
        : `${import.meta.env.VITE_API_URL}/api/missions`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
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

      // Mensaje de éxito dinámico
      const successMsg = isEditing
        ? `¡Misión "${data.nombre}" actualizada!`
        : `¡Misión "${data.nombre}" registrada con éxito!`;

      toast.success(successMsg, { id: toastId, duration: 4000 });

      // Se limpia el formulario y modal cerrado
      reset();
      onMissionAdded(result); // se le avisa al Dashboard que hay una nueva mision
      setTimeout(() => {
        onClose();
      }, 2000); // Cierra el modal después de 2 segundos
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
            <p className="text-jpl-red dark:text-red-400 font-mono text-[10px] tracking-widest uppercase">
              Formulario de Registro
            </p>
            <h3 className="text-xl font-display text-white font-bold uppercase tracking-tight">
              {missionToEdit ? "Actualizar" : "Crear"} Misión Espacial
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
                <option value="Activa">Activa</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completada">Completada</option>
                <option value="Fallida">Fallida</option>
                <option value="Cancelada">Cancelada</option>
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
                URL de la Fotografia (Opcional)
              </label>
              <input
                type="url"
                {...register("imagen_url")}
                placeholder="https://ejemplo.com/foto-marte.jpg"
                className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white font-mono text-sm focus:border-jpl-red outline-none"
              />
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
