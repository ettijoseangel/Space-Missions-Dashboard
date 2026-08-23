import express from 'express';
import { login } from '../controllers/authController.js'

const router = express.Router();

// Ruta: POST /api/auth/login
router.post('/login', login);

export default router;