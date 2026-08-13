import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


// Middlewares globales
app.use(cors());    // Peticiones desde el front
app.use(express.json());    // Express entiende JSOn en el body de las peticiones

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor en linea');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Servidor corriendo');
});