import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    agencia: {
        type: String,
        required: true
    },
    fecha_lanzamiento : {
        type: String,
        required: true
    },
    estado : {
        type: String,
        required: true,
        enum: ['Exitoso', 'En Progreso', 'Fallido'] // Limitamos a los estados exactos del frontend
    },
    tripulacion: {
        type: Number,
        required: true,
        default: 0
    },
    destino: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false // No es obligatorio por el momento
    }
}, {
    timestamps: true    // Crea automaticamente los campos createdAt y updatedAt
});

export const Mission = mongoose.model('Mission', missionSchema);