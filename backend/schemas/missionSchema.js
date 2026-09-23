import { z } from "zod";

export const missionValidationSchema = z.object({
  nombre: z
    .string({
      required_error: "El nombre de la misión es obligatorio",
      invalid_type_error: "El nombre debe ser texto",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .trim(),

  agencia: z
    .string({
      required_error: "La agencia responsable es obligatoria",
    })
    .min(2, "La agencia debe tener al menos 2 caracteres")
    .trim(),

  destino: z
    .string({
      required_error: "El destino es obligatorio",
    })
    .trim(),

  fecha_lanzamiento: z
    .string({
      required_error: "La fecha de lanzamiento es obligatoria",
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato YYYY-MM-DD"),

  estado: z.enum(
    ["Activa", "En Progreso", "Completada", "Fallida", "Cancelada"],
    {
      errorMap: () => ({
        message:
          "El estado debe ser Activa, En Progreso, Completada, Fallida o Cancelada",
      }),
    },
  ),

  tripulacion: z.number({
    required_error:
      "El número de tripulantes es obligatorio (O si no es tripulada)",
    invalid_type_error: "La tripulación debe ser un valor numérico",
  }).min(0, "La tripulación no puede ser negativa"),

  descripcion: z.string().optional(),

  imagen_url: z.string().url("Debe ser una URL válida").optional().or(z.literal('')),
});
