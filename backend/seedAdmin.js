import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        // Conexion a la BD
        await mongoose.connect(process.env.MONGO_URI);
        
        const adminData = {
            username: 'admin', // Reemplazar
            password: 'Password123!', // Reemplazar
            role: 'admin'
        };

        // Verificar si ya existe para no duplicarlo
        const userExists = await User.findOne({ username: adminData.username });

        if (userExists) {
            console.log('El usuario administrador ya existe en la BD');
            process.exit(0);
        }

        // Inyecta el usuario a la base de datos
        const adminUser = await User.create(adminData);

        console.log(`¡Éxito! Administrador maestro creado: ${adminUser.username}`);
        process.exit(0);
    } catch (error) {
        console.error("Error inyectando el administrador:", error.message);
    }
};

// Ejecuta la funcion
seedAdmin();