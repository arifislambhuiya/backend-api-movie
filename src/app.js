import express from "express";
import { removeHeader } from "./middlewares/removeHeader.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(removeHeader);

// import router controller
import movieController from "./controller/movieController.js";
import participantController from "./controller/participantController.js";

// use controller
app.use("/api/v1", participantController);
app.use("/api/v1", movieController);
export { app };
