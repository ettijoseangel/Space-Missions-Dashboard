import express from "express";
import { getMissions, getMissionByID, createMission } from "../controllers/missionController.js";

const router = express.Router();

//Rutas base: /api/missions
router
  .route("/")
  .get(getMissions) //Obtiene todas (paginadas)
  .post(createMission); // Crea una nueva

// Rutas con ID: /api/missions/:id
router.route("/:id").get(getMissionByID); // Obtiene el detalle de una especificacion

export default router;
