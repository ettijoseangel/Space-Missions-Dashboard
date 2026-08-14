import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Para importar la conexion
import missionRoutes from './routes/missionRoutes.js'

dotenv.config();

const app = express();

connectDB();    // Conectar a MongoDB Atlas y Ejecuta la conexiom

// Middlewares globales
app.use(cors());    // Peticiones desde el front
app.use(express.json());    // Express entiende JSOn en el body de las peticiones

// Uso de rutas en el endpoint /api/missions
app.use('/api/missions', missionRoutes);


// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor en linea');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Servidor corriendo');
});