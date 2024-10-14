import { Router } from "express";
import {
  createParticipant,
  deleteParticipant,
  getParticipants,
  getSingleParticipant,
  updateParticipant,
} from "../services/participantService.js";

const router = Router();

router.get("/participants", getParticipants);
router.post("/participants", createParticipant);
router.get("/participants/:id", getSingleParticipant);
router.put("/participants/:id", updateParticipant);
router.delete("/participants/:id", deleteParticipant);
export default router;
