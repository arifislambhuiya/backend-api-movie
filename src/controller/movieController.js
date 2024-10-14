import {
  createMovie,
  deleteMovie,
  getMovies,
  getSingleMoive,
  updateMovie,
} from "../services/movieService.js";

import { Router } from "express";

const router = Router();

router.get("/movie", getMovies);
router.get("/movie/:id", getSingleMoive);
router.post("/movie", createMovie);
router.put("/movie/:id", updateMovie);
router.delete("/movie/:id", deleteMovie);

export default router;
