import { Router } from "express";
import diagnosesController from "../controllers/diagnosesController.controller";

const diagnosesRouter: Router = Router();

diagnosesRouter.get("/", diagnosesController.getAllDiagnoses);

export default diagnosesRouter;
