import { Router } from "express";
import { ping } from "../controllers/probesController.controller";

const probesRouter = Router();

probesRouter.get("/ping", ping);

export default probesRouter;
