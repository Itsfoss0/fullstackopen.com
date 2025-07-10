import { DiagnosesType } from "../types";
import diagnosesData from "../data/diagnoses";
import { Request, Response } from "express";

const getAllDiagnoses = (_req: Request, res: Response<DiagnosesType[]>) => {
  return res.send(diagnosesData);
};

export default {
  getAllDiagnoses,
};
