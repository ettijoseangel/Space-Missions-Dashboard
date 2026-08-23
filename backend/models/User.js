import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'public'],
        default: 'public'
    }
}, { timestamps: true });

// Middleware de Mongoose: Encriptar la password ANTES de guardar
userSchema.pre('save', async function() {
    // Si la password no ha sido modificada, pasamos al siguiente paso
    if (!this.isModified('password')) return;

    // Generamos la sal y encriptamos
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
});

// Metodo personaliado para comparar passwords al iniciar sesion
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);