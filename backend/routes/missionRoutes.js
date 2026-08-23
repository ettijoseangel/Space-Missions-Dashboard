import express from "express";
import { getMissions, getMissionByID, createMission } from "../controllers/missionController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { validateData } from "../middlewares/validateMiddleware.js";
import { missionValidationSchema } from "../schemas/missionSchema.js";

const router = express.Router();

//Rutas base: /api/missions
router
  .route("/")
  .get(getMissions) //Obtiene todas (paginadas) - ACCESO PUBLICO

  // ¿Quién eres? -> ¿Eres Admin? -> ¿Tus datos son correctos? -> Guarda en DB
  .post(protect, adminOnly, validateData(missionValidationSchema), createMission); // Crea una nueva mision - ACCESO RESTRINGIDO

  
// Rutas con ID: /api/missions/:id
router
.route("/:id")
.get(getMissionByID); // Obtiene el detalle de una mision - ACCESO PUBLICO

export default router;
