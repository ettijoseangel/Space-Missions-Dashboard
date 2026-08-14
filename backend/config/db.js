import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error de conexion: ${error.message}`);
        process.exit(1);    // Detenemos el servidor si no hay base de datos
    }
};