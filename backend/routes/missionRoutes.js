import express from 'express';
import { getMissions } from '../controllers/missionController.js';

const router = express.Router();

//Rutas

// GET /api/missions
router.get('/',getMissions);

export default router;