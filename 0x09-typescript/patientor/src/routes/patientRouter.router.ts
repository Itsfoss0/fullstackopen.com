import { Router } from "express";
import patientsController from "../controllers/patientsController.controller";

const patientRouter: Router = Router();

patientRouter.get("/", patientsController.getAllPatients);
patientRouter.post("/", patientsController.addPatient);

export default patientRouter;
