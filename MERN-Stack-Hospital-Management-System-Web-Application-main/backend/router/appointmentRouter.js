import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controller/appointmentController.js";

const router = express.Router();

// ❌ AUTH REMOVE (IMPORTANT)
router.post("/post", postAppointment);

// बाकी admin वाले वैसे ही रहने दो
router.get("/getall", getAllAppointments);
router.put("/update/:id", updateAppointmentStatus);
router.delete("/delete/:id", deleteAppointment);

export default router;