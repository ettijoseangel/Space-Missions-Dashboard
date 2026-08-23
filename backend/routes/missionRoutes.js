import express from "express";
import { getMissions, getMissionByID, createMission } from "../controllers/missionController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Rutas base: /api/missions
router
  .route("/")
  .get(getMissions) //Obtiene todas (paginadas) - ACCESO PUBLICO
  .post(protect, adminOnly, createMission); // Crea una nueva mision - ACCESO RESTRINGIDO

// Rutas con ID: /api/missions/:id
router
.route("/:id")
.get(getMissionByID); // Obtiene el detalle de una mision - ACCESO PUBLICO

export default router;
